"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBreedStore } from "@/store/breed-store";
import { matchesSearch } from "@/lib/text";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import BreedActions from "./BreedActions";

const SIZE_LABELS: Record<string, string> = {
  SMALL: "Nhỏ",
  MEDIUM: "Trung bình",
  LARGE: "Lớn",
  XLARGE: "Rất lớn",
};

export default function AdminBreedsPage() {
  const { breeds, loading, error, fetchBreeds } = useBreedStore();

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // `published` rỗng để lấy cả giống đang ẩn — admin cần thấy hết.
    fetchBreeds();
  }, [fetchBreeds]);

  const filtered = useMemo(
    () =>
      breeds.filter((b) => {
        if (!matchesSearch(search, b.name, b.alias)) return false;
        if (species && b.species !== species) return false;
        if (size && b.size !== size) return false;
        if (status === "published" && !b.published) return false;
        if (status === "hidden" && b.published) return false;
        if (status === "available" && b.availableCount <= 0) return false;
        return true;
      }),
    [breeds, search, species, size, status]
  );

  const isFiltered = search.trim() !== "" || !!species || !!size || !!status;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-deep">Quản lý Giống</h1>
          <p className="text-sm text-brand-deep/50">
            Catalogue giống hiển thị ở /meo, /cho, /cham-soc và trang chủ
          </p>
        </div>
        <Link
          href="/admin-breed-new"
          className="rounded-xl bg-brand-deep px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-deep/90"
        >
          + Thêm giống
        </Link>
      </div>

      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm theo tên giống hoặc tên gọi khác..."
        shown={filtered.length}
        total={breeds.length}
        filters={[
          {
            label: "Loài",
            value: species,
            onChange: setSpecies,
            options: [
              { value: "CAT", label: "Mèo" },
              { value: "DOG", label: "Chó" },
            ],
          },
          {
            label: "Kích cỡ",
            value: size,
            onChange: setSize,
            options: Object.entries(SIZE_LABELS).map(([value, label]) => ({ value, label })),
          },
          {
            label: "Trạng thái",
            value: status,
            onChange: setStatus,
            options: [
              { value: "published", label: "Đang hiện" },
              { value: "hidden", label: "Đã ẩn" },
              { value: "available", label: "Đang có bé sẵn" },
            ],
          },
        ]}
      />

      {loading ? (
        <LoadingMessage label="Đang tải danh sách giống..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchBreeds()} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-brand-deep/10 bg-brand-cream/60 text-xs font-semibold uppercase text-brand-deep/50">
                  <th className="p-4">Ảnh</th>
                  <th className="p-4">Tên giống</th>
                  <th className="p-4">Loài</th>
                  <th className="p-4">Kích cỡ</th>
                  <th className="p-4">Khoảng giá</th>
                  <th className="p-4">Đang bán</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-deep/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-xs text-brand-deep/40">
                      {isFiltered
                        ? "Không tìm thấy giống nào khớp bộ lọc."
                        : "Chưa có giống nào."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-brand-cream/30">
                      <td className="p-4">
                        <Image
                          src={b.image || "/placeholder.svg"}
                          alt={b.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg border border-brand-deep/10 object-cover"
                        />
                      </td>
                      <td className="p-4 font-medium text-brand-deep">{b.name}</td>
                      <td className="p-4 text-xs text-brand-deep/60">
                        {b.species === "CAT" ? "Mèo" : "Chó"}
                      </td>
                      <td className="p-4 text-xs text-brand-deep/60">{SIZE_LABELS[b.size]}</td>
                      <td className="p-4 text-xs font-semibold text-brand-deep/70">
                        {b.priceMin.toLocaleString("vi-VN")}–{b.priceMax.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="p-4 text-xs font-semibold text-brand-deep/70">
                        {b.availableCount}
                      </td>
                      <td className="p-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            b.published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-brand-deep/10 text-brand-deep/50"
                          }`}
                        >
                          {b.published ? "Đang hiện" : "Đã ẩn"}
                        </span>
                      </td>
                      <td className="p-4">
                        <BreedActions breedId={b.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
