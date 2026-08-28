import type { Metadata } from "next";
import LoginPageContent from "./LoginPageContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "Đăng nhập để theo dõi đơn hàng và lưu thông tin giao hàng.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginPageContent />;
}
