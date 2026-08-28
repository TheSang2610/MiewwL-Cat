import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * CORS cho API.
 *
 * Trước đây phần này nằm ở `headers()` trong `next.config.ts`, nhưng header
 * tĩnh chỉ trả về được đúng MỘT origin. Khi deploy lên Vercel thì mỗi bản
 * preview lại có một tên miền khác, nên phải soi origin của từng request rồi
 * mới quyết định — việc đó chỉ làm được ở đây.
 *
 * Cấu hình bằng biến môi trường `CORS_ORIGIN`, ngăn cách bằng dấu phẩy:
 *   CORS_ORIGIN="https://miewwl.vn,https://www.miewwl.vn"
 * Để trống thì chỉ cho phép localhost (môi trường phát triển).
 */
const CONFIGURED = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

const LOCAL_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

/** Cho phép mọi bản preview của chính dự án frontend trên Vercel. */
const VERCEL_PREVIEW = /^https:\/\/[a-z0-9-]+\.vercel\.app$/;

function isAllowed(origin: string): boolean {
  const normalized = origin.replace(/\/$/, "");
  if (CONFIGURED.includes(normalized)) return true;
  if (LOCAL_ORIGINS.includes(normalized)) return true;
  // Chỉ mở cho *.vercel.app khi shop bật rõ ràng, vì đây là tên miền dùng chung.
  if (process.env.ALLOW_VERCEL_PREVIEWS === "true" && VERCEL_PREVIEW.test(normalized)) {
    return true;
  }
  return false;
}

function applyCors(res: NextResponse, origin: string | null): NextResponse {
  if (origin && isAllowed(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    // Cho phép trình duyệt gửi kèm cookie phiên đăng nhập. Bắt buộc phải đi
    // cùng một origin cụ thể — chuẩn CORS cấm dùng "*" khi có credentials.
    res.headers.set("Access-Control-Allow-Credentials", "true");
    // Origin thay đổi theo request nên cache trung gian phải biết mà tách bản.
    res.headers.set("Vary", "Origin");
  }
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Max-Age", "86400");
  return res;
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Preflight: trả 204 ngay, không đụng tới route handler.
  if (request.method === "OPTIONS") {
    return applyCors(new NextResponse(null, { status: 204 }), origin);
  }

  return applyCors(NextResponse.next(), origin);
}

export const config = {
  matcher: "/api/:path*",
};
