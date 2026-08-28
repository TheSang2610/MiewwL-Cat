import type { Metadata } from "next";
import PaymentPageContent from "./PaymentPageContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Chuyển khoản",
  description:
    "Thông tin chuyển khoản cho đơn hàng của bạn.",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return <PaymentPageContent />;
}
