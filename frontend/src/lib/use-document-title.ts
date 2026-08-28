"use client";

import { useEffect } from "react";
import { useI18n, MessageKey } from "@/lib/i18n";

/**
 * Đổi tiêu đề tab trình duyệt theo ngôn ngữ khách đang chọn.
 *
 * `metadata` trong Next do server dựng, mà lựa chọn ngôn ngữ lại nằm trong
 * localStorage của trình duyệt — server không đọc được. Nên bản tiếng Anh phải
 * ghi đè tiêu đề ở phía client sau khi hydrate xong.
 *
 * Ở tiếng Việt hook này KHÔNG làm gì: giữ nguyên tiêu đề server đã dựng, để
 * công cụ tìm kiếm đọc đúng bản gốc.
 */
export function useDocumentTitle(title: string | undefined | null) {
  const { t, locale } = useI18n();

  useEffect(() => {
    if (locale !== "en" || !title) return;
    const previous = document.title;
    document.title = `${title} | ${t("pageTitle.suffix")}`;
    return () => {
      document.title = previous;
    };
  }, [title, locale, t]);
}

/** Bản dùng khoá dịch, cho các trang có tiêu đề cố định. */
export function usePageTitle(key: MessageKey) {
  const { t } = useI18n();
  useDocumentTitle(t(key));
}
