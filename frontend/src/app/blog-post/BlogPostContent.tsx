"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Copy, Info, List } from "lucide-react";
import {
  Block,
  CATEGORY_KEY,
  findPost,
  headingId,
  headings,
  postBody,
  relatedPosts,
  siblingPosts,
} from "@/data/blog";
import { creditFor } from "@/data/image-credits";
import { useI18n, formatDate, Translate } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";

function BlockView({ block, index, t }: { block: Block; index: number; t: Translate }) {
  switch (block.t) {
    case "h":
      return (
        <h2
          id={headingId(block.text, index)}
          className="scroll-mt-24 pt-4 text-xl font-bold text-brand-deep md:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-pink/40 text-xs font-bold text-brand-deep">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <div className="flex gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm leading-relaxed text-yellow-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <strong className="font-semibold">{t("blog.noteLabel")}: </strong>
            {block.text}
          </p>
        </div>
      );
    default:
      return <p>{block.text}</p>;
  }
}

function CopyLinkButton({ t }: { t: Translate }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Trình duyệt chặn clipboard khi không chạy HTTPS — bỏ qua im lặng,
      // khách vẫn copy được từ thanh địa chỉ.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-brand-deep/15 px-4 py-2 text-sm font-medium text-brand-deep transition-colors hover:bg-white"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" />
          {t("blog.copied")}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {t("blog.copyLink")}
        </>
      )}
    </button>
  );
}

function BlogPostBody() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const post = findPost(slug);
  const { t, locale } = useI18n();

  // Gọi trước nhánh "không tìm thấy bài" bên dưới.
  useDocumentTitle(post ? postBody(post, locale).title : undefined);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="mb-4 text-sm text-brand-deep/60">{t("blog.notFound")}</p>
        <Link href="/blog" className="text-sm text-brand-deep underline">
          {t("blog.backToBlog")}
        </Link>
      </div>
    );
  }

  const body = postBody(post, locale);
  const toc = headings(body);
  const related = relatedPosts(post);
  const { prev, next } = siblingPosts(post);
  const credit = creditFor(post.image);

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <Link href="/blog" className="transition-colors hover:text-brand-deep">
            {t("blog.breadcrumb")}
          </Link>
          <span>›</span>
          <span className="line-clamp-1 font-medium text-brand-deep">{body.title}</span>
        </nav>

        <span className="mb-3 inline-block rounded-full bg-brand-pink/30 px-2.5 py-1 text-xs font-semibold text-brand-deep">
          {t(CATEGORY_KEY[post.category])}
        </span>
        <h1 className="mb-3 text-2xl font-extrabold leading-tight md:text-4xl">{body.title}</h1>
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-brand-deep/40">
          <span>{formatDate(post.date, locale)}</span>
          <span>·</span>
          <span>{t("blog.readTime", { count: post.readMinutes })}</span>
        </div>

        <figure className="mb-8">
          <div className="relative aspect-16/9 overflow-hidden rounded-2xl bg-stone-100">
            <Image
              src={post.image}
              alt={body.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
          {credit && (
            <figcaption className="mt-2 text-[11px] text-brand-deep/35">
              {credit.author} ·{" "}
              <a
                href={credit.source}
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:text-brand-deep/60"
              >
                {credit.license}
              </a>
            </figcaption>
          )}
        </figure>

        {/* Mục lục — chỉ hiện với bài có từ 3 mục trở lên */}
        {toc.length >= 3 && (
          <nav className="mb-8 rounded-2xl border border-brand-deep/8 bg-white p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-deep/50">
              <List className="h-3.5 w-3.5" />
              {t("blog.toc")}
            </p>
            <ol className="space-y-1.5 text-sm">
              {body.blocks.map((b, i) =>
                b.t === "h" ? (
                  <li key={i}>
                    <a
                      href={`#${headingId(b.text, i)}`}
                      className="text-brand-deep/70 underline-offset-4 transition-colors hover:text-brand-gold hover:underline"
                    >
                      {b.text}
                    </a>
                  </li>
                ) : null
              )}
            </ol>
          </nav>
        )}

        <div className="space-y-4 text-base leading-relaxed text-brand-deep/80">
          {body.blocks.map((block, i) => (
            <BlockView key={i} block={block} index={i} t={t} />
          ))}
        </div>

        <p className="mt-10 rounded-2xl bg-white/70 p-4 text-xs leading-relaxed text-brand-deep/45">
          {t("blog.disclaimer")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-brand-deep/10 pt-6">
          <span className="text-sm font-medium text-brand-deep/60">{t("blog.shareTitle")}</span>
          <CopyLinkButton t={t} />
        </div>

        {/* Bài trước / bài sau */}
        {(prev || next) && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog-post?slug=${prev.slug}`}
                className="group rounded-2xl border border-brand-deep/10 bg-white p-4 transition-colors hover:border-brand-deep/30"
              >
                <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-deep/40">
                  <ArrowLeft className="h-3 w-3" />
                  {t("blog.prev")}
                </span>
                <span className="line-clamp-2 text-sm font-semibold group-hover:text-brand-gold">
                  {postBody(prev, locale).title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/blog-post?slug=${next.slug}`}
                className="group rounded-2xl border border-brand-deep/10 bg-white p-4 text-right transition-colors hover:border-brand-deep/30"
              >
                <span className="mb-1 flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-deep/40">
                  {t("blog.next")}
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="line-clamp-2 text-sm font-semibold group-hover:text-brand-gold">
                  {postBody(next, locale).title}
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Bài liên quan */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-brand-deep/10 pt-8">
            <h2 className="mb-5 text-lg font-bold">{t("blog.related")}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => {
                const rb = postBody(r, locale);
                return (
                  <Link
                    key={r.slug}
                    href={`/blog-post?slug=${r.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                      <Image
                        src={r.image}
                        alt={rb.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-brand-gold">
                        {rb.title}
                      </p>
                      <p className="mt-1 text-[11px] text-brand-deep/40">
                        {t("blog.readTime", { count: r.readMinutes })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep underline underline-offset-4"
        >
          {t("blog.more")}
        </Link>
      </main>
    </div>
  );
}

export default function BlogPostContent() {
  return (
    <Suspense>
      <BlogPostBody />
    </Suspense>
  );
}
