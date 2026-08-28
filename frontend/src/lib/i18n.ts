"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useLocaleStore, Locale } from "@/store/locale-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { vi, en, MessageKey } from "@/lib/messages";

export type { Locale };
export type { MessageKey };

export type Translate = (
  key: MessageKey,
  vars?: Record<string, string | number>
) => string;

/**
 * Ngôn ngữ + hàm dịch cho phần khách hàng.
 *
 * Hai điều cần nhớ:
 *  1. Ngôn ngữ nằm trong localStorage nên server không thấy được. Nếu render
 *     thẳng tiếng Anh ở lần render đầu của client thì HTML sẽ lệch với HTML
 *     server đã dựng (tiếng Việt) và React báo lỗi hydrate — vì vậy luôn coi
 *     là tiếng Việt cho tới khi hydrate xong, giống cách giỏ hàng và mục yêu
 *     thích đang làm.
 *  2. Khu quản trị luôn tiếng Việt. Chốt ngay tại đây thay vì ở từng chỗ gọi,
 *     để các component dùng chung (StateMessage...) tự động đúng khi được
 *     render bên trong /admin.
 */
export function useI18n() {
  const saved = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const mounted = useHasMounted();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  const locale: Locale = !mounted || isAdmin ? "vi" : saved;

  const t = useCallback<Translate>(
    (key, vars) => {
      const raw = (locale === "en" ? en : vi)[key] ?? key;
      if (!vars) return raw;
      return Object.entries(vars).reduce(
        (acc, [name, value]) => acc.split(`{${name}}`).join(String(value)),
        raw as string
      );
    },
    [locale]
  );

  return useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
}

/** Chỉ lấy hàm dịch, cho các component không quan tâm tới ngôn ngữ hiện tại. */
export function useT(): Translate {
  return useI18n().t;
}

/** Giá tiền Việt: `270.000đ` cho tiếng Việt, `270,000₫` cho tiếng Anh. */
export function formatPrice(amount: number, locale: Locale) {
  const n = Math.round(amount);
  return locale === "en"
    ? `${n.toLocaleString("en-US")}₫`
    : `${n.toLocaleString("vi-VN")}đ`;
}

/** Số lượng lớn (10.000+ / 10,000+) theo đúng dấu phân cách của ngôn ngữ. */
export function formatNumber(value: number, locale: Locale) {
  return value.toLocaleString(locale === "en" ? "en-US" : "vi-VN");
}

export function formatDate(value: string | Date, locale: Locale) {
  return new Date(value).toLocaleDateString(locale === "en" ? "en-GB" : "vi-VN");
}
