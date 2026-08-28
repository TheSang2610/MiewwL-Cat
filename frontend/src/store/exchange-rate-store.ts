import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import { FALLBACK_VND_PER_USD } from "@/lib/currency";

/** Gọi lại tỷ giá sau 12 tiếng, khớp với thời gian cache ở backend. */
const REFRESH_MS = 12 * 60 * 60 * 1000;

interface ExchangeRateStore {
  rate: number;
  /** `false` nghĩa là đang dùng tỷ giá dự phòng, không phải tỷ giá thật. */
  live: boolean;
  fetchedAt: number;
  loading: boolean;
  /** Tải tỷ giá nếu bản đang có đã cũ. Gọi bao nhiêu lần cũng an toàn. */
  ensureRate: () => void;
}

export const useExchangeRateStore = create<ExchangeRateStore>()(
  persist(
    (set, get) => ({
      rate: FALLBACK_VND_PER_USD,
      live: false,
      fetchedAt: 0,
      loading: false,

      ensureRate: () => {
        const { fetchedAt, loading } = get();
        if (loading) return;
        if (Date.now() - fetchedAt < REFRESH_MS) return;

        set({ loading: true });
        api.exchangeRate
          .get()
          .then((res) => set({ rate: res.rate, live: res.live, fetchedAt: Date.now() }))
          .catch(() => {
            // Backend không phản hồi thì giữ nguyên tỷ giá đang có. Đánh dấu
            // đã thử để không gọi lại liên tục ở mỗi lần render.
            set({ live: false, fetchedAt: Date.now() });
          })
          .finally(() => set({ loading: false }));
      },
    }),
    {
      name: "pet-shop-exchange-rate",
      partialize: (state) => ({
        rate: state.rate,
        live: state.live,
        fetchedAt: state.fetchedAt,
      }),
    }
  )
);
