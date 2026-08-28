import BlogList from "./BlogList";

export const metadata = {
  title: "Blog",
};

// Nội dung nằm ở component client vì nó phải đổi theo ngôn ngữ khách chọn,
// còn `metadata` chỉ khai báo được từ server component.
export default function BlogPage() {
  return <BlogList />;
}
