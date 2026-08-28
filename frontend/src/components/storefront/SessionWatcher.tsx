"use client";

import { useEffect } from "react";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { onSessionExpired } from "@/lib/session-events";
import { clearAuthToken } from "@/lib/auth-token";

/**
 * Dọn trạng thái đăng nhập khi server báo phiên đã mất hiệu lực.
 *
 * Phiên nay có thể bị thu hồi từ phía server (đăng xuất ở máy khác, quản trị
 * đặt lại mật khẩu). Không có component này thì giao diện vẫn hiện tên người
 * dùng trong khi mọi thao tác đều trả 401 — khách sẽ tưởng website hỏng.
 *
 * Không render gì cả.
 */
export default function SessionWatcher() {
  useEffect(
    () =>
      onSessionExpired(() => {
        clearAuthToken();
        // Gọi thẳng `setState` thay vì `logout()`: `logout()` sẽ gửi thêm một
        // request đăng xuất, mà phiên thì đã chết rồi.
        useAdminAuthStore.setState({ user: null });
        useCustomerAuthStore.setState({ user: null });
      }),
    []
  );

  return null;
}
