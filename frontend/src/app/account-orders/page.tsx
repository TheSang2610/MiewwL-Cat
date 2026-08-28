import type { Metadata } from "next";
import AccountOrdersContent from "./AccountOrdersContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Đơn hàng của tôi",
  description:
    "Theo dõi tình trạng các đơn hàng đã đặt.",
  robots: { index: false, follow: false },
};

export default function AccountOrdersPage() {
  return <AccountOrdersContent />;
}
