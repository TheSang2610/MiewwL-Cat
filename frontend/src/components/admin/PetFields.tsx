"use client";

import { useEffect } from "react";
import { PetGender } from "@/lib/types";
import { useBreedStore } from "@/store/breed-store";

export interface PetFieldValues {
  /** Khoá giống chọn từ thư viện. Rỗng nghĩa là chưa gắn giống nào. */
  breedId: string;
  age: string;
  gender: "" | PetGender;
  tags: string;
  vaccineDoses: string;
  warranty: boolean;
  birthDate: string;
  weight: string;
  color: string;
  suitability: string;
}

export const EMPTY_PET_FIELDS: PetFieldValues = {
  breedId: "",
  age: "",
  gender: "",
  tags: "",
  vaccineDoses: "",
  warranty: false,
  birthDate: "",
  weight: "",
  color: "",
  suitability: "",
};

/** Chuyển giá trị form (toàn chuỗi) sang payload gửi API. */
export function toPetPayload(values: PetFieldValues) {
  return {
    // Gửi `null` khi bỏ chọn để backend gỡ liên kết; `undefined` sẽ bị bỏ qua
    // và giống cũ dính lại mãi. Tên giống hiển thị do backend tự điền.
    breedId: values.breedId || null,
    age: values.age || undefined,
    gender: values.gender || null,
    tags: values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    vaccineDoses: values.vaccineDoses === "" ? null : Number(values.vaccineDoses),
    warranty: values.warranty,
    birthDate: values.birthDate || undefined,
    weight: values.weight || undefined,
    color: values.color || undefined,
    suitability: values.suitability || undefined,
  };
}

const inputClass =
  "w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none";
const labelClass = "mb-1 block text-xs font-semibold text-brand-deep/70";

/**
 * Các trường chỉ dùng cho thú cưng. Để trống nếu là phụ kiện hoặc dịch vụ.
 */
export default function PetFields({
  values,
  onChange,
}: {
  values: PetFieldValues;
  onChange: (patch: Partial<PetFieldValues>) => void;
}) {
  const breeds = useBreedStore((s) => s.breeds);
  const fetchBreeds = useBreedStore((s) => s.fetchBreeds);

  // Form sản phẩm có thể mở thẳng bằng URL, không đi qua trang Thư viện giống,
  // nên phải tự nạp danh sách — nếu không ô chọn giống rỗng và người dùng tưởng
  // là chưa có giống nào.
  useEffect(() => {
    if (breeds.length === 0) fetchBreeds();
  }, [breeds.length, fetchBreeds]);

  return (
    <fieldset className="space-y-4 rounded-2xl border border-brand-deep/10 bg-brand-cream/40 p-4">
      <legend className="px-1 text-xs font-semibold text-brand-deep">
        Thông tin thú cưng{" "}
        <span className="font-normal text-brand-deep/40">
          — bỏ trống nếu là phụ kiện / dịch vụ
        </span>
      </legend>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Giống</label>
          <select
            value={values.breedId}
            onChange={(e) => onChange({ breedId: e.target.value })}
            className={`${inputClass} bg-white`}
          >
            <option value="">— Không thuộc giống nào —</option>
            {breeds.map((b) => (
              <option key={b.id} value={b.id}>
                {b.species === "CAT" ? "Mèo" : "Chó"} · {b.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-brand-deep/40">
            Chọn từ Thư viện giống. Chính ô này quyết định bé hiện ở trang giống
            nào và giống đó có báo &quot;còn bé&quot; hay không.
          </p>
        </div>
        <div>
          <label className={labelClass}>Tuổi</label>
          <input
            type="text"
            value={values.age}
            onChange={(e) => onChange({ age: e.target.value })}
            className={inputClass}
            placeholder="Ví dụ: 3 tháng tuổi"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Giới tính</label>
          <select
            value={values.gender}
            onChange={(e) => onChange({ gender: e.target.value as "" | PetGender })}
            className={`${inputClass} bg-white`}
          >
            <option value="">— Không áp dụng —</option>
            <option value="MALE">Đực ♂</option>
            <option value="FEMALE">Cái ♀</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Số mũi đã tiêm</label>
          <input
            type="number"
            min={0}
            value={values.vaccineDoses}
            onChange={(e) => onChange({ vaccineDoses: e.target.value })}
            className={inputClass}
            placeholder="Ví dụ: 2"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Ngày sinh</label>
          <input
            type="text"
            value={values.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className={inputClass}
            placeholder="Ví dụ: 13/5/2026"
          />
        </div>
        <div>
          <label className={labelClass}>Cân nặng</label>
          <input
            type="text"
            value={values.weight}
            onChange={(e) => onChange({ weight: e.target.value })}
            className={inputClass}
            placeholder="Ví dụ: 1.2 kg"
          />
        </div>
        <div>
          <label className={labelClass}>Màu sắc</label>
          <input
            type="text"
            value={values.color}
            onChange={(e) => onChange({ color: e.target.value })}
            className={inputClass}
            placeholder="Ví dụ: Xanh khói"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tính cách (cách nhau bằng dấu phẩy)</label>
        <input
          type="text"
          value={values.tags}
          onChange={(e) => onChange({ tags: e.target.value })}
          className={inputClass}
          placeholder="Ví dụ: hiền lành, quấn chủ"
        />
        <p className="mt-1 text-[11px] text-brand-deep/40">Thẻ hiển thị tối đa 2 mục trên card.</p>
      </div>

      <div>
        <label className={labelClass}>Phù hợp với</label>
        <textarea
          rows={2}
          value={values.suitability}
          onChange={(e) => onChange({ suitability: e.target.value })}
          className={inputClass}
          placeholder="Ví dụ: Phù hợp gia đình có trẻ nhỏ, người mới nuôi lần đầu."
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-deep">
        <input
          type="checkbox"
          checked={values.warranty}
          onChange={(e) => onChange({ warranty: e.target.checked })}
          className="h-4 w-4 rounded border-brand-deep/20"
        />
        Có bảo hành sức khoẻ
      </label>
    </fieldset>
  );
}
