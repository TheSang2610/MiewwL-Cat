import { BlogPost, BlogCategory } from "./types";
import { HEALTH_POSTS } from "./posts-health";
import { CARE_POSTS } from "./posts-care";
import { BREED_POSTS } from "./posts-breeds";

export * from "./types";

/** Toàn bộ bài viết, mới nhất trước. */
export const BLOG_POSTS: BlogPost[] = [...HEALTH_POSTS, ...CARE_POSTS, ...BREED_POSTS].sort(
  (a, b) => b.date.localeCompare(a.date)
);

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Bài nổi bật hiện lớn ở đầu trang danh sách; không có thì lấy bài mới nhất. */
export function featuredPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
}

/** Số bài trong từng chuyên mục, để hiện bên cạnh nút lọc. */
export function countByCategory(): Record<BlogCategory, number> {
  return BLOG_POSTS.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<BlogCategory, number>
  );
}

/**
 * Bài liên quan: ưu tiên cùng chuyên mục, thiếu thì bù bằng bài mới nhất khác.
 * Luôn trả về đúng `limit` bài miễn là kho bài đủ lớn.
 */
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const chosen = new Set([post.slug, ...sameCategory.map((p) => p.slug)]);
  const filler = BLOG_POSTS.filter((p) => !chosen.has(p.slug));
  return [...sameCategory, ...filler].slice(0, limit);
}

/** Bài trước / bài sau theo thứ tự thời gian, cho nút điều hướng cuối bài. */
export function siblingPosts(post: BlogPost): { prev?: BlogPost; next?: BlogPost } {
  const i = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  if (i < 0) return {};
  return { prev: BLOG_POSTS[i - 1], next: BLOG_POSTS[i + 1] };
}
