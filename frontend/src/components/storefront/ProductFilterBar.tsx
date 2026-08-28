"use client";

import { useId, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/content-i18n";
import { normalizeSearch, matchesQuery } from "@/lib/search-text";

export type SortKey = "default" | "priceAsc" | "priceDesc" | "nameAsc";

export interface FilterState {
  query: string;
  sort: SortKey;
  inStockOnly: boolean;
}

export const EMPTY_FILTER: FilterState = { query: "", sort: "default", inStockOnly: false };

export function isFiltering(f: FilterState) {
  return f.query.trim() !== "" || f.sort !== "default" || f.inStockOnly;
}

/**
 * Áp bộ lọc lên một danh sách sản phẩm.
 *
 * Tìm theo cả tên tiếng Việt lẫn bản dịch tiếng Anh, để khách đang xem bản EN
 * gõ "kibble" vẫn ra đúng gói hạt. `sort` trả về mảng mới, không sửa mảng gốc.
 */
export function useFilteredProducts(products: Product[], filter: FilterState): Product[] {
  const c = useContent();

  return useMemo(() => {
    const q = normalizeSearch(filter.query.trim());
    let list = products.filter((p) => {
      if (filter.inStockOnly && p.stock <= 0) return false;
      return matchesQuery(q, p.name, c(p.name), p.description, c(p.description), p.breed);
    });

    if (filter.sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    else if (filter.sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    else if (filter.sort === "nameAsc")
      list = [...list].sort((a, b) => c(a.name).localeCompare(c(b.name), "vi"));

    return list;
  }, [products, filter, c]);
}

export default function ProductFilterBar({
  value,
  onChange,
  resultCount,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
}) {
  const { t } = useI18n();
  // useId cho ra cùng một id ở server và client — Math.random() thì không,
  // và đó là lệch hydrate.
  const selectId = useId();

  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <div className="rounded-2xl border border-brand-deep/10 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-deep/30" />
          <input
            type="search"
            value={value.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder={t("filter.search")}
            aria-label={t("filter.search")}
            className="w-full rounded-xl border border-brand-deep/12 py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-brand-deep/40"
          />
          {value.query && (
            <button
              type="button"
              onClick={() => set({ query: "" })}
              aria-label={t("filter.searchClear")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-brand-deep/35 transition-colors hover:bg-brand-cream hover:text-brand-deep"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor={selectId} className="sr-only">
            {t("filter.sortLabel")}
          </label>
          <select
            id={selectId}
            value={value.sort}
            onChange={(e) => set({ sort: e.target.value as SortKey })}
            className="rounded-xl border border-brand-deep/12 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-deep/40"
          >
            <option value="default">{t("filter.sortDefault")}</option>
            <option value="priceAsc">{t("filter.sortPriceAsc")}</option>
            <option value="priceDesc">{t("filter.sortPriceDesc")}</option>
            <option value="nameAsc">{t("filter.sortNameAsc")}</option>
          </select>

          <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-brand-deep/75">
            <input
              type="checkbox"
              checked={value.inStockOnly}
              onChange={(e) => set({ inStockOnly: e.target.checked })}
              className="h-4 w-4 rounded border-brand-deep/25 accent-brand-deep"
            />
            {t("filter.inStockOnly")}
          </label>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-brand-deep/8 pt-3">
        <span className="text-xs text-brand-deep/45">
          {t("filter.resultCount", { count: resultCount })}
        </span>
        {isFiltering(value) && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTER)}
            className="text-xs font-semibold text-brand-deep/60 underline underline-offset-2 transition-colors hover:text-brand-deep"
          >
            {t("filter.reset")}
          </button>
        )}
      </div>
    </div>
  );
}
