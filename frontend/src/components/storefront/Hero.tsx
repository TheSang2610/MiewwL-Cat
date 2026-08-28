"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import Typewriter from "./Typewriter";
import { useI18n, formatNumber } from "@/lib/i18n";

/**
 * Chân dung hero. Đang dùng ảnh minh hoạ trong `public/breeds`; khi có ảnh
 * thật chụp tại cửa hàng thì bỏ file vào `public/` và đổi đường dẫn ở đây.
 */
const HERO_IMAGE = "/breeds/scottish-fold-1.jpg";
const HERO_CAPTION = "MiewwL Pet House – Since 2025";

export default function Hero() {
  const { t, locale } = useI18n();

  const trustBadges = [
    t("hero.badgeRating"),
    t("hero.badgeTrust"),
    t("hero.badgeWarranty"),
    t("hero.badgeShipping"),
  ];

  const typedPhrases = [t("hero.typed1"), t("hero.typed2")];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#FFCFE9_0%,#FFF6E6_45%,rgba(157,209,211,0.3)_100%)] py-8 md:py-28">
      {/* Vệt màu trang trí */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-pink/20 blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-16 h-56 w-56 rounded-full bg-brand-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[55%_45%]">
          {/* Cột nội dung */}
          <div className="order-1">
            <Reveal>
              <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.35] tracking-tight text-brand-deep md:text-5xl lg:text-5xl">
                {t("hero.title")}
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-4 max-w-2xl text-base text-brand-deep/70 md:mt-6 md:text-xl">
                {/* Đổi ngôn ngữ thì key đổi theo để hiệu ứng gõ chữ chạy lại từ đầu. */}
                <Typewriter key={typedPhrases[0]} phrases={typedPhrases} />{" "}
                {t("hero.subtitleBefore")}{" "}
                <strong className="font-bold text-brand-deep">
                  +{formatNumber(1000, locale)}
                </strong>{" "}
                {t("hero.subtitleAfter")}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-6 flex flex-col gap-2 md:mt-10 md:flex-row md:items-start md:gap-4">
                {/* Cuộn xuống khu "các bé đang có sẵn" ngay bên dưới (PetCatalog) */}
                <a
                  href="#catalog"
                  className="w-full rounded-full bg-brand-deep px-8 py-3 text-center text-base font-semibold text-white transition-transform duration-300 ease-in-out hover:scale-105 md:w-auto md:py-4 md:text-lg"
                >
                  {t("hero.ctaPets")}
                </a>

                <div className="flex w-full flex-col items-center gap-1.5 md:w-auto md:items-start">
                  <Link
                    href="/spa"
                    className="w-full rounded-full border border-brand-deep px-8 py-3 text-center text-base font-semibold transition-all duration-300 ease-in-out hover:bg-brand-deep hover:text-white md:w-auto md:py-4 md:text-lg"
                  >
                    {t("hero.ctaSpa")}
                  </Link>
                  <span className="text-xs text-brand-deep/70 md:text-sm">
                    {t("hero.branches")}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl bg-white/60 px-4 py-2 text-xs font-medium backdrop-blur-sm md:mt-10 md:gap-4 md:px-6 md:py-3 md:text-sm">
                {trustBadges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Cột ảnh */}
          <div className="relative order-2 hidden lg:block">
            <Reveal delay={200}>
              <div className="pointer-events-none absolute -left-10 -top-10 -z-10 h-80 w-80 rounded-full bg-brand-pink opacity-20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-40 w-40 rounded-full bg-brand-mint opacity-15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[3rem]">
                <Image
                  src={HERO_IMAGE}
                  alt={t("hero.imageAlt")}
                  width={600}
                  height={600}
                  priority
                  className="max-h-[500px] w-full rounded-[3rem] object-cover object-top transition-transform duration-700 ease-in-out hover:scale-[1.02]"
                />
                {/* Làm mềm mép ảnh cho hoà vào nền */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[3rem]"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,246,230,1) 0%, transparent 20%, transparent 80%, rgba(255,246,230,0) 100%), linear-gradient(to top, rgba(255,246,230,1) 0%, transparent 30%)",
                  }}
                />
              </div>

              <p className="mt-3 text-center text-sm italic text-brand-deep/40">
                {HERO_CAPTION}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
