"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, House } from "lucide-react";
import { Product } from "@/lib/types";
import Gallery from "@/components/storefront/Gallery";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { useContent, useTranslated } from "@/lib/content-i18n";
import UsdHint from "@/components/storefront/UsdHint";
import { WARRANTY_TIERS } from "./warranty-tiers";
import SimilarPets from "./SimilarPets";
import WarrantyFaq from "./WarrantyFaq";

/** Thú cưng là hàng theo con, khách xem trực tiếp trước khi cọc — không qua giỏ hàng. */
const INQUIRY_PHONE = "tel:0384589559";

export default function PetDetailView({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const c = useContent();
  const tr = useTranslated();
  const [selectedTierKey, setSelectedTierKey] = useState(
    WARRANTY_TIERS.find((tier) => tier.recommended)?.key ?? WARRANTY_TIERS[0].key
  );

  useDocumentTitle(c(product.name));

  const available = product.stock > 0;
  const isCat = product.category?.slug === "meo";
  const speciesLabel = isCat ? t("species.catTitle") : t("species.dogTitle");
  const speciesHref = isCat ? "/meo" : "/cho";
  const genderLabel =
    product.gender === "MALE"
      ? t("gender.male")
      : product.gender === "FEMALE"
        ? t("gender.female")
        : null;
  const name = tr(product.name, product.nameEn);
  const subtitle = [product.breed, genderLabel, c(product.age)]
    .filter(Boolean)
    .join(" · ");
  const selectedTier =
    WARRANTY_TIERS.find((tier) => tier.key === selectedTierKey) ?? WARRANTY_TIERS[0];
  const tierTotal = product.price + selectedTier.extraPrice;

  const aboutFacts = [
    { label: t("petDetail.birthDate"), value: product.birthDate },
    { label: t("petDetail.weight"), value: product.weight },
    { label: t("petDetail.color"), value: c(product.color) },
    { label: t("petDetail.breed"), value: product.breed },
  ].filter((f) => f.value);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-32 pt-4 font-montserrat text-brand-deep md:pb-6 md:pt-6">
      <nav className="flex items-center gap-1.5 text-sm text-brand-deep/40">
        <Link href="/" className="transition-colors hover:text-brand-deep">
          {t("common.home")}
        </Link>
        <span>›</span>
        <Link href={speciesHref} className="transition-colors hover:text-brand-deep">
          {speciesLabel}
        </Link>
        <span>›</span>
        <span className="font-medium text-brand-deep">{name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Gallery images={product.images} alt={name} />

        {/* Info */}
        <div className="flex flex-col">
          <span
            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide shadow-sm ${
              available
                ? "border-blue-200 bg-blue-50/90 text-blue-700"
                : "border-brand-deep/10 bg-brand-deep/5 text-brand-deep/40"
            }`}
          >
            <span
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${available ? "bg-blue-500" : "bg-brand-deep/30"}`}
            />
            {available ? t("card.available") : t("card.taken")}
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-brand-deep md:text-4xl">{name}</h1>
          {subtitle && <p className="mt-1 text-base text-brand-deep/50">{subtitle}</p>}

          {product.description && (
            <p className="mt-4 line-clamp-3 text-base italic leading-relaxed text-brand-deep/70">
              {tr(product.description, product.descriptionEn)}
            </p>
          )}

          <div className="mt-5">
            <p className="text-3xl font-extrabold text-brand-deep">
              {formatPrice(product.price, locale)}
              <UsdHint amount={product.price} className="text-lg" />
            </p>
            <p className="mt-1 text-xs text-brand-deep/40">
              {product.vaccineDoses
                ? t("petDetail.includedVaccine", { count: product.vaccineDoses })
                : t("petDetail.includedBasic")}
            </p>
          </div>

          {available ? (
            <div className="mt-5 space-y-2">
              <a
                href={INQUIRY_PHONE}
                className="block w-full rounded-full bg-brand-deep py-3.5 text-center text-base font-medium text-white transition-all hover:bg-brand-deep/90"
              >
                {t("petDetail.interested", { name })}
              </a>
              <a
                href={INQUIRY_PHONE}
                className="block w-full rounded-full border border-brand-deep/20 py-3 text-center text-base font-medium text-brand-deep transition-all hover:bg-brand-deep/5"
              >
                {t("petDetail.bookVisit")}
              </a>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-brand-deep/5 px-4 py-3.5 text-center text-sm text-brand-deep/50">
              {t("petDetail.alreadyAdopted")}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {product.warranty && (
              <span className="flex items-center gap-1.5 text-xs text-brand-deep/50">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                {t("petDetail.warranty30")}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-brand-deep/50">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              {t("petDetail.purebredForLife")}
            </span>
            {!!product.vaccineDoses && (
              <span className="flex items-center gap-1.5 text-xs text-brand-deep/50">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                {t("petDetail.freeVaccine", { count: product.vaccineDoses })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      {(product.tags.length > 0 || product.suitability || aboutFacts.length > 0) && (
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl font-bold text-brand-deep">
            {t("petDetail.about", { name })}
          </h2>
          <div className="mt-6 grid gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-[55%_45%] md:p-8">
            <div>
              {product.tags.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-brand-deep">
                    {t("petDetail.personality")}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-pink/10 px-4 py-1.5 text-sm font-medium text-brand-deep"
                      >
                        {c(tag)}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {product.suitability && (
                <div className="mt-6 md:mt-8">
                  <div className="flex items-center gap-2 text-base font-semibold text-brand-deep">
                    <House className="h-[18px] w-[18px]" />
                    <h4>{t("petDetail.suitableFor")}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-brand-deep/60">
                    {tr(product.suitability, product.suitabilityEn)}
                  </p>
                </div>
              )}
            </div>

            {aboutFacts.length > 0 && (
              <div className="border-t border-brand-deep/5 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {aboutFacts.map((f) => (
                    <div key={f.label}>
                      <p className="text-[10px] uppercase tracking-wide text-brand-deep/40">{f.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-brand-deep">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Warranty upgrade — informational, finalized by phone consultation */}
      {product.warranty && (
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl font-bold text-brand-deep">
            {t("petDetail.warrantyTitle", { name })}
          </h2>
          <p className="mt-2 text-sm text-brand-deep/50">{t("petDetail.warrantyDesc")}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {WARRANTY_TIERS.map((tier) => {
              const selected = tier.key === selectedTierKey;
              return (
                <button
                  key={tier.key}
                  type="button"
                  onClick={() => setSelectedTierKey(tier.key)}
                  className={`group relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    selected
                      ? "z-10 scale-[1.02] border-brand-gold bg-white shadow-xl"
                      : "border-brand-deep/10 bg-white/50 hover:border-brand-deep/25"
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                      {t("petDetail.mostChosen")}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                        selected ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-deep/5 text-brand-deep/50"
                      }`}
                    >
                      {t(tier.badgeKey)}
                    </span>
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${selected ? "border-brand-gold bg-brand-gold" : "border-brand-deep/20"}`}
                    />
                  </div>
                  <h3 className={`mt-4 text-lg font-bold ${selected ? "text-brand-gold" : "text-brand-deep"}`}>
                    {t(tier.nameKey)}
                  </h3>
                  {tier.extraPrice > 0 && (
                    <p className="text-sm font-bold text-brand-gold">
                      +{formatPrice(tier.extraPrice, locale)}
                      <UsdHint amount={tier.extraPrice} className="text-xs" />
                    </p>
                  )}
                  <p className="text-sm font-semibold text-brand-deep/50">{t(tier.durationKey)}</p>
                  <p className="mt-1 text-sm font-medium text-brand-deep">{t(tier.coverageKey)}</p>
                  <ul className="mt-4 space-y-2 text-xs text-brand-deep/60">
                    {tier.perkKeys.map((perkKey) => (
                      <li key={perkKey} className="flex items-start gap-1.5">
                        <Check
                          className={`mt-0.5 h-3 w-3 shrink-0 ${selected ? "text-brand-gold" : ""}`}
                        />
                        <span>{t(perkKey)}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-brand-deep/5 pt-8 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-brand-deep/50">
                {t("petDetail.tierTotal", { name })}
              </p>
              <p className="text-3xl font-extrabold text-brand-deep">
                {formatPrice(tierTotal, locale)}
                <UsdHint amount={tierTotal} className="text-lg" />
              </p>
            </div>
            <a
              href={INQUIRY_PHONE}
              className="w-full rounded-full bg-brand-deep px-10 py-4 text-center text-lg font-bold text-white shadow-xl shadow-brand-deep/20 transition-all hover:scale-105 md:w-auto"
            >
              {t("petDetail.tierCta", { tier: t(selectedTier.nameKey) })}
            </a>
          </div>
        </section>
      )}

      <SimilarPets product={product} />
      <WarrantyFaq />

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-deep/10 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-lg backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-brand-deep/40">
              {name}
            </p>
            <p className="truncate text-sm font-bold text-brand-gold">
              {formatPrice(product.price, locale)}
              <UsdHint amount={product.price} className="text-[11px]" />
            </p>
          </div>
          {available ? (
            <a
              href={INQUIRY_PHONE}
              className="shrink-0 rounded-full bg-brand-deep px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-deep/90"
            >
              {t("petDetail.interestedShort")}
            </a>
          ) : (
            <span className="shrink-0 rounded-full bg-brand-deep/10 px-5 py-3 text-sm font-semibold text-brand-deep/40">
              {t("card.taken")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
