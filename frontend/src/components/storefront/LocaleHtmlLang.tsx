"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n, MessageKey } from "@/lib/i18n";

/**
 * Đường dẫn cố định → khoá tiêu đề. Trang chi tiết (`/product-detail`,
 * `/breed-detail`, `/blog-post`) không có ở đây vì tiêu đề của chúng là tên
 * món đang xem — các trang đó tự gọi `useDocumentTitle` với tên thật.
 */
const TITLE_BY_PATH: Record<string, MessageKey> = {
  "/": "pageTitle.home",
  "/meo": "pageTitle.cats",
  "/cho": "pageTitle.dogs",
  "/phu-kien": "pageTitle.supplies",
  "/spa": "pageTitle.spa",
  "/cham-soc": "pageTitle.care",
  "/blog": "pageTitle.blog",
  "/nguon-anh": "pageTitle.credits",
  "/checkout": "pageTitle.checkout",
  "/checkout-payment": "pageTitle.payment",
  "/checkout-success": "pageTitle.success",
  "/account-orders": "pageTitle.orders",
  "/tai-khoan": "pageTitle.account",
  "/dang-nhap": "pageTitle.login",
  "/dang-ky": "pageTitle.register",
};

/**
 * Đồng bộ `<html lang>` và tiêu đề tab với ngôn ngữ khách đang chọn.
 *
 * `layout.tsx` là server component nên không đọc được lựa chọn nằm trong
 * localStorage — component nhỏ này lo cả hai việc đó, không render gì cả.
 */
export default function LocaleHtmlLang() {
  const { t, locale } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    // Tiếng Việt thì giữ nguyên tiêu đề server đã dựng.
    if (locale !== "en" || !pathname) return;
    const key = TITLE_BY_PATH[pathname];
    if (!key) return;
    document.title = `${t(key)} | ${t("pageTitle.suffix")}`;
  }, [locale, pathname, t]);

  return null;
}
