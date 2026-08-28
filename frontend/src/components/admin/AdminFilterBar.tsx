"use client";

import { Search, X } from "lucide-react";

export interface AdminFilter {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Lựa chọn ngoài mục "tất cả" (value rỗng) do component tự thêm. */
  options: { value: string; label: string }[];
}

/**
 * Thanh tìm kiếm + lọc dùng chung cho các bảng admin. Lọc ở client vì
 * store đã tải sẵn toàn bộ danh sách — không cần gọi API lại mỗi lần gõ.
 */
export default function AdminFilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  filters = [],
  shown,
  total,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: AdminFilter[];
  shown: number;
  total: number;
}) {
  const isFiltered = search.trim() !== "" || filters.some((f) => f.value !== "");

  const reset = () => {
    onSearchChange("");
    filters.forEach((f) => f.onChange(""));
  };

  return (
    <div className="rounded-2xl border border-brand-deep/10 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-deep/30" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-brand-deep/15 py-2.5 pl-9 pr-3 text-sm focus:border-brand-deep focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <select
              key={f.label}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              aria-label={f.label}
              className={`rounded-xl border bg-white py-2.5 pl-3 pr-8 text-sm focus:outline-none ${
                f.value
                  ? "border-brand-deep font-medium text-brand-deep"
                  : "border-brand-deep/15 text-brand-deep/70"
              }`}
            >
              <option value="">{f.label}: Tất cả</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ))}

          {isFiltered && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-xl border border-brand-deep/15 px-3 py-2.5 text-xs font-semibold text-brand-deep/60 transition-colors hover:border-brand-deep hover:text-brand-deep"
            >
              <X className="h-3.5 w-3.5" />
              Xóa lọc
            </button>
          )}
        </div>
      </div>

      {isFiltered && (
        <p className="mt-3 border-t border-brand-deep/5 pt-3 text-xs text-brand-deep/50">
          Hiển thị <strong className="font-semibold text-brand-deep">{shown}</strong> / {total} mục
        </p>
      )}
    </div>
  );
}
