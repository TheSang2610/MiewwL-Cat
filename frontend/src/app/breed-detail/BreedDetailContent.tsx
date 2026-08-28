"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Heart, Sparkles, TriangleAlert } from "lucide-react";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import Gallery from "@/components/storefront/Gallery";
import PetCard from "@/components/storefront/PetCard";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import { Breed, BreedSize } from "@/lib/types";
import { useI18n, formatPrice, MessageKey } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { useContent, useTranslated } from "@/lib/content-i18n";
import UsdHint from "@/components/storefront/UsdHint";

const FALLBACK_IMAGE = "/placeholder.svg";

const SIZE_KEY: Record<BreedSize, MessageKey> = {
  SMALL: "size.SMALL",
  MEDIUM: "size.MEDIUM",
  LARGE: "size.LARGE",
  XLARGE: "size.XLARGE",
};

/** Gợi ý emoji theo từ khoá trong tag; không khớp thì dùng dấu chân mặc định.
 *  Tag do shop tự nhập nên chỉ khớp tiếng Việt — đây là dữ liệu, không dịch. */
const TAG_EMOJI: [RegExp, string][] = [
  [/hiền|ngoan|điềm|trầm|nhẹ nhàng/i, "💞"],
  [/thông minh|dễ (huấn luyện|dạy)/i, "🎓"],
  [/năng động|hoạt bát|vui vẻ|lạc quan/i, "⚡"],
  [/quấn|bám|thân thiện|hòa đồng|ôm ấp/i, "🤗"],
  [/lông/i, "🪶"],
  [/nhỏ|tiny|mini/i, "🤏"],
  [/to|lớn|khổng lồ/i, "🐘"],
  [/sang|quý tộc|kiêu/i, "👑"],
  [/tò mò|khám phá/i, "🔍"],
  [/trung thành/i, "🛡️"],
];

function tagEmoji(tag: string) {
  return TAG_EMOJI.find(([re]) => re.test(tag))?.[1] ?? "🐾";
}

const TRAITS: {
  key: keyof Breed;
  icon: string;
  labelKey: MessageKey;
  lowKey: MessageKey;
  highKey: MessageKey;
}[] = [
  {
    key: "energyLevel",
    icon: "⚡",
    labelKey: "trait.energyLevel",
    lowKey: "trait.energyLevelLow",
    highKey: "trait.energyLevelHigh",
  },
  {
    key: "apartmentFriendly",
    icon: "🏢",
    labelKey: "trait.apartmentFriendly",
    lowKey: "trait.apartmentFriendlyLow",
    highKey: "trait.apartmentFriendlyHigh",
  },
  {
    key: "kidFriendly",
    icon: "👶",
    labelKey: "trait.kidFriendly",
    lowKey: "trait.kidFriendlyLow",
    highKey: "trait.kidFriendlyHigh",
  },
  {
    key: "petFriendly",
    icon: "🐾",
    labelKey: "trait.petFriendly",
    lowKey: "trait.petFriendlyLow",
    highKey: "trait.petFriendlyHigh",
  },
  {
    key: "sheddingLevel",
    icon: "🧹",
    labelKey: "trait.sheddingLevel",
    lowKey: "trait.sheddingLevelLow",
    highKey: "trait.sheddingLevelHigh",
  },
  {
    key: "groomingNeeds",
    icon: "✂️",
    labelKey: "trait.groomingNeeds",
    lowKey: "trait.groomingNeedsLow",
    highKey: "trait.groomingNeedsHigh",
  },
  {
    key: "trainability",
    icon: "🎓",
    labelKey: "trait.trainability",
    lowKey: "trait.trainabilityLow",
    highKey: "trait.trainabilityHigh",
  },
  {
    key: "barkingLevel",
    icon: "🔊",
    labelKey: "trait.barkingLevel",
    lowKey: "trait.barkingLevelLow",
    highKey: "trait.barkingLevelHigh",
  },
];

