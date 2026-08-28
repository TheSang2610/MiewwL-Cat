import type { Metadata } from "next";
import SuppliesPageContent from "./SuppliesPageContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Đồ dùng & phụ kiện thú cưng",
  description:
    "Thức ăn, cát vệ sinh, đồ chơi, chuồng và phụ kiện cho chó mèo mọi lứa tuổi.",
};

export default function SuppliesPage() {
  return <SuppliesPageContent />;
}
