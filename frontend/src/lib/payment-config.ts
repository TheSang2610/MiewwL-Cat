/**
 * ==========================================================================
 *  THÔNG TIN CHUYỂN KHOẢN
 * ==========================================================================
 *
 * Số tài khoản cố tình KHÔNG viết trong repo. Repo công khai thì mọi giá trị
 * ghi ở đây nằm vĩnh viễn trong lịch sử git và bị máy quét thu thập — kể cả
 * sau khi xoá đi, kể cả khi cửa hàng đã đổi sang tài khoản khác. Nên đọc từ
 * biến môi trường.
 *
 * Khai ở đâu:
 *   - Chạy ở máy:  `frontend/.env.local`
 *   - Trên Vercel: Settings → Environment Variables (dự án frontend)
 *
 * Đổi ngân hàng thì tra mã BIN tại https://api.vietqr.io/v2/banks
 *
 * Lưu ý `NEXT_PUBLIC_`: giá trị được nhúng thẳng vào JavaScript gửi xuống
 * trình duyệt. Đó đúng là ý đồ — khách phải đọc được số tài khoản mới chuyển
 * tiền được. Đây không phải chỗ cất bí mật, nó chỉ giữ cho repo sạch.
 */

export const BANK = {
  /** Mã BIN ngân hàng, ví dụ 970418 = BIDV. */
  bin: process.env.NEXT_PUBLIC_BANK_BIN ?? "",
  /** Tên ngắn hiện cho khách, ví dụ "BIDV". */
  name: process.env.NEXT_PUBLIC_BANK_NAME ?? "",
  accountNo: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO ?? "",
  /** Tên chủ tài khoản, viết in hoa không dấu như trong app ngân hàng. */
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME ?? "",
  /**
   * Đường dẫn ảnh QR tĩnh tự lưu từ app ngân hàng, đặt trong `public/`
   * (ví dụ `/bank-qr.png`). Bỏ trống thì dùng QR động của VietQR — nên bỏ
   * trống, vì QR động đã nhúng sẵn số tiền và nội dung của từng đơn.
   */
  staticQrImage: process.env.NEXT_PUBLIC_BANK_QR_IMAGE || null,
} as const;

/**
 * Thiếu bất kỳ mảnh nào thì không dựng nổi hướng dẫn chuyển khoản, nên trang
 * thanh toán phải nói thẳng là chưa cấu hình thay vì hiện mã QR hỏng hoặc số
 * tài khoản rỗng cho khách chuyển tiền vào.
 */
export const isBankConfigured = Boolean(
  BANK.bin && BANK.name && BANK.accountNo && BANK.accountName
);

/** Nội dung chuyển khoản để đối soát đơn — hiển thị cho khách copy. */
export function transferNote(orderId: string) {
  return `MIEWWL ${orderId.slice(-6).toUpperCase()}`;
}

/** Ảnh QR ngân hàng do VietQR sinh, đã gắn sẵn số tiền + nội dung. */
export function bankQrUrl(amount: number, note: string) {
  const params = new URLSearchParams({
    amount: String(Math.round(amount)),
    addInfo: note,
    accountName: BANK.accountName,
  });
  return `https://img.vietqr.io/image/${BANK.bin}-${BANK.accountNo}-compact2.jpg?${params}`;
}
