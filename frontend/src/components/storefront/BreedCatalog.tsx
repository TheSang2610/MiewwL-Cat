"use client";

import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Breed, Species } from "@/lib/types";
import Reveal from "./Reveal";
import { LoadingMessage, ErrorMessage } from "./StateMessage";
import { useI18n, formatPrice, Locale, Translate } from "@/lib/i18n";
import { useContent, useTranslated } from "@/lib/content-i18n";
import UsdHint from "./UsdHint";

const FALLBACK_IMAGE = "/placeholder.svg";

function priceRange(breed: Breed, locale: Locale) {
  return `${formatPrice(breed.priceMin, locale)} – ${formatPrice(breed.priceMax, locale)}`;
}

function BreedCard({
  breed,
  delay,
  t,
  locale,
}: {
  breed: Breed;
  delay: number;
  t: Translate;
  locale: Locale;
}) {
  const c = useContent();
  const tr = useTranslated();
  const href = `/breed-detail?slug=${breed.slug}`;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg">
        <Link href={href} className="flex flex-1 flex-col">
          <div className="relative aspect-3/4 overflow-hidden">
            <Image
              src={breed.image || FALLBACK_IMAGE}
              alt={breed.name}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {breed.availableCount > 0 && (
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 shadow-sm backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-semibold text-brand-deep">
                  {t("breedCatalog.available", { count: breed.availableCount })}
                </span>
              </div>
            )}
          </div>

          <div className="p-3 pb-2 md:p-4 md:pb-2">
            <h3 className="text-sm font-bold text-brand-deep md:text-base">{breed.name}</h3>
            {breed.alias && (
              <p className="text-[11px] leading-tight text-brand-deep/50">{tr(breed.alias, breed.aliasEn)}</p>
            )}
            <p className="mt-1 line-clamp-2 text-[11px] text-brand-deep/60 md:text-xs">
              {tr(breed.description, breed.descriptionEn)}
            </p>
            <p className="mt-2 text-sm font-bold text-brand-gold">
              {priceRange(breed, locale)}
              <UsdHint
                amount={breed.priceMin}
                to={breed.priceMax}
                block
                className="text-[11px]"
              />
            </p>

            {breed.tags.length > 0 && (
              <div className="mb-1 mt-2 flex flex-wrap gap-1">
                {breed.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-pink/30 px-2 py-0.5 text-[10px] font-medium text-brand-deep"
                  >
                    {c(tag)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>

        <div className="mt-auto px-3 pb-3 md:px-4 md:pb-4">
          <Link
            href={href}
            className="block w-full rounded-full bg-brand-deep py-2 text-center text-xs font-semibold text-white transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {t("breedCatalog.cta")}
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export default function BreedCatalog() {
  const { t, locale } = useI18n();

  const {
    data: breeds,
    loading,
    error,
    reload,
  } = useAsync(() => api.breeds.list({ published: true }), []);

  const groups: { species: Species; label: string }[] = [
    { species: "DOG", label: t("breedCatalog.dogs") },
    { species: "CAT", label: t("breedCatalog.cats") },
  ];

  return (
    <section className="py-10 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
            {t("breedCatalog.title")}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-8 mt-2 max-w-2xl text-sm text-brand-deep/70 md:mb-12 md:text-base">
            {t("breedCatalog.desc")}
          </p>
        </Reveal>

        {loading ? (
          <LoadingMessage label={t("breedCatalog.loading")} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={reload} />
        ) : (
          groups.map(({ species, label }) => {
            const list = (breeds ?? []).filter((b) => b.species === species);
            if (list.length === 0) return null;

            return (
              <div key={species} className="mb-12 last:mb-0">
                <Reveal>
                  <h3 className="mb-4 text-base font-semibold text-brand-deep md:text-lg">
                    {label}
                  </h3>
                </Reveal>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                  {list.map((breed, index) => (
                    <BreedCard
                      key={breed.id}
                      breed={breed}
                      delay={index * 60}
                      t={t}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
