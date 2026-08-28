import CarePageContent from "./CarePageContent";

export const metadata = {
  title: "Cách chăm sóc theo giống",
};

// Nội dung nằm ở component client vì nó phải đổi theo ngôn ngữ khách chọn,
// còn `metadata` chỉ khai báo được từ server component.
export default function CareGuidePage() {
  return <CarePageContent />;
}
