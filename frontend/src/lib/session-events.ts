/**
 * Cầu nối giữa `lib/api.ts` và hai store đăng nhập.
 *
 * Khi server trả 401 giữa chừng — phiên bị thu hồi vì đăng xuất ở máy khác,
 * quản trị đặt lại mật khẩu, hay token hết hạn — giao diện phải dọn trạng thái
 * đăng nhập, nếu không khách vẫn thấy tên mình trên header trong khi mọi thao
 * tác đều hỏng.
 *
 * `api.ts` không import trực tiếp store được (store lại import `api`, sẽ thành
 * vòng lặp), nên dùng cơ chế đăng ký callback ở giữa.
 */

type Handler = () => void;

const handlers = new Set<Handler>();

/** Đăng ký xử lý khi phiên mất hiệu lực. Trả về hàm huỷ đăng ký. */
export function onSessionExpired(handler: Handler): () => void {
  handlers.add(handler);
  return () => handlers.delete(handler);
}

/** Gọi khi API trả 401 ở một request lẽ ra phải có quyền. */
export function notifySessionExpired() {
  for (const handler of handlers) {
    try {
      handler();
    } catch {
      // Một handler hỏng không được chặn các handler còn lại.
    }
  }
}
