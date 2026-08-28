"use client";

import { BreedSize, Species } from "@/lib/types";
import EnglishFields from "./EnglishFields";
import ImagesField from "./ImagesField";

export interface BreedFieldValues {
  name: string;
  alias: string;
  description: string;
  species: Species;
  size: BreedSize;
  weightRange: string;
  priceMin: string;
  priceMax: string;
  images: string;
  tags: string;
  careGuide: string;
  suitability: string;
  careNotes: string;
  aliasEn: string;
  descriptionEn: string;
  suitabilityEn: string;
  careNotesEn: string;
  warning: string;
  energyLevel: string;
  apartmentFriendly: string;
  kidFriendly: string;
  petFriendly: string;
  sheddingLevel: string;
  groomingNeeds: string;
  trainability: string;
  barkingLevel: string;
  position: string;
  published: boolean;
}

export const EMPTY_BREED_FIELDS: BreedFieldValues = {
  name: "",
  alias: "",
  description: "",
  species: "CAT",
  size: "MEDIUM",
  weightRange: "",
  priceMin: "",
  priceMax: "",
  images: "",
  tags: "",
  careGuide: "",
  suitability: "",
  careNotes: "",
  aliasEn: "",
  descriptionEn: "",
  suitabilityEn: "",
  careNotesEn: "",
  warning: "",
  energyLevel: "",
  apartmentFriendly: "",
  kidFriendly: "",
  petFriendly: "",
  sheddingLevel: "",
  groomingNeeds: "",
  trainability: "",
  barkingLevel: "",
  position: "0",
  published: true,
};

const TRAIT_FIELDS: { key: keyof BreedFieldValues; label: string }[] = [
  { key: "energyLevel", label: "Mức năng lượng" },
  { key: "apartmentFriendly", label: "Hợp căn hộ" },
  { key: "kidFriendly", label: "Thân thiện trẻ nhỏ" },
  { key: "petFriendly", label: "Hòa đồng thú khác" },
  { key: "sheddingLevel", label: "Mức rụng lông" },
  { key: "groomingNeeds", label: "Nhu cầu chải lông" },
  { key: "trainability", label: "Dễ huấn luyện" },
  { key: "barkingLevel", label: "Mức sủa / kêu" },
];

/** Chuyển giá trị form (toàn chuỗi) sang payload gửi API. */
export function toBreedPayload(values: BreedFieldValues) {
  const trait = (v: string) => (v.trim() === "" ? undefined : Number(v));
  const images = values.images
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    name: values.name,
    alias: values.alias || undefined,
    description: values.description,
    species: values.species,
    size: values.size,
    weightRange: values.weightRange || undefined,
    priceMin: Number(values.priceMin) || 0,
    priceMax: Number(values.priceMax) || 0,
    // `image` (singular) is the catalog/list thumbnail — derived from the
    // gallery's first photo so the admin only maintains one image list.
    image: images[0] || undefined,
    images,
    tags: values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    careGuide: values.careGuide
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean),
    suitability: values.suitability || undefined,
    careNotes: values.careNotes || undefined,
    aliasEn: values.aliasEn.trim() || null,
    descriptionEn: values.descriptionEn.trim() || null,
    suitabilityEn: values.suitabilityEn.trim() || null,
    careNotesEn: values.careNotesEn.trim() || null,
    warning: values.warning || undefined,
    energyLevel: trait(values.energyLevel),
    apartmentFriendly: trait(values.apartmentFriendly),
    kidFriendly: trait(values.kidFriendly),
    petFriendly: trait(values.petFriendly),
    sheddingLevel: trait(values.sheddingLevel),
    groomingNeeds: trait(values.groomingNeeds),
    trainability: trait(values.trainability),
    barkingLevel: trait(values.barkingLevel),
    position: Number(values.position) || 0,
    published: values.published,
  };
}

const inputClass =
  "w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none";
const labelClass = "mb-1 block text-xs font-semibold text-brand-deep/70";

