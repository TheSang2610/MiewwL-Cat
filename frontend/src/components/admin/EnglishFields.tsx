"use client";

import { Languages } from "lucide-react";

export interface EnglishFieldSpec {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Nội dung tiếng Việt tương ứng, hiện mờ bên dưới để đối chiếu khi dịch. */
  source?: string;
  multiline?: boolean;
  placeholder?: string;
}

/**
 * Khối nhập bản tiếng Anh cho nội dung shop tự tạo.
 *
 * Bỏ trống hết cũng không sao: site sẽ tra từ điển `content-en.ts`, không có
 * nữa thì giữ nguyên tiếng Việt. Điền vào đây là cách nhanh nhất để sản phẩm
 * hoặc giống mới hiện đúng tiếng Anh mà không phải sửa code.
 *
 * Gập lại mặc định để không làm rối form với người chỉ bán cho khách Việt.
 */
export default function EnglishFields({ fields }: { fields: EnglishFieldSpec[] }) {
  const filled = fields.filter((f) => f.value.trim()).length;

  return (
    <details className="rounded-xl border border-brand-deep/10 bg-brand-cream/40 p-4">
      <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-deep">
        <Languages className="h-4 w-4" />
        Bản tiếng Anh (không bắt buộc)
        <span className="ml-auto text-xs font-normal text-brand-deep/45">
          {filled > 0 ? `đã điền ${filled}/${fields.length}` : "để trống cũng được"}
        </span>
      </summary>

      <p className="mt-3 text-xs leading-relaxed text-brand-deep/55">
        Khách bấm <strong>EN</strong> trên website sẽ thấy nội dung ở đây. Để trống thì
        site tự tra từ điển có sẵn; không có trong từ điển thì giữ nguyên tiếng Việt.
      </p>

      <div className="mt-4 space-y-4">
        {fields.map((field) => (
          <div key={field.label}>
            <label className="mb-1 block text-xs font-medium text-brand-deep/70">
              {field.label}
            </label>
            {field.multiline ? (
              <textarea
                rows={3}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-brand-deep/15 px-3 py-2 text-sm focus:border-brand-deep focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-brand-deep/15 px-3 py-2 text-sm focus:border-brand-deep focus:outline-none"
              />
            )}
            {field.source?.trim() && (
              <p className="mt-1 line-clamp-2 text-[11px] italic text-brand-deep/40">
                Tiếng Việt: {field.source}
              </p>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
