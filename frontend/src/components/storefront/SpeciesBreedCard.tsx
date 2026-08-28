"use client";

import Image from "next/image";
import Link from "next/link";
import { Breed, BreedSize } from "@/lib/types";
import { useI18n, formatPrice, MessageKey } from "@/lib/i18n";
import { useContent, useTranslated } from "@/lib/content-i18n";
import UsdHint from "./UsdHint";
import AvailabilityBadge from "./AvailabilityBadge";

const SIZE_KEYS: Record<BreedSize, MessageKey> = {
  SMALL: "size.SMALL",
  MEDIUM: "size.MEDIUM",
  LARGE: "size.LARGE",
  XLARGE: "size.XLARGE",
};

const FALLBACK_IMAGE = "/placeholder.svg";

export default function SpeciesBreedCard({ breed }: { breed: Breed }) {
  const { t, locale } = useI18n();
  const c = useContent();
  const tr = useTranslated();

  return (
    <Link href={`/breed-detail?slug=${breed.slug}`} className="flex h-full">
      <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-brand-deep/5 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-3/4 shrink-0 overflow-hidden bg-brand-cream">
          <Image
            src={breed.image || FALLBACK_IMAGE}
            alt={breed.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 rounded-full border border-brand-gold/20 bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-brand-gold backdrop-blur-sm">
            {t(SIZE_KEYS[breed.size])}
          </div>
          <AvailabilityBadge count={breed.availableCount} />
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <div>
            <h3 className="text-base font-bold text-brand-deep">{breed.name}</h3>
            {breed.alias && (
              <p className="mt-0.5 text-[11px] leading-tight text-brand-deep/50">{tr(breed.alias, breed.aliasEn)}</p>
            )}
            {breed.weightRange && (
              <p className="mt-0.5 text-xs text-brand-deep/40">{breed.weightRange}</p>
            )}
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-brand-deep/60">
            {tr(breed.description, breed.descriptionEn)}
          </p>

          {breed.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {breed.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-md border border-brand-gold/20 bg-brand-cream px-2 py-0.5 text-[10px] font-medium text-brand-gold"
                >
                  {c(tag)}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-2 border-t border-brand-deep/5 pt-2.5">
            <span className="text-sm font-bold tabular-nums text-brand-deep">
              {formatPrice(breed.priceMin, locale)} – {formatPrice(breed.priceMax, locale)}
              <UsdHint
                amount={breed.priceMin}
                to={breed.priceMax}
                block
                className="text-[11px]"
              />
            </span>
            <span className="inline-flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-brand-deep px-3.5 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-brand-deep/90">
              {t("breedCatalog.cta")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
