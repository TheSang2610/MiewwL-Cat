import type { Metadata } from "next";
import BreedDetailContent from "./BreedDetailContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Thông tin giống",
  description:
    "Đặc điểm, tính cách, cách chăm sóc và mức giá tham khảo của từng giống chó mèo.",
};

export default function BreedDetailPage() {
  return <BreedDetailContent />;
}
