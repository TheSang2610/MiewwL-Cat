import { Locale } from "@/store/locale-store";
import { MessageKey } from "@/lib/messages";

/**
 * Chuyên mục của cẩm nang. Dùng khoá cố định thay vì chuỗi tự do để vừa lọc
 * được, vừa dịch được sang tiếng Anh qua `messages.ts`.
 */
export type BlogCategory =
  | "health"
  | "nutrition"
  | "care"
  | "training"
  | "breeds"
  | "starting"
  | "shop";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "health",
  "nutrition",
  "care",
  "training",
  "breeds",
  "starting",
  "shop",
];

export const CATEGORY_KEY: Record<BlogCategory, MessageKey> = {
  health: "blogCat.health",
  nutrition: "blogCat.nutrition",
  care: "blogCat.care",
  training: "blogCat.training",
  breeds: "blogCat.breeds",
  starting: "blogCat.starting",
  shop: "blogCat.shop",
};

/**
 * Một đoạn nội dung trong bài. Tách thành khối thay vì một mảng đoạn văn để
 * bài viết có tiêu đề mục, danh sách gạch đầu dòng và ô ghi chú — tức là đọc
 * được như một cẩm nang thật chứ không phải ba đoạn văn trơn.
 */
export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "note"; text: string };

export interface PostBody {
  title: string;
  excerpt: string;
  blocks: Block[];
}

export interface BlogPost {
  slug: string;
  /** Ảnh trong `public/`; xem `image-credits.ts` để biết nguồn. */
  image: string;
  category: BlogCategory;
  /** ISO `YYYY-MM-DD`; hiển thị theo định dạng của từng ngôn ngữ. */
  date: string;
  /** Số phút đọc; ghép chuỗi ở phần hiển thị nên không cần dịch sẵn. */
  readMinutes: number;
  /** Bài nổi bật, hiện lớn ở đầu trang danh sách. */
  featured?: boolean;
  vi: PostBody;
  en: PostBody;
}

/** Nội dung bài theo ngôn ngữ khách đang chọn. */
export function postBody(post: BlogPost, locale: Locale): PostBody {
  return locale === "en" ? post.en : post.vi;
}

/** Chỉ lấy tiêu đề mục để dựng mục lục ở đầu bài dài. */
export function headings(body: PostBody): string[] {
  return body.blocks.filter((b) => b.t === "h").map((b) => b.text);
}

/** Chuyển tiêu đề mục thành id để nhảy tới bằng liên kết neo. */
export function headingId(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "muc"}-${index + 1}`;
}
