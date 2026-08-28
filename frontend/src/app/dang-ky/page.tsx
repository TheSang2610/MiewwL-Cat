import type { Metadata } from "next";
import RegisterPageContent from "./RegisterPageContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
  description:
    "Tạo tài khoản để theo dõi đơn hàng tại MiewwL Pet House.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <RegisterPageContent />;
}
