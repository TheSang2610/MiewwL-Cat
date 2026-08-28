"use client";

import { useCallback } from "react";
import { useI18n, Locale } from "@/lib/i18n";
import { CONTENT_EN } from "@/lib/content-en";

/**
 * Dịch phần nội dung do shop nhập trong database (tên, mô tả, tag, tuổi...).
 *
 * Khác với `t()` — vốn dịch chữ cố định của giao diện theo key — hàm này nhận
 * thẳng chuỗi tiếng Việt lấy từ API rồi tra trong `content-en.ts`.
 *
 * Ba nguyên tắc:
 *  1. Tiếng Việt thì trả về nguyên văn, không đụng gì.
 *  2. Không tìm thấy bản dịch thì cũng trả về nguyên văn. Sản phẩm mới thêm
 *     sẽ tạm hiện tiếng Việt cho tới khi có người bổ sung vào từ điển — thà
 *     vậy còn hơn để trống.
 *  3. Chữ hoa/thường ở đầu chuỗi giữ theo bản gốc, nên tag "Hiền lành" và
 *     "hiền lành" dùng chung một dòng từ điển.
 */

/** Các mẫu lặp lại theo số, dịch bằng quy tắc để không phải liệt kê từng giá trị. */
const PATTERNS: { re: RegExp; en: (n: string) => string }[] = [
  { re: /^([\d.,]+)\s*tháng tuổi$/i, en: (n) => `${n} ${n === "1" ? "month" : "months"} old` },
  { re: /^([\d.,]+)\s*tuần tuổi$/i, en: (n) => `${n} ${n === "1" ? "week" : "weeks"} old` },
  { re: /^([\d.,]+)\s*(?:năm|tuổi)$/i, en: (n) => `${n} ${n === "1" ? "year" : "years"} old` },
];

function applySourceCase(source: string, translated: string) {
  const first = source.trimStart().charAt(0);
  if (!first || !translated) return translated;
  const startsUpper = first !== first.toLowerCase();
  return startsUpper
    ? translated.charAt(0).toUpperCase() + translated.slice(1)
    : translated.charAt(0).toLowerCase() + translated.slice(1);
}

export function translateContent(text: string | null | undefined, locale: Locale): string {
  const raw = text ?? "";
  if (locale !== "en" || !raw.trim()) return raw;

  const key = raw.trim().toLowerCase();

  const hit = CONTENT_EN[key];
  if (hit) return applySourceCase(raw, hit);

  for (const { re, en } of PATTERNS) {
    const m = key.match(re);
    if (m) return en(m[1]);
  }

  return raw;
}

export type TranslateContent = (text: string | null | undefined) => string;

/** Hàm dịch nội dung database, tự tắt khi đang ở tiếng Việt hoặc trong /admin. */
export function useContent(): TranslateContent {
  const { locale } = useI18n();
  return useCallback((text: string | null | undefined) => translateContent(text, locale), [locale]);
}

/** Tiện cho các trường dạng danh sách như `careGuide` của giống. */
export function useContentList(): (items: string[] | null | undefined) => string[] {
  const c = useContent();
  return useCallback((items) => (items ?? []).map(c), [c]);
}

export type TranslateField = (vi: string | null | undefined, en?: string | null) => string;

/**
 * Dịch một trường của database, ưu tiên theo ba bước:
 *  1. Bản tiếng Anh shop tự nhập trong trang quản trị (`nameEn`, `descriptionEn`...)
 *  2. Từ điển `content-en.ts`
 *  3. Giữ nguyên tiếng Việt
 *
 * Nhờ bước 1 mà sản phẩm mới thêm hiện đúng tiếng Anh ngay, không phải chờ ai
 * đó sửa code.
 */
export function useTranslated(): TranslateField {
  const { locale } = useI18n();
  return useCallback(
    (vi, en) => {
      if (locale === "en" && en && en.trim()) return en;
      return translateContent(vi, locale);
    },
    [locale]
  );
}
