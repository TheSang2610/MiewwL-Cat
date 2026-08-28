"use client";

import Image from "next/image";
import { useI18n, formatNumber } from "@/lib/i18n";
import { GROOMING_SESSIONS } from "@/lib/shop-stats";

/** Ảnh minh hoạ dịch vụ tắm — thay bằng ảnh thật chụp tại tiệm khi có. */
const HERO_IMAGE = "/supplies/goi-spa-tam-rua-cat-tia-long-co-ban-1.jpg";

export default function SpaHero() {
  const { t, locale } = useI18n();
  const trust = [t("spa.heroTrust1"), t("spa.heroTrust2"), t("spa.heroTrust3")];

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-20 md:grid-cols-2 md:items-center md:pt-28">
      <div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-gold">
          {t("spa.heroKicker")}
        </div>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-brand-deep md:text-5xl">
          {t("spa.heroTitle1")}{" "}
          <span className="text-brand-gold">{t("spa.heroTitleHighlight")}</span>
          <br />
          {t("spa.heroTitle2")}
        </h1>
        <p className="mb-6 max-w-md text-base text-brand-deep/60">{t("spa.heroDesc")}</p>
        <div className="mb-6 flex flex-wrap gap-3">
          <a
            href="#calc"
            className="rounded-xl bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {t("spa.heroCalc")}
          </a>
          <a
            href="#pricing"
            className="rounded-xl border border-brand-deep/20 px-6 py-3 text-sm font-semibold text-brand-deep transition-colors hover:border-brand-deep/40"
          >
            {t("spa.heroPricing")}
          </a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-brand-deep/60">
          {trust.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] bg-stone-100">
          <Image
            src={HERO_IMAGE}
            alt={t("spa.heroImageAlt")}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-2xl border border-brand-deep/10 bg-white px-4 py-3 shadow-lg">
          <span className="text-xl">🐾</span>
          <span>
            <span className="block text-[10px] font-medium text-brand-deep/50">
              {t("spa.heroGroomed")}
            </span>
            <span className="block text-sm font-extrabold text-brand-deep">
              {formatNumber(GROOMING_SESSIONS, locale)}+
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
