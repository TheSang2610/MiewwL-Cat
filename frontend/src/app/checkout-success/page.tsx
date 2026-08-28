import type { Metadata } from "next";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  description:
    "Đơn hàng của bạn đã được ghi nhận.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessContent />;
}
