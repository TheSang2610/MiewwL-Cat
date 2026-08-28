import type { Metadata } from "next";
import CheckoutPageContent from "./CheckoutPageContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Thanh toán",
  description:
    "Hoàn tất đơn hàng của bạn.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
