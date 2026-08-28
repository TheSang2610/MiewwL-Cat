"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Product, Breed } from "@/lib/types";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useContent } from "@/lib/content-i18n";
import { useHasMounted } from "@/lib/use-has-mounted";
import { normalizeSearch, matchesQuery } from "@/lib/search-text";
import { BLOG_POSTS, CATEGORY_KEY, postBody } from "@/data/blog";

const FALLBACK_IMAGE = "/placeholder.svg";
const MAX_PER_GROUP = 4;

interface Hit {
  key: string;
  href: string;
  title: string;
  subtitle: string;
  image?: string;
  price?: number;
}

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();
  const c = useContent();
  const mounted = useHasMounted();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Chỉ gọi API khi khách thực sự mở ô tìm kiếm, không tải sẵn ở mọi trang.
  const { data } = useAsync(async () => {
    if (!isOpen) return null;
    const [products, breeds] = await Promise.all([
      api.products.list({ published: true }),
      api.breeds.list({ published: true }),
    ]);
    return { products, breeds };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // Khoá cuộn nền và bắt phím Esc trong lúc lớp phủ đang mở.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const groups = useMemo(() => {
    const q = normalizeSearch(query.trim());
    if (!q) return null;

    const match = (...fields: (string | undefined | null)[]) => matchesQuery(q, ...fields);

    const products = data?.products ?? [];
    const breeds = data?.breeds ?? [];
    const isPet = (p: Product) =>
      p.category?.slug === "meo" || p.category?.slug === "cho";

    const pets: Hit[] = products
      .filter(isPet)
      .filter((p) => match(p.name, c(p.name), p.breed, p.color, c(p.color), ...p.tags))
      .slice(0, MAX_PER_GROUP)
      .map((p) => ({
        key: p.id,
        href: `/product-detail?id=${p.id}`,
        title: c(p.name),
        subtitle: [p.breed, c(p.age)].filter(Boolean).join(" · "),
        image: p.images[0],
        price: p.price,
      }));

    const supplies: Hit[] = products
      .filter((p) => !isPet(p))
      .filter((p) => match(p.name, c(p.name), p.description, c(p.description)))
      .slice(0, MAX_PER_GROUP)
      .map((p) => ({
        key: p.id,
        href: `/product-detail?id=${p.id}`,
        title: c(p.name),
        subtitle: "",
        image: p.images[0],
        price: p.price,
      }));

    const breedHits: Hit[] = breeds
      .filter((b: Breed) => match(b.name, b.alias, c(b.alias), b.description, c(b.description), ...b.tags))
      .slice(0, MAX_PER_GROUP)
      .map((b) => ({
        key: b.id,
        href: `/breed-detail?slug=${b.slug}`,
        title: b.name,
        subtitle: c(b.alias) || "",
        image: b.image ?? undefined,
      }));

    const posts: Hit[] = BLOG_POSTS.filter((post) => {
      const body = postBody(post, locale);
      return match(
        body.title,
        body.excerpt,
        ...body.blocks.flatMap((b) => (b.t === "ul" || b.t === "ol" ? b.items : [b.text]))
      );
    })
      .slice(0, MAX_PER_GROUP)
      .map((post) => ({
        key: post.slug,
        href: `/blog-post?slug=${post.slug}`,
        title: postBody(post, locale).title,
        subtitle: t(CATEGORY_KEY[post.category]),
        image: post.image,
      }));

    const total = pets.length + breedHits.length + supplies.length + posts.length;
    return { pets, breeds: breedHits, supplies, posts, total };
  }, [query, data, c, locale, t]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col" role="dialog" aria-modal="true" aria-label={t("search.title")}>
      <button
        type="button"
        aria-label={t("search.close")}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-brand-deep/40 backdrop-blur-sm"
      />

      <div className="relative mx-auto mt-0 flex max-h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl sm:mt-16 sm:rounded-3xl">
        <div className="flex items-center gap-3 border-b border-brand-deep/8 px-4 py-3 sm:px-5">
          <Search className="h-5 w-5 shrink-0 text-brand-deep/35" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-brand-deep outline-none placeholder:text-brand-deep/35"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("search.close")}
            className="shrink-0 rounded-full p-2 text-brand-deep/40 transition-colors hover:bg-brand-cream hover:text-brand-deep"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <p className="text-base font-semibold text-brand-deep">{t("search.hintTitle")}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-brand-deep/50">
                {t("search.hintDesc")}
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand-deep/35">
                {t("search.suggestions")}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {["Corgi", "Poodle", "British Shorthair", "Scottish Fold", "Royal Canin"].map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-brand-deep/12 px-3 py-1.5 text-sm text-brand-deep transition-colors hover:border-brand-deep/35"
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : !data ? (
            <p className="py-10 text-center text-sm text-brand-deep/45">{t("search.loading")}</p>
          ) : groups && groups.total === 0 ? (
            <div className="py-10 text-center">
              <p className="mb-1 text-4xl">🐾</p>
              <p className="text-base font-semibold text-brand-deep">
                {t("search.emptyTitle", { query: query.trim() })}
              </p>
              <p className="mt-1 text-sm text-brand-deep/50">{t("search.emptyDesc")}</p>
            </div>
          ) : (
            groups && (
              <div className="space-y-6 pb-2">
                <ResultGroup label={t("search.groupPets")} hits={groups.pets} onNavigate={onClose} locale={locale} />
                <ResultGroup label={t("search.groupBreeds")} hits={groups.breeds} onNavigate={onClose} locale={locale} />
                <ResultGroup label={t("search.groupSupplies")} hits={groups.supplies} onNavigate={onClose} locale={locale} />
                <ResultGroup label={t("search.groupPosts")} hits={groups.posts} onNavigate={onClose} locale={locale} />
              </div>
            )
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function ResultGroup({
  label,
  hits,
  onNavigate,
  locale,
}: {
  label: string;
  hits: Hit[];
  onNavigate: () => void;
  locale: "vi" | "en";
}) {
  if (hits.length === 0) return null;

  return (
    <section>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-deep/40">{label}</p>
      <ul className="space-y-1">
        {hits.map((hit) => (
          <li key={hit.key}>
            <Link
              href={hit.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-brand-cream"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-brand-cream">
                <Image
                  src={hit.image || FALLBACK_IMAGE}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-brand-deep">
                  {hit.title}
                </span>
                {hit.subtitle && (
                  <span className="block truncate text-xs text-brand-deep/45">{hit.subtitle}</span>
                )}
              </span>
              {hit.price !== undefined && (
                <span className="shrink-0 text-sm font-bold text-brand-gold">
                  {formatPrice(hit.price, locale)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
