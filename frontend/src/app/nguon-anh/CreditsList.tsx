"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { IMAGE_CREDITS } from "@/data/image-credits";
import { useT } from "@/lib/i18n";

/**
 * Trang ghi công ảnh.
 *
 * Ảnh trên site lấy từ Wikimedia Commons, phần lớn ở giấy phép CC BY / CC BY-SA
 * — dùng thương mại được nhưng bắt buộc ghi tên tác giả và giấy phép. Trang này
 * chính là phần "ghi công" đó, nên đừng xoá khi vẫn còn dùng các ảnh này.
 */
export default function CreditsList() {
  const t = useT();

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <main className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <span className="font-medium text-brand-deep">{t("credits.breadcrumb")}</span>
        </nav>

        <h1 className="mb-3 text-2xl font-extrabold md:text-3xl">{t("credits.title")}</h1>
        <p className="mb-3 max-w-2xl text-sm leading-relaxed text-brand-deep/65">
          {t("credits.desc")}
        </p>
        <p className="mb-8 max-w-2xl rounded-xl bg-white/70 p-3 text-xs leading-relaxed text-brand-deep/50">
          {t("credits.note")}
        </p>

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-deep/40">
          {t("credits.count", { count: IMAGE_CREDITS.length })}
        </p>

        <ul className="space-y-2">
          {IMAGE_CREDITS.map((credit) => (
            <li
              key={credit.src}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-cream">
                <Image src={credit.src} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-[11px] text-brand-deep/40">
                  {credit.src}
                </span>
                <span className="block truncate text-sm font-medium text-brand-deep">
                  {credit.author}
                </span>
                <span className="block text-xs text-brand-deep/50">
                  {credit.licenseUrl ? (
                    <a
                      href={credit.licenseUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline underline-offset-2 hover:text-brand-deep"
                    >
                      {credit.license}
                    </a>
                  ) : (
                    credit.license
                  )}
                </span>
              </span>
              {credit.source && (
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t("credits.viewSource")}
                  title={t("credits.viewSource")}
                  className="shrink-0 rounded-lg p-2 text-brand-deep/35 transition-colors hover:bg-brand-cream hover:text-brand-deep"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
