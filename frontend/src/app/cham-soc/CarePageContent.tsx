"use client";

import Link from "next/link";
import CareGuideList from "./CareGuideList";
import { useT } from "@/lib/i18n";

export default function CarePageContent() {
  const t = useT();

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <span className="font-medium text-brand-deep">{t("care.breadcrumb")}</span>
        </nav>

        <section className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-pink/30 px-3 py-1">
            <span className="text-xs font-semibold text-brand-deep">{t("care.badge")}</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl">{t("care.title")}</h1>
          <p className="mx-auto max-w-2xl text-base text-brand-deep/60">{t("care.desc")}</p>
        </section>

        <CareGuideList />

        <section className="rounded-3xl bg-white p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold">{t("care.whyTitle")}</h2>
          <div className="space-y-3 text-sm leading-relaxed text-brand-deep/80">
            <p>{t("care.whyP1")}</p>
            <p>{t("care.whyP2")}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