export default function BreedFields({
  values,
  onChange,
}: {
  values: BreedFieldValues;
  onChange: (patch: Partial<BreedFieldValues>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>Tên giống *</label>
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={inputClass}
          placeholder="Ví dụ: Poodle"
        />
      </div>

      <div>
        <label className={labelClass}>Tên gọi khác (không bắt buộc)</label>
        <input
          type="text"
          value={values.alias}
          onChange={(e) => onChange({ alias: e.target.value })}
          className={inputClass}
          placeholder="Ví dụ: Toy / Tiny Poodle"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Loài *</label>
          <select
            value={values.species}
            onChange={(e) => onChange({ species: e.target.value as Species })}
            className={`${inputClass} bg-white`}
          >
            <option value="CAT">Mèo</option>
            <option value="DOG">Chó</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Kích cỡ *</label>
          <select
            value={values.size}
            onChange={(e) => onChange({ size: e.target.value as BreedSize })}
            className={`${inputClass} bg-white`}
          >
            <option value="SMALL">Nhỏ</option>
            <option value="MEDIUM">Trung bình</option>
            <option value="LARGE">Lớn</option>
            <option value="XLARGE">Rất lớn</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Cân nặng (vd 3-5kg)</label>
          <input
            type="text"
            value={values.weightRange}
            onChange={(e) => onChange({ weightRange: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Giá thấp nhất (VNĐ) *</label>
          <input
            type="number"
            required
            min={0}
            value={values.priceMin}
            onChange={(e) => onChange({ priceMin: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Giá cao nhất (VNĐ) *</label>
          <input
            type="number"
            required
            min={0}
            value={values.priceMax}
            onChange={(e) => onChange({ priceMax: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Mô tả</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className={inputClass}
        />
      </div>

      <ImagesField value={values.images} onChange={(v) => onChange({ images: v })} />

      <div>
        <label className={labelClass}>Tính cách (cách nhau bằng dấu phẩy)</label>
        <input
          type="text"
          value={values.tags}
          onChange={(e) => onChange({ tags: e.target.value })}
          className={inputClass}
          placeholder="Ví dụ: hiền lành, quấn chủ"
        />
      </div>

      <div>
        <label className={labelClass}>Cẩm nang chăm sóc (mỗi dòng 1 mẹo)</label>
        <textarea
          rows={4}
          value={values.careGuide}
          onChange={(e) => onChange({ careGuide: e.target.value })}
          className={inputClass}
          placeholder={"Chải lông 2-3 lần/tuần...\nVận động nhẹ 20-30 phút mỗi ngày..."}
        />
      </div>

      <div>
        <label className={labelClass}>Phù hợp với (đoạn văn, trang chi tiết giống)</label>
        <textarea
          rows={2}
          value={values.suitability}
          onChange={(e) => onChange({ suitability: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Lưu ý chăm sóc (đoạn văn, trang chi tiết giống)</label>
        <textarea
          rows={2}
          value={values.careNotes}
          onChange={(e) => onChange({ careNotes: e.target.value })}
          className={inputClass}
        />
      </div>

      <EnglishFields
        fields={[
          {
            label: "Alias (EN)",
            value: values.aliasEn,
            onChange: (v) => onChange({ aliasEn: v }),
            source: values.alias,
            placeholder: "e.g. British Shorthair cat",
          },
          {
            label: "Description (EN)",
            value: values.descriptionEn,
            onChange: (v) => onChange({ descriptionEn: v }),
            source: values.description,
            multiline: true,
          },
          {
            label: "Best suited to (EN)",
            value: values.suitabilityEn,
            onChange: (v) => onChange({ suitabilityEn: v }),
            source: values.suitability,
            multiline: true,
          },
          {
            label: "Care notes (EN)",
            value: values.careNotesEn,
            onChange: (v) => onChange({ careNotesEn: v }),
            source: values.careNotes,
            multiline: true,
          },
        ]}
      />

      <div>
        <label className={labelClass}>Cảnh báo ngắn (hiện ô vàng cạnh giá, bỏ trống nếu không có)</label>
        <input
          type="text"
          value={values.warning}
          onChange={(e) => onChange({ warning: e.target.value })}
          className={inputClass}
          placeholder="Ví dụ: Cẩn thận cột sống do chân ngắn"
        />
      </div>

      <div>
        <label className={labelClass}>Tính cách &amp; lối sống (thang 1-5, để trống nếu không áp dụng)</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRAIT_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1 block text-[11px] text-brand-deep/60">{label}</label>
              <input
                type="number"
                min={1}
                max={5}
                value={values[key] as string}
                onChange={(e) => onChange({ [key]: e.target.value } as Partial<BreedFieldValues>)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Thứ tự hiển thị</label>
        <input
          type="number"
          value={values.position}
          onChange={(e) => onChange({ position: e.target.value })}
          className={inputClass}
        />
      </div>
    </div>
  );
}
