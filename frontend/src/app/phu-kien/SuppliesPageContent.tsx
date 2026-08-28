"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/storefront/ProductCard";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import { useProductStore } from "@/store/product-store";
import { SUPPLY_GROUPS, UNGROUPED, SupplyGroupDef } from "@/lib/supply-groups";
import { Product } from "@/lib/types";
import { useT } from "@/lib/i18n";
import ProductFilterBar, {
  EMPTY_FILTER,
  FilterState,
  isFiltering,
  useFilteredProducts,
} from "@/components/storefront/ProductFilterBar";

export default function SuppliesPageContent() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const t = useT();
  const [filter, setFilter] = useState<FilterState>(EMPTY_FILTER);
  const visible = useFilteredProducts(products, filter);

  const trustItems = [
    { icon: "✅", label: t("supplies.trust1") },
    { icon: "🚚", label: t("supplies.trust2") },
    { icon: "↩️", label: t("supplies.trust3") },
    { icon: "💰", label: t("supplies.trust4") },
  ];

  const reload = () => fetchProducts({ category: "phu-kien", published: true });

  useEffect(() => {
    fetchProducts({ category: "phu-kien", published: true });
  }, [fetchProducts]);

  /** Chia sản phẩm (đã lọc) vào từng nhóm; nhóm rỗng bị loại khỏi trang. */
  const sections = useMemo(() => {
    const known = SUPPLY_GROUPS.map((group) => ({
      group,
      items: visible.filter((p) => p.subCategory === group.slug),
    }));

    const knownSlugs: string[] = SUPPLY_GROUPS.map((g) => g.slug);
    const leftovers = visible.filter(
      (p) => !p.subCategory || !knownSlugs.includes(p.subCategory)
    );

    const all: { group: SupplyGroupDef; items: Product[] }[] = [...known];
    if (leftovers.length > 0) all.push({ group: UNGROUPED, items: leftovers });

    return all.filter((s) => s.items.length > 0);
  }, [visible]);

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <section className="px-4 pb-6 pt-20 text-center md:pb-8 md:pt-24">
        <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <span className="font-medium text-brand-deep">{t("supplies.breadcrumb")}</span>
        </nav>
        <h1 className="mb-3 text-3xl font-extrabold text-brand-deep md:text-4xl lg:text-5xl">
          {t("supplies.title")}
        </h1>
        <p className="mx-auto max-w-xl text-base text-brand-deep/50 md:text-lg">
          {t("supplies.subtitleBefore")}{" "}
          <span className="font-bold text-brand-gold">
            {t("supplies.subtitleCount", { count: products.length })}
          </span>{" "}
          {t("supplies.subtitleAfter")}
        </p>
      </section>

      <section className="mx-auto mb-4 max-w-6xl px-4">
        <div className="rounded-2xl border border-brand-pink/40 bg-white/70 p-5 backdrop-blur-sm md:p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-brand-deep">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-pink/40 text-lg">
                  {item.icon}
                </span>
                <span className="text-sm font-medium leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mb-4 max-w-6xl px-4">
        <ProductFilterBar value={filter} onChange={setFilter} resultCount={visible.length} />
      </section>

      {/* Chip nhảy nhanh tới từng nhóm */}
      {sections.length > 1 && (
        <nav className="mx-auto mb-2 max-w-6xl px-4">
          <div className="flex flex-wrap gap-2">
            {sections.map(({ group, items }) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-deep/15 bg-white px-4 py-2 text-sm font-semibold text-brand-deep/75 transition-colors hover:border-brand-deep hover:text-brand-deep"
              >
                <span>{group.icon}</span>
                {t(group.labelKey)}
                <span className="text-xs font-normal text-brand-deep/40">({items.length})</span>
              </a>
            ))}
          </div>
        </nav>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-20">
        {loading ? (
          <LoadingMessage label={t("supplies.loading")} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={reload} />
        ) : sections.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            {isFiltering(filter) ? (
              <>
                <p className="mb-1 text-lg font-bold">{t("filter.noResultTitle")}</p>
                <p className="mb-4 text-sm text-brand-deep/55">{t("filter.noResultDesc")}</p>
                <button
                  type="button"
                  onClick={() => setFilter(EMPTY_FILTER)}
                  className="rounded-full bg-brand-deep px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90"
                >
                  {t("filter.reset")}
                </button>
              </>
            ) : (
              <p className="text-sm text-brand-deep/50">{t("supplies.empty")}</p>
            )}
          </div>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {sections.map(({ group, items }) => (
              <div key={group.slug} id={group.slug} className="scroll-mt-24">
                <div className="mb-5 border-b border-brand-deep/10 pb-3">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-brand-deep md:text-2xl">
                    <span aria-hidden="true">{group.icon}</span>
                    {t(group.labelKey)}
                    <span className="text-sm font-normal text-brand-deep/40">
                      ({items.length})
                    </span>
                  </h2>
                  <p className="mt-1 text-sm text-brand-deep/50">{t(group.blurbKey)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
