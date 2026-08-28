/**
 * ==========================================================================
 *  QUY ĐỔI USD
 * ==========================================================================
 *
 * Giá trong hệ thống luôn lưu bằng VNĐ. Khi khách xem site bằng tiếng Anh,
 * bên dưới giá VNĐ hiện thêm số tiền USD quy đổi cho dễ hình dung.
 *
 * Đây là con số THAM KHẢO, không phải giá thanh toán: tài khoản ngân hàng và
 * mã VietQR đều là VNĐ, nên tiền chuyển khoản thật vẫn là VNĐ.
 *
 * Tỷ giá lấy từ `GET /api/exchange-rate` của backend (có cache 12 tiếng ở đó),
 * quản lý bởi `store/exchange-rate-store.ts`. Hằng số dưới đây chỉ là mức dự
 * phòng khi không gọi được — sửa nó nếu tỷ giá thị trường đổi hẳn mặt bằng.
 */
export const FALLBACK_VND_PER_USD = 25_000;

/**
 * Quy đổi VNĐ sang chuỗi USD hiển thị.
 * Dưới $10 giữ 1 chữ số thập phân ($4.8), từ $10 trở lên làm tròn ($480).
 */
export function toUsd(amountVnd: number, rate: number = FALLBACK_VND_PER_USD): string {
  const usd = amountVnd / (rate || FALLBACK_VND_PER_USD);
  if (usd === 0) return "$0";
  if (usd < 10) return `$${usd.toFixed(1)}`;
  return `$${Math.round(usd).toLocaleString("en-US")}`;
}

/** Dạng có dấu ngã để nhấn mạnh là số quy đổi tương đối: `~$480`. */
export function toUsdApprox(amountVnd: number, rate?: number): string {
  return `~${toUsd(amountVnd, rate)}`;
}
