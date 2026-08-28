import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";

// Nội dung nằm ở component client vì nó đổi theo ngôn ngữ khách chọn; còn
// `metadata` thì chỉ khai báo được từ server component.
export const metadata: Metadata = {
  title: "Cẩm nang chăm sóc thú cưng",
  description:
    "Bài viết trong cẩm nang chăm sóc chó mèo của MiewwL Pet House.",
};

export default function BlogPostPage() {
  return <BlogPostContent />;
}
