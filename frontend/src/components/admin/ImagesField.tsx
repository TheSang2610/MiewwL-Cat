"use client";

import { useRef, useState } from "react";
import { ImageOff, Upload as UploadIcon } from "lucide-react";
import { api, errorMessage } from "@/lib/api";

const inputClass =
  "w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none";
const labelClass = "mb-1 block text-xs font-semibold text-brand-deep/70";

/**
 * Ô nhập nhiều ảnh, dùng chung cho form sản phẩm và form giống.
 *
 * Xem trước ngay khi gõ, đúng thứ tự mà gallery công khai sẽ hiển thị — dòng
 * đầu tiên là ảnh bìa dùng ở mọi chỗ khác (thẻ sản phẩm, danh sách quản trị),
 * nên chỉ cần một ô này là đủ cho cả hai form.
 *
 * Ảnh nào tải hỏng sẽ hiện rõ là hỏng chứ không biến mất im lặng — gõ nhầm một
 * ký tự trong đường dẫn là chuyện rất dễ xảy ra.
 */
export default function ImagesField({
  label = "Hình ảnh (mỗi dòng 1 ảnh — dòng đầu tiên là ảnh bìa)",
  value,
  onChange,
  rows = 3,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  /** Tải lần lượt từng file rồi nối URL vào cuối danh sách. */
  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    const added: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const result = await api.uploads.create(file);
        added.push(result.url);
      }
    } catch (err) {
      setUploadError(errorMessage(err));
    } finally {
      if (added.length > 0) {
        const joined = added.join("\n");
        const existing = value.trim();
        onChange(existing ? `${existing}\n${joined}` : joined);
      }
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const urls = value
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        placeholder={"/breeds/ten-file.jpg\nhttps://..."}
      />

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-brand-deep/20 px-3 py-2 text-xs font-semibold text-brand-deep transition-colors hover:bg-brand-cream disabled:opacity-50"
        >
          <UploadIcon className="h-3.5 w-3.5" />
          {uploading ? "Đang tải lên..." : "Tải ảnh từ máy"}
        </button>
        <span className="text-[11px] text-brand-deep/40">
          JPEG / PNG / WebP, tối đa 3 MB mỗi ảnh
        </span>
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          onChange={(e) => upload(e.target.files)}
          className="hidden"
        />
      </div>

      {uploadError && (
        <p className="mt-2 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-[11px] text-rose-700">
          {uploadError}
        </p>
      )}

      <p className="mt-1.5 text-[11px] leading-relaxed text-brand-deep/50">
        Hoặc tự đặt đường dẫn: chép file vào thư mục{" "}
        <code className="rounded bg-brand-cream px-1">frontend/public/</code> rồi ghi đường
        dẫn bắt đầu bằng <code className="rounded bg-brand-cream px-1">/</code> — ví dụ{" "}
        <code className="rounded bg-brand-cream px-1">/breeds/be-bong.jpg</code>. Hoặc dán
        link ảnh đầy đủ (https://...). Ảnh thật của chính bé luôn bán tốt hơn ảnh minh hoạ.
      </p>

      {urls.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {urls.map((url, i) => (
            <div
              key={url + i}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-brand-deep/10 bg-brand-cream"
            >
              {broken[url] ? (
                <span
                  title={`Không tải được: ${url}`}
                  className="flex h-full w-full flex-col items-center justify-center gap-0.5 bg-rose-50 text-rose-500"
                >
                  <ImageOff className="h-4 w-4" />
                  <span className="text-[8px] font-semibold">lỗi</span>
                </span>
              ) : (
                /* Xem trước thôi, và URL do người dùng gõ tự do, nên dùng thẻ
                   <img> thường để khỏi phải khai mọi host vào next.config. */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={url}
                  alt={`Xem trước ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={() => setBroken((b) => ({ ...b, [url]: true }))}
                />
              )}
              {i === 0 && !broken[url] && (
                <span className="absolute inset-x-0 bottom-0 bg-brand-deep/80 py-0.5 text-center text-[9px] font-semibold text-white">
                  Ảnh bìa
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
