import type { Metadata } from "next";
import SpaPageContent from "./SpaPageContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Spa & Grooming cho chó mèo",
  description:
    "Bảng giá tắm, cắt tỉa và chăm sóc lông cho chó mèo — ước tính chi phí trước khi đặt lịch.",
};

export default function SpaPage() {
  return <SpaPageContent />;
}
