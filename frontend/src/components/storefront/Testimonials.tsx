"use client";

import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { useI18n } from "@/lib/i18n";

/**
 * Khu vực đánh giá của khách.
 *
 * Tự ẩn khi `TESTIMONIALS` còn trống — thà không có mục này còn hơn hiện đánh
 * giá bịa. Xem hướng dẫn thêm đánh giá thật trong `src/data/testimonials.ts`.
 */
export default function Testimonials() {
  const { t, locale } = useI18n();

  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="mx-auto mb-20 max-w-6xl px-4">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-brand-deep md:text-2xl">
          {t("testimonials.title")}
        </h2>
        <p className="mt-1 text-sm text-brand-deep/40">{t("testimonials.desc")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((item, i) => {
          const quote = locale === "en" && item.quoteEn ? item.quoteEn : item.quote;
          return (
            <figure key={i} className="rounded-2xl border border-brand-deep/5 bg-white p-5">
              <div
                className="mb-3 flex items-center gap-1"
                role="img"
                aria-label={t("testimonials.rating", { count: item.rating })}
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < item.rating ? "fill-amber-400 text-amber-400" : "text-brand-deep/15"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mb-3 text-sm leading-relaxed text-brand-deep/70">
                “{quote}”
              </blockquote>
              <figcaption>
                <p className="text-sm font-bold text-brand-deep">{item.name}</p>
                {(item.breed || item.petName) && (
                  <p className="text-xs text-brand-gold">
                    {[item.breed, item.petName].filter(Boolean).join(" — ")}
                  </p>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
