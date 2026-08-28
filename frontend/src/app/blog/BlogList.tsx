"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  CATEGORY_KEY,
  BlogCategory,
  countByCategory,
  featuredPost,
  postBody,
} from "@/data/blog";
import { useI18n, formatDate } from "@/lib/i18n";

type Filter = BlogCategory | "all";

export default function BlogList() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => countByCategory(), []);
  const featured = useMemo(() => featuredPost(), []);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      if (filter !== "all" && post.category !== filter) return false;
      if (!q) return true;
      // Tìm cả trong thân bài để khách gõ "búi lông" vẫn ra đúng bài,
      // dù cụm đó không nằm ở tiêu đề.
      const body = postBody(post, locale);
      const haystack = [
        body.title,
        body.excerpt,
        ...body.blocks.flatMap((b) =>
          b.t === "ul" || b.t === "ol" ? b.items : [b.text]
        ),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query, locale]);

  // Bài nổi bật chỉ hiện khi đang xem toàn bộ và không tìm kiếm — nếu không
  // nó sẽ mâu thuẫn với bộ lọc khách vừa chọn.
  const showFeatured = filter === "all" && !query.trim();
  const listed = showFeatured ? posts.filter((p) => p.slug !== featured.slug) : posts;
  const featuredBody = postBody(featured, locale);

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <span className="font-medium text-brand-deep">{t("blog.breadcrumb")}</span>
        </nav>

        <section className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-pink/30 px-3 py-1">
            <span className="text-xs font-semibold text-brand-deep">{t("blog.badge")}</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl">{t("blog.title")}</h1>
          <p className="mx-auto max-w-2xl text-base text-brand-deep/60">{t("blog.desc")}</p>
        </section>

        {/* Tìm kiếm */}
        <div className="mx-auto mb-6 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-deep/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              aria-label={t("blog.searchPlaceholder")}
              className="w-full rounded-full border border-brand-deep/12 bg-white py-3 pl-11 pr-11 text-sm shadow-sm outline-none transition-colors focus:border-brand-deep/35"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("blog.searchClear")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-brand-deep/40 transition-colors hover:bg-brand-cream hover:text-brand-deep"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Lọc theo chuyên mục */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={t("blog.all")}
            count={BLOG_POSTS.length}
          />
          {BLOG_CATEGORIES.filter((c) => counts[c]).map((c) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
              label={t(CATEGORY_KEY[c])}
              count={counts[c]}
            />
          ))}
        </div>

        {/* Bài nổi bật */}
        {showFeatured && (
          <Link
            href={`/blog-post?slug=${featured.slug}`}
            className="group mb-10 block overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-16/9 overflow-hidden bg-stone-100 md:aspect-auto md:min-h-[320px]">
                <Image
                  src={featured.image}
                  alt={featuredBody.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {t("blog.featured")}
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-pink/30 px-2.5 py-0.5 text-[11px] font-semibold text-brand-deep">
                  {t(CATEGORY_KEY[featured.category])}
                </span>
                <h2 className="mb-3 text-2xl font-extrabold leading-tight group-hover:text-brand-gold md:text-3xl">
                  {featuredBody.title}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-brand-deep/60 md:text-base">
                  {featuredBody.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-brand-deep/40">
                  <span>{formatDate(featured.date, locale)}</span>
                  <span>·</span>
                  <span>{t("blog.readTime", { count: featured.readMinutes })}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {listed.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="mb-2 text-4xl">🔍</p>
            <p className="mb-1 text-lg font-bold">{t("blog.noResultTitle")}</p>
            <p className="text-sm text-brand-deep/55">{t("blog.noResultDesc")}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listed.map((post) => {
              const body = postBody(post, locale);
              return (
                <Link
                  key={post.slug}
                  href={`/blog-post?slug=${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                    <Image
                      src={post.image}
                      alt={body.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 inline-block w-fit rounded-full bg-brand-pink/30 px-2 py-0.5 text-[10px] font-semibold text-brand-deep">
                      {t(CATEGORY_KEY[post.category])}
                    </span>
                    <h2 className="mb-2 text-lg font-bold leading-tight group-hover:text-brand-gold">
                      {body.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-sm text-brand-deep/60">{body.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between text-[11px] text-brand-deep/40">
                      <span>{formatDate(post.date, locale)}</span>
                      <span>{t("blog.readTime", { count: post.readMinutes })}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-brand-deep text-white"
          : "border border-brand-deep/12 bg-white text-brand-deep hover:border-brand-deep/35"
      }`}
    >
      {label}
      <span className={`ml-1.5 text-xs ${active ? "text-white/60" : "text-brand-deep/35"}`}>
        {count}
      </span>
    </button>
  );
}
