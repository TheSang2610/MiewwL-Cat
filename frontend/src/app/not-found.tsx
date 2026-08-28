"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

/**
 * Trang 404 của cả site. Là client component vì phải đổi ngôn ngữ theo lựa
 * chọn VI/EN của khách, giống mọi trang khác ở phía cửa hàng.
 */
export default function NotFound() {
  const t = useT();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-cream px-4 py-24 text-center font-montserrat text-brand-deep">
      <p className="mb-4 text-6xl" aria-hidden="true">
        🐾
      </p>
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-gold">404</p>
      <h1 className="mb-3 text-2xl font-extrabold md:text-3xl">{t("notFound.title")}</h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-brand-deep/60">
        {t("notFound.desc")}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-deep px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90"
        >
          {t("notFound.home")}
        </Link>
        <Link
          href="/meo"
          className="rounded-full border border-brand-deep/20 px-7 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
        >
          {t("notFound.browse")}
        </Link>
      </div>
    </div>
  );
}
