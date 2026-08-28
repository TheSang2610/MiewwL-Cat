import type { Metadata } from "next";
import CreditsList from "./CreditsList";

export const metadata: Metadata = {
  title: "Nguồn ảnh & giấy phép",
  description:
    "Danh sách tác giả và giấy phép của các ảnh minh hoạ dùng trên website MiewwL Pet House.",
};

export default function CreditsPage() {
  return <CreditsList />;
}
