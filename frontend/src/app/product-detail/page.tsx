import type { Metadata } from "next";
import ProductDetailContent from "./ProductDetailContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Chi tiết",
  description:
    "Thông tin chi tiết, hình ảnh và giá của bé cưng hoặc sản phẩm.",
};

export default function ProductDetailPage() {
  return <ProductDetailContent />;
}
