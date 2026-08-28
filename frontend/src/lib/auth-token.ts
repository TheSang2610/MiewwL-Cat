/**
 * Token đăng nhập — ĐƯỜNG DỰ PHÒNG.
 *
 * Đường chính là cookie `HttpOnly` do backend đặt: JavaScript trên trang không
 * đọc được nên site dính XSS thì phiên vẫn an toàn. Cookie chỉ tới được API khi
 * web và API cùng site (`localhost:3000` ↔ `localhost:3001`, hoặc
 * `miewwl.vn` ↔ `api.miewwl.vn`).
 *
 * Nếu hai bên khác site — ví dụ hai dự án `*.vercel.app` riêng, vì `.vercel.app`
 * nằm trong Public Suffix List nên trình duyệt coi là cross-site — cookie bị bỏ
 * và ta phải quay về gửi `Authorization: Bearer`. Lúc đó token buộc phải nằm
 * trong localStorage, kèm rủi ro XSS đã biết.
 *
 * Sau khi đăng nhập, `probeCookieAuth()` gọi `/auth/me` KHÔNG kèm header. Trả
 * 200 nghĩa là cookie chạy → xoá token khỏi localStorage luôn.
 *
 * Giữ ở module riêng thay vì trong store vì `lib/api.ts` cần đọc token, mà hai
 * store đăng nhập lại import `api` — để chung sẽ thành vòng lặp import.
 */

const STORAGE_KEY = "pet-shop-auth-token";

let current: string | null = null;
let restored = false;

function restore(): string | null {
  if (restored) return current;
  restored = true;
  if (typeof window === "undefined") return null;
  try {
    current = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Trình duyệt chặn localStorage (ẩn danh, chặn cookie...) — vẫn chạy được,
    // chỉ là mất phiên khi tải lại trang nếu cookie cũng không dùng được.
    current = null;
  }
  return current;
}

export function getAuthToken(): string | null {
  return restore();
}

export function setAuthToken(token: string | null) {
  current = token;
  restored = true;
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(STORAGE_KEY, token);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Không lưu được thì phiên chỉ sống trong tab hiện tại; chấp nhận được.
  }
}

export function clearAuthToken() {
  setAuthToken(null);
}
