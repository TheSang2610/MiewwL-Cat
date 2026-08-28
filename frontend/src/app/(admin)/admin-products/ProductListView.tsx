"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/store/product-store";
import { useCategoryStore } from "@/store/category-store";
import { matchesSearch } from "@/lib/text";
import { SUPPLY_GROUPS, supplyGroupLabel } from "@/lib/supply-groups";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import ProductActions from "./ProductActions";

/**
 * Trang quản trị chia hàng bán thành hai mục riêng, vì trộn chung một bảng thì
 * rất rối: bán một bé chó là bán đúng một con vật có giống, có tuổi, có tồn kho
 * đếm được; bán một bao cát vệ sinh thì không.
 */
export type ProductScope = "pets" | "supplies";

const SCOPE_CATEGORIES: Record<ProductScope, string[]> = {
  pets: ["cho", "meo"],
  supplies: ["phu-kien", "spa"],
};

const SCOPE_TEXT: Record<ProductScope, { title: string; hint: string; add: string }> = {
  pets: {
    title: "Bé đang bán",
    hint: "Từng bé chó, mèo có thật trong cửa hàng — mỗi bé gắn với một giống trong Thư viện giống.",
    add: "+ Thêm bé mới",
  },
  supplies: {
    title: "Đồ dùng & dịch vụ",
    hint: "Thức ăn, phụ kiện và các gói spa. Không thuộc giống nào.",
    add: "+ Thêm đồ dùng / dịch vụ",
  },
};

export default function ProductListView({ scope }: { scope: ProductScope }) {
  const text = SCOPE_TEXT[scope];
  const scopeSlugs = SCOPE_CATEGORIES[scope];
  const { products, loading, error, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [stock, setStock] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (!scopeSlugs.includes(p.category?.slug ?? "")) return false;
        if (!matchesSearch(search, p.name, p.breed, p.category?.name)) return false;
        if (category && p.category?.slug !== category) return false;
        if (status === "published" && !p.published) return false;
        if (status === "hidden" && p.published) return false;
        if (stock === "in" && p.stock <= 0) return false;
        if (stock === "out" && p.stock > 0) return false;
        if (group && p.subCategory !== group) return false;
        return true;
      }),
    [products, search, category, status, stock, group, scopeSlugs]
  );

  const isFiltered =
    search.trim() !== "" || !!category || !!status || !!stock || !!group;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-deep">{text.title}</h1>
          <p className="text-sm text-brand-deep/50">{text.hint}</p>
        </div>
        <Link
          href="/admin-product-new"
          className="rounded-xl bg-brand-deep px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-deep/90"
        >
          {text.add}
        </Link>
      </div>

      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm theo tên sản phẩm, giống, danh mục..."
        shown={filtered.length}
        total={products.filter((p) => scopeSlugs.includes(p.category?.slug ?? "")).length}
        filters={[
          {
            label: "Danh mục",
            value: category,
            onChange: setCategory,
            options: categories
              .filter((c) => scopeSlugs.includes(c.slug))
              .map((c) => ({ value: c.slug, label: c.name })),
          },
          {
            label: "Trạng thái",
            value: status,
            onChange: setStatus,
            options: [
              { value: "published", label: "Đang hiện" },
              { value: "hidden", label: "Đã ẩn" },
            ],
          },
          {
            label: "Nhóm đồ dùng",
            value: group,
            onChange: setGroup,
            options: SUPPLY_GROUPS.map((g) => ({ value: g.slug, label: supplyGroupLabel(g.slug) })),
          },
          {
            label: "Tồn kho",
            value: stock,
            onChange: setStock,
            options: [
              { value: "in", label: "Còn hàng" },
              { value: "out", label: "Hết hàng" },
            ],
          },
        ]}
      />

      {loading ? (
        <LoadingMessage label="Đang tải sản phẩm..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchProducts()} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-brand-deep/10 bg-brand-cream/60 text-xs font-semibold uppercase text-brand-deep/50">
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Tên sản phẩm</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Giá bán</th>
                <th className="p-4">Tồn kho</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-deep/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-xs text-brand-deep/40">
                    {isFiltered
                      ? "Không tìm thấy sản phẩm nào khớp bộ lọc."
                      : "Chưa có sản phẩm nào."}
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-cream/30">
                    <td className="p-4">
                      <Image
                        src={p.images[0] || "/placeholder.svg"}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg border border-brand-deep/10 object-cover"
                      />
                    </td>
                    <td className="p-4 font-medium text-brand-deep">{p.name}</td>
                    <td className="p-4 text-xs text-brand-deep/60">
                      {p.category?.name || "—"}
                      {p.subCategory && (
                        <span className="mt-0.5 block text-[10px] text-brand-deep/40">
                          {supplyGroupLabel(p.subCategory)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-emerald-600">{p.price.toLocaleString("vi-VN")} đ</td>
                    <td className="p-4 text-xs font-semibold text-brand-deep/70">{p.stock}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          p.published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-brand-deep/10 text-brand-deep/50"
                        }`}
                      >
                        {p.published ? "Đang hiện" : "Đã ẩn"}
                      </span>
                    </td>
                    <td className="p-4">
                      <ProductActions productId={p.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
