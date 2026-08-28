import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap cho công cụ tìm kiếm.
 *
 * Chỉ liệt kê các trang tĩnh và bài cẩm nang — hai thứ luôn tồn tại và không
 * phụ thuộc database. Trang chi tiết bé và chi tiết giống nằm sau query string
 * và thay đổi liên tục theo tồn kho, nên để crawler tự đi theo liên kết từ
 * trang danh mục thay vì cố liệt kê ở đây rồi trả về 404 khi bé đã có chủ.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/meo", priority: 0.9, changeFrequency: "daily" },
    { path: "/cho", priority: 0.9, changeFrequency: "daily" },
    { path: "/phu-kien", priority: 0.8, changeFrequency: "weekly" },
    { path: "/spa", priority: 0.8, changeFrequency: "monthly" },
    { path: "/cham-soc", priority: 0.7, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/nguon-anh", priority: 0.2, changeFrequency: "monthly" },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog-post?slug=${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
