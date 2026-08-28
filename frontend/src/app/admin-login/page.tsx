import type { Metadata } from "next";
import AdminLoginContent from "./AdminLoginContent";

// Form đăng nhập là component client (có state, gọi API); `metadata` chỉ khai
// báo được từ server component nên phải tách ra như thế này.
export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
  description:
    "Khu vực dành cho nhân viên cửa hàng.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginContent />;
}
