import { handle, ok } from "@/lib/http";

export const dynamic = "force-dynamic";

/** Tỷ giá dự phòng khi không gọi được nguồn ngoài. Khớp với hằng số ở frontend. */
const FALLBACK_VND_PER_USD = 25_000;

/** Nguồn công khai, không cần khoá API. */
const SOURCE = "https://open.er-api.com/v6/latest/USD";

/** Giữ tỷ giá 12 tiếng — tỷ giá không nhảy từng phút, và đỡ gọi ra ngoài. */
const CACHE_MS = 12 * 60 * 60 * 1000;

interface Cached {
  rate: number;
  fetchedAt: number;
  live: boolean;
}

// Cache trong bộ nhớ tiến trình. Trên Vercel mỗi instance có cache riêng và
// mất khi instance ngủ — chấp nhận được, xấu nhất là gọi lại nguồn ngoài.
let cache: Cached | null = null;

/**
 * Tỷ giá VND/USD cho phần quy đổi giá ở bản tiếng Anh.
 *
 * Luôn trả về một con số dùng được: gọi được nguồn ngoài thì lấy tỷ giá thật,
 * không thì rơi về hằng số và báo `live: false` để giao diện nói rõ đây là tỷ
 * giá tham khảo. Không bao giờ ném lỗi ra ngoài — hỏng tỷ giá không được phép
 * làm hỏng trang bán hàng.
 */
export const GET = handle(async () => {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_MS) {
    return ok({ ...cache, cached: true });
  }

  try {
    const res = await fetch(SOURCE, {
      signal: AbortSignal.timeout(5000),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const body = await res.json();
    const rate = Number(body?.rates?.VND);

    // Chặn giá trị vô lý: tỷ giá VND/USD thực tế quanh 24k-27k. Nếu nguồn trả
    // về số lạ thì thà dùng hằng số còn hơn hiện giá sai cho khách.
    if (!Number.isFinite(rate) || rate < 15_000 || rate > 40_000) {
      throw new Error(`Tỷ giá không hợp lệ: ${body?.rates?.VND}`);
    }

    cache = { rate: Math.round(rate), fetchedAt: now, live: true };
    return ok({ ...cache, cached: false });
  } catch (err) {
    console.warn("[exchange-rate] dùng tỷ giá dự phòng:", err);
    cache = { rate: FALLBACK_VND_PER_USD, fetchedAt: now, live: false };
    return ok({ ...cache, cached: false });
  }
});
