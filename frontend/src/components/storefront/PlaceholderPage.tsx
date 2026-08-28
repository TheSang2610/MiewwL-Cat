"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * Trang giới thiệu tạm cho các mục chưa có nội dung thật (blog, cẩm nang...).
 * Thay phần children bằng nội dung thật khi có.
 */
export default function PlaceholderPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const t = useT();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-brand-deep/60 hover:text-brand-deep"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("placeholder.backHome")}
      </Link>

      <span className="inline-flex items-center rounded-full bg-brand-deep/5 px-3 py-1 text-xs font-semibold text-brand-deep/50">
        {t("common.comingSoon")}
      </span>

      <h1 className="mt-4 text-3xl font-extrabold text-brand-deep md:text-4xl">{title}</h1>
      <p className="mt-3 text-base text-brand-deep/70">{description}</p>

      {children && <div className="mt-10 space-y-4 text-sm text-brand-deep/70">{children}</div>}
    </div>
  );
}
