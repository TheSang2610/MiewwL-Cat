/**
 * Địa chỉ công khai của website.
 *
 * Vercel tự đặt `VERCEL_PROJECT_PRODUCTION_URL` cho môi trường production, nên
 * sitemap và robots.txt vẫn ra đúng tên miền kể cả khi bạn quên khai báo biến
 * môi trường. Muốn dùng tên miền riêng thì đặt `NEXT_PUBLIC_SITE_URL`.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "MiewwL Pet House";

/** Ghép đường dẫn tương đối thành URL tuyệt đối cho sitemap và thẻ Open Graph. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