function BreedDetail() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const { t, locale } = useI18n();
  const c = useContent();
  const tr = useTranslated();

  const {
    data: breed,
    loading,
    error,
    reload,
  } = useAsync(() => {
    if (!slug) throw new Error("missing-slug");
    return api.breeds.get(slug);
  }, [slug]);

  // Các bé đang bán thuộc giống này.
  const { data: matches } = useAsync(
    async () => (breed ? api.products.list({ q: breed.name, published: true }) : []),
    [breed?.name]
  );

  // Giống cùng loài, để gợi ý ở cuối trang.
  const { data: relatedAll } = useAsync(
    async () => (breed ? api.breeds.list({ species: breed.species, published: true }) : []),
    [breed?.species]
  );

  // Gọi trước các nhánh return sớm bên dưới — hook không được gọi có điều kiện.
  useDocumentTitle(breed?.name);

  if (loading) return <LoadingMessage label={t("breedDetail.loading")} />;

  if (error || !breed) {
    const message =
      error === "missing-slug" ? t("breedDetail.missingSlug") : error || t("breedDetail.notFound");
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ErrorMessage message={message} onRetry={reload} />
        <Link href="/" className="text-sm text-brand-deep underline">
          {t("common.backToHome")}
        </Link>
      </div>
    );
  }

  const inStock = (matches ?? []).filter(
    (p) => p.breed?.trim().toLowerCase() === breed.name.trim().toLowerCase()
  );
  const related = (relatedAll ?? []).filter((b) => b.slug !== breed.slug).slice(0, 4);

  const isCat = breed.species === "CAT";
  const speciesLabel = isCat ? t("species.catTitle") : t("species.dogTitle");
  const speciesLower = isCat ? t("species.cat") : t("species.dog");
  const speciesHref = isCat ? "/meo" : "/cho";
  const speciesEmoji = isCat ? "🐈" : "🐕";
  const images = breed.images.length > 0 ? breed.images : [breed.image || FALLBACK_IMAGE];
  const priceRange = `${formatPrice(breed.priceMin, locale)} – ${formatPrice(breed.priceMax, locale)}`;
  const activeTraits = TRAITS.filter((trait) => typeof breed[trait.key] === "number");

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-4 md:pb-12 md:pt-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-brand-deep/40 md:text-sm">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <Link href={speciesHref} className="transition-colors hover:text-brand-deep">
            {speciesLabel}
          </Link>
          <span>›</span>
          <span className="line-clamp-1 font-medium text-brand-deep">{breed.name}</span>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-6 md:mt-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          <Gallery images={images} alt={breed.name} />

          {/* Info */}
          <div className="flex flex-col">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink/30 px-3 py-1 text-xs font-semibold text-brand-deep">
                {speciesEmoji} {speciesLabel}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-brand-deep sm:text-3xl md:text-4xl">
              {breed.name}
            </h1>
            {breed.alias && (
              <p className="mt-1 text-sm font-medium text-brand-deep/55 sm:text-base md:text-lg">
                {tr(breed.alias, breed.aliasEn)}
              </p>
            )}
            <p className="mt-3 text-xl font-bold text-brand-gold sm:text-2xl">
              {priceRange}
              <UsdHint amount={breed.priceMin} to={breed.priceMax} className="text-base" />
            </p>

            <div className="mt-4 flex flex-wrap gap-4 rounded-2xl bg-white/60 px-4 py-3 backdrop-blur-sm">
              <div className="min-w-[100px] flex-1">
                <p className="text-[10px] uppercase tracking-widest text-brand-deep/40">
                  {t("breedDetail.size")}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-brand-deep">
                  {t(SIZE_KEY[breed.size])}
                </p>
              </div>
              {breed.weightRange && (
                <div className="min-w-[100px] flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-brand-deep/40">
                    {t("breedDetail.weight")}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-brand-deep">{breed.weightRange}</p>
                </div>
              )}
            </div>

            {breed.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {breed.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-mint/20 px-2.5 py-1 text-[11px] font-medium text-brand-deep/85"
                  >
                    <span>{tagEmoji(tag)}</span>
                    <span>{c(tag)}</span>
                  </span>
                ))}
              </div>
            )}

            {breed.warning && (
              <div className="mt-4 flex gap-2.5 rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p className="leading-relaxed">
                  <strong className="font-semibold">{t("breedDetail.warningPrefix")}</strong>
                  {c(breed.warning)}
                </p>
              </div>
            )}

            <div className="mt-auto hidden pt-6 lg:block">
              <a
                href="tel:0384589559"
                className="block w-full rounded-full bg-brand-deep py-3.5 text-center text-base font-semibold text-white transition-all hover:scale-[1.02] hover:bg-brand-deep/90"
              >
                {t("breedDetail.deposit")}
              </a>
            </div>
          </div>
        </div>

        {breed.description && (
          <section className="mt-10 md:mt-14">
            <div className="rounded-2xl bg-white p-5 shadow-sm md:p-8">
              <p className="text-sm leading-relaxed text-brand-deep/75 md:text-base md:leading-[1.8]">
                {tr(breed.description, breed.descriptionEn)}
              </p>
            </div>
          </section>
        )}

        {(breed.suitability || breed.careNotes) && (
          <section className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
            {breed.suitability && (
              <div className="rounded-2xl bg-gradient-to-br from-brand-pink/15 to-white p-5 shadow-sm md:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-pink/30 px-3 py-1">
                  <Heart className="h-3.5 w-3.5 text-brand-deep" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-deep">
                    {t("breedDetail.suitableFor")}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-brand-deep/80 md:text-[15px]">
                  {tr(breed.suitability, breed.suitabilityEn)}
                </p>
              </div>
            )}
            {breed.careNotes && (
              <div className="rounded-2xl bg-gradient-to-br from-brand-mint/15 to-white p-5 shadow-sm md:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-mint/30 px-3 py-1">
                  <Sparkles className="h-3.5 w-3.5 text-brand-deep" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-deep">
                    {t("breedDetail.careNotes")}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-brand-deep/80 md:text-[15px]">
                  {tr(breed.careNotes, breed.careNotesEn)}
                </p>
              </div>
            )}
          </section>
        )}

        {activeTraits.length > 0 && (
          <section className="mt-6 md:mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-deep/50 md:text-sm">
              {t("breedDetail.traits")}
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2 md:p-6">
              {activeTraits.map((trait) => {
                const score = breed[trait.key] as number;
                return (
                  <div key={trait.labelKey} className="min-w-0">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-brand-deep">
                        <span>{trait.icon}</span>
                        <span className="truncate">{t(trait.labelKey)}</span>
                      </span>
                      <span className="flex-shrink-0 text-xs font-semibold text-brand-deep/50">{score}/5</span>
                    </div>
                    <div className="flex gap-1" role="img" aria-label={`${score}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < score ? "bg-brand-pink" : "bg-brand-deep/10"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-1 flex justify-between gap-2 text-[10px] text-brand-deep/40">
                      <span className="truncate">{t(trait.lowKey)}</span>
                      <span className="truncate text-right">{t(trait.highKey)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Các bé đang có sẵn */}
        <section className="mt-12 md:mt-16">
          <div className="mb-4 flex items-end justify-between gap-3 md:mb-6">
            <h2 className="text-xl font-bold text-brand-deep md:text-2xl">
              {t("breedDetail.availableTitle", { breed: breed.name })}
            </h2>
          </div>

          {inStock.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {inStock.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
              <p className="mb-3 text-5xl">{speciesEmoji}</p>
              <p className="mb-1 text-base font-semibold text-brand-deep md:text-lg">
                {t("breedDetail.noneTitle")}
              </p>
              <p className="mb-6 text-sm leading-relaxed text-brand-deep/60">
                {t("breedDetail.noneDesc")}
              </p>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
                <a
                  href="tel:0384589559"
                  className="inline-flex w-full justify-center rounded-full bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90 sm:w-auto"
                >
                  {t("breedDetail.deposit")}
                </a>
                <Link
                  href={speciesHref}
                  className="inline-flex w-full justify-center rounded-full border border-brand-deep/20 px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:border-brand-deep hover:bg-brand-deep hover:text-white sm:w-auto"
                >
                  {t("breedDetail.otherBreeds", { species: speciesLower })}
                </Link>
              </div>
            </div>
          )}
        </section>

        {breed.careGuide.length > 0 && (
          <section className="mt-12 border-t border-brand-deep/10 pt-10 md:mt-16">
            <h2 className="mb-6 text-xl font-bold text-brand-deep md:text-2xl">
              {t("breedDetail.careGuide", { breed: breed.name })}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {breed.careGuide.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-relaxed text-brand-deep/80 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                  <span>{c(tip)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 md:mt-16">
            <h2 className="text-xl font-bold text-brand-deep md:text-2xl">
              {t("breedDetail.related", { species: speciesLower })}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {related.map((b) => (
                <Link key={b.id} href={`/breed-detail?slug=${b.slug}`}>
                  <article className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-2xl">
                      <Image
                        src={b.image || FALLBACK_IMAGE}
                        alt={b.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-2 md:p-3">
                      <h3 className="truncate text-sm font-bold text-brand-deep md:text-base">{b.name}</h3>
                      <p className="truncate text-[10px] text-brand-deep/60 md:text-xs">
                        {tr(b.alias, b.aliasEn) ||
                          (b.species === "CAT"
                            ? t("breedDetail.purebredCat")
                            : t("breedDetail.purebredDog"))}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-deep/10 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-lg backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-brand-deep/40">
              {breed.name}
            </p>
            <p className="truncate text-sm font-bold text-brand-gold">
              {priceRange}
              <UsdHint amount={breed.priceMin} to={breed.priceMax} className="text-[11px]" />
            </p>
          </div>
          <a
            href="tel:0384589559"
            className="flex-shrink-0 rounded-full bg-brand-deep px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-deep/90"
          >
            {t("breedDetail.depositShort")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BreedDetailContent() {
  return (
    <Suspense>
      <BreedDetail />
    </Suspense>
  );
}
