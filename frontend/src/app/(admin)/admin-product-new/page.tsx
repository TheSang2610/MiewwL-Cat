"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/product-store";
import { useCategoryStore } from "@/store/category-store";
import { errorMessage } from "@/lib/api";
import PetFields, {
  EMPTY_PET_FIELDS,
  PetFieldValues,
  toPetPayload,
} from "@/components/admin/PetFields";
import ImagesField from "@/components/admin/ImagesField";
import EnglishFields from "@/components/admin/EnglishFields";
import { SUPPLY_GROUPS, supplyGroupLabel } from "@/lib/supply-groups";

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useProductStore((s) => s.addProduct);
  const { categories, fetchCategories } = useCategoryStore();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [petFields, setPetFields] = useState<PetFieldValues>(EMPTY_PET_FIELDS);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    nameEn: "",
    descriptionEn: "",
    stock: "",
    subCategory: "",
  });
  const [imagesText, setImagesText] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Derived rather than synced into state: until the user picks something,
  // the selection follows the first loaded category.
  const selectedCategoryId = formData.categoryId || categories[0]?.id || "";
  // Nhóm nhỏ chỉ áp dụng cho danh mục đồ dùng/phụ kiện.
  const isSupply =
    categories.find((c) => c.id === selectedCategoryId)?.slug === "phu-kien";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await addProduct({
        name: formData.name,
        categoryId: selectedCategoryId,
        price: Number(formData.price) || 0,
        description: formData.description,
        nameEn: formData.nameEn.trim() || null,
        descriptionEn: formData.descriptionEn.trim() || null,
        images: imagesText
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean),
        stock: Number(formData.stock) || 0,
        published: true,
        subCategory: isSupply ? formData.subCategory || undefined : undefined,
        ...toPetPayload(petFields),
      });
      router.push("/admin-products");
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none";
  const labelClass = "mb-1 block text-xs font-semibold text-brand-deep/70";

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-xl font-bold text-brand-deep">Thêm sản phẩm mới</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {error}
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
            placeholder="Ví dụ: Mèo Anh lông ngắn"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Danh mục *</label>
            <select
              name="categoryId"
              required
              value={selectedCategoryId}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              {categories.length === 0 && <option value="">Đang tải...</option>}
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
              placeholder="Ví dụ: 500000"
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
            placeholder="Ví dụ: 10"
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

        <button
          type="submit"
          disabled={saving || categories.length === 0}
          className="w-full rounded-xl bg-brand-deep py-2.5 text-sm font-medium text-white hover:bg-brand-deep/90 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Đăng sản phẩm"}
        </button>
      </form>
    </div>
  );
}
