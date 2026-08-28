"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api, errorMessage } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Product } from "@/lib/types";
import { useProductStore } from "@/store/product-store";
import { useCategoryStore } from "@/store/category-store";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import PetFields, {
  PetFieldValues,
  toPetPayload,
} from "@/components/admin/PetFields";
import ImagesField from "@/components/admin/ImagesField";
import EnglishFields from "@/components/admin/EnglishFields";
import { SUPPLY_GROUPS, supplyGroupLabel } from "@/lib/supply-groups";

/** Loads the product, then hands it to the form so the form's initial state
 *  comes straight from props — no effect syncing fetched data into state. */
function EditProductLoader() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const {
    data: product,
    loading,
    error,
    reload,
  } = useAsync(() => {
    if (!id) throw new Error("Thiếu mã sản phẩm trên đường dẫn.");
    return api.products.get(id);
  }, [id]);

  if (loading) return <LoadingMessage label="Đang tải sản phẩm..." />;

  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <ErrorMessage message={error || "Không tìm thấy sản phẩm"} onRetry={reload} />
        <Link href="/admin-products" className="text-sm text-brand-deep underline">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return <EditProductForm product={product} />;
}

const inputClass =
  "w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none";
const labelClass = "mb-1 block text-xs font-semibold text-brand-deep/70";

function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const updateProduct = useProductStore((s) => s.updateProduct);
  const { categories, fetchCategories } = useCategoryStore();

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState(() => ({
    name: product.name,
    categoryId: product.categoryId,
    price: String(product.price),
    description: product.description,
    nameEn: product.nameEn || "",
    descriptionEn: product.descriptionEn || "",
    stock: String(product.stock),
    published: product.published,
    subCategory: product.subCategory || "",
  }));
  const [imagesText, setImagesText] = useState(() => product.images.join("\n"));
  const [petFields, setPetFields] = useState<PetFieldValues>(() => ({
    breed: product.breed || "",
    age: product.age || "",
    gender: product.gender ?? "",
    tags: product.tags.join(", "),
    vaccineDoses: product.vaccineDoses == null ? "" : String(product.vaccineDoses),
    warranty: product.warranty,
    birthDate: product.birthDate || "",
    weight: product.weight || "",
    color: product.color || "",
    suitability: product.suitability || "",
  }));

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Nhóm nhỏ chỉ áp dụng cho danh mục đồ dùng/phụ kiện.
  const isSupply =
    categories.find((c) => c.id === formData.categoryId)?.slug === "phu-kien";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      await updateProduct(product.id, {
        name: formData.name,
        categoryId: formData.categoryId,
        price: Number(formData.price) || 0,
        description: formData.description,
        nameEn: formData.nameEn.trim() || null,
        descriptionEn: formData.descriptionEn.trim() || null,
        images: imagesText
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean),
        stock: Number(formData.stock) || 0,
        published: formData.published,
        subCategory: isSupply ? formData.subCategory || undefined : undefined,
        ...toPetPayload(petFields),
      });
      router.push("/admin-products");
    } catch (err) {
      setSaveError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin-products" className="rounded-lg p-2 hover:bg-brand-cream">
          <ArrowLeft className="h-5 w-5 text-brand-deep/60" />
        </Link>
        <h1 className="text-xl font-bold text-brand-deep">Chỉnh sửa sản phẩm</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {saveError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {saveError}
          </div>
        )}

        <div>
          <label className={labelClass}>Tên sản phẩm *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Danh mục *</label>
            <select
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Giá bán (VNĐ) *</label>
            <input
              type="number"
              name="price"
              required
              min={0}
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {isSupply && (
          <div>
            <label className={labelClass}>Nhóm đồ dùng *</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              <option value="">— Chưa xếp nhóm —</option>
              {SUPPLY_GROUPS.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.icon} {supplyGroupLabel(g.slug)}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-brand-deep/40">
              Quyết định sản phẩm nằm ở mục nào trên trang Đồ dùng &amp; Phụ kiện.
            </p>
          </div>
        )}

        <PetFields
          values={petFields}
          onChange={(patch) => setPetFields((prev) => ({ ...prev, ...patch }))}
        />

        <div>
          <label className={labelClass}>Tồn kho *</label>
          <input
            type="number"
            name="stock"
            required
            min={0}
            value={formData.stock}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Mô tả sản phẩm</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>


        <EnglishFields
          fields={[
            {
              label: "Product name (EN)",
              value: formData.nameEn,
              onChange: (v) => setFormData((f) => ({ ...f, nameEn: v })),
              source: formData.name,
              placeholder: "e.g. British Shorthair Kitten - Smoke Blue",
            },
            {
              label: "Description (EN)",
              value: formData.descriptionEn,
              onChange: (v) => setFormData((f) => ({ ...f, descriptionEn: v })),
              source: formData.description,
              multiline: true,
            },
          ]}
        />
        <ImagesField value={imagesText} onChange={setImagesText} />

        <div className="flex items-center justify-between rounded-xl border border-brand-deep/10 bg-brand-cream/50 p-3">
          <div>
            <p className="text-sm font-semibold text-brand-deep">Trạng thái sản phẩm</p>
            <p className="text-xs text-brand-deep/50">
              {formData.published ? "Sản phẩm này ĐANG HIỆN ở cửa hàng" : "Sản phẩm này đang BỊ ẨN"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, published: !prev.published }))}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
              formData.published
                ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                : "border-amber-300 bg-amber-100 text-amber-800"
            }`}
          >
            {formData.published ? "Đang Hiện (Bấm để Ẩn)" : "Đã Ẩn (Bấm để Hiện)"}
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-brand-deep/10 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin-products")}
            className="rounded-xl border border-brand-deep/15 px-4 py-2.5 text-xs text-brand-deep/70 transition-colors hover:bg-brand-cream"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-deep px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-all hover:bg-brand-deep/90 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense>
      <EditProductLoader />
    </Suspense>
  );
}
