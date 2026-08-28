"use client";

import Link from "next/link";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Species } from "@/lib/types";
import SpeciesBreedCard from "./SpeciesBreedCard";
import PetCard from "./PetCard";
import Testimonials from "./Testimonials";
import { LoadingMessage, ErrorMessage } from "./StateMessage";
import { useI18n, formatNumber } from "@/lib/i18n";
import { PETS_REHOMED, yearsInBusiness } from "@/lib/shop-stats";

const CATEGORY_SLUG: Record<Species, string> = {
  CAT: "meo",
  DOG: "cho",
};

export default function SpeciesLanding({ species }: { species: Species }) {
  const { t, locale } = useI18n();

  const label = species === "CAT" ? t("species.cat") : t("species.dog");
  const noun = species === "CAT" ? t("species.catBreeds") : t("species.dogBreeds");

  const trustItems = [
    { icon: "🛡️", label: t("speciesLanding.trust1") },
    { icon: "🏆", label: t("speciesLanding.trust2") },
    { icon: "💉", label: t("speciesLanding.trust3") },
    { icon: "🚚", label: t("speciesLanding.trust4") },
  ];

  const {
    data: breeds,
    loading,
    error,
    reload,
  } = useAsync(() => api.breeds.list({ species, published: true }), [species]);

  const {
    data: availablePets,
    loading: petsLoading,
    error: petsError,
    reload: reloadPets,
  } = useAsync(
    () => api.products.list({ category: CATEGORY_SLUG[species], published: true }),
    [species]
  );

  const inStockPets = (availablePets ?? []).filter((p) => p.stock > 0).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <section className="px-4 pb-6 pt-20 text-center md:pb-8 md:pt-24">
        <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <span className="font-medium text-brand-deep">
            {t("speciesLanding.breadcrumb", { species: label })}
          </span>
        </nav>
        <h1 className="mb-3 text-3xl font-extrabold text-brand-deep md:text-4xl lg:text-5xl">
          {t("speciesLanding.title", { species: label })}
        </h1>
        <p className="mx-auto max-w-xl text-base text-brand-deep/50 md:text-lg">
          {t("speciesLanding.subtitleBefore")}{" "}
          <span className="font-bold text-brand-gold">
            {breeds?.length ?? 0} {noun}
          </span>{" "}
          {t("speciesLanding.subtitleAfter")}
        </p>
      </section>

      <section className="mx-auto mb-4 max-w-6xl px-4">
        <div className="rounded-2xl border border-brand-pink/40 bg-white/70 p-5 backdrop-blur-sm md:p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-brand-deep">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-pink/40 text-lg">
                  {item.icon}
                </span>
                <span className="text-sm font-medium leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {(petsLoading || petsError || inStockPets.length > 0) && (
        <section className="mx-auto mb-16 max-w-6xl px-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-brand-deep md:text-2xl">
              {t("speciesLanding.availableTitle")}
            </h2>
            <p className="mt-1 text-sm text-brand-deep/40">
              {t("speciesLanding.availableDesc")}
            </p>
          </div>

          {petsLoading ? (
            <LoadingMessage label={t("speciesLanding.loadingPets")} />
          ) : petsError ? (
            <ErrorMessage message={petsError} onRetry={reloadPets} />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {inStockPets.map((pet, index) => (
                <PetCard key={pet.id} pet={pet} priority={index === 0} />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mx-auto mb-16 max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-deep md:text-2xl">
            {t("speciesLanding.breedsTitle", { breeds: noun })}
          </h2>
          <p className="mt-1 text-sm text-brand-deep/40">
            {t("speciesLanding.breedsDesc")}
          </p>
        </div>

        {loading ? (
          <LoadingMessage label={t("breedCatalog.loading")} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={reload} />
        ) : breeds && breeds.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {breeds.map((breed) => (
              <SpeciesBreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-brand-deep/50">
            {t("speciesLanding.noBreeds", { species: label })}
          </p>
        )}
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-brand-pink/30 bg-gradient-to-br from-brand-pink/40 via-white to-brand-mint/20 p-8 md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-pink/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-mint/20 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-3 text-2xl font-extrabold text-brand-deep md:text-3xl">
                {t("speciesLanding.notFoundTitle")}
              </h2>
              <p className="mb-2 max-w-lg text-brand-deep/60">
                {t("speciesLanding.notFoundDesc", { species: label })}{" "}
                <span className="font-bold text-brand-deep">
                  {t("speciesLanding.notFoundDays")}
                </span>
                .
              </p>
              <p className="mb-6 text-sm text-brand-deep/40">
                {t("speciesLanding.notFoundNote")}
              </p>
              <a
                href="tel:0384589559"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-deep px-7 py-3.5 text-base font-bold text-white transition-all hover:bg-brand-deep/90 hover:shadow-lg"
              >
                {t("speciesLanding.notFoundCta")}
              </a>
            </div>

            <div className="flex gap-6 text-center md:flex-col md:gap-4">
              <div>
                <div className="text-3xl font-extrabold text-brand-gold">
                  {formatNumber(PETS_REHOMED, locale)}+
                </div>
                <div className="text-xs font-medium text-brand-deep/40">
                  {t("speciesLanding.stat1Label")}
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-brand-gold">{yearsInBusiness()}+</div>
                <div className="text-xs font-medium text-brand-deep/40">
                  {t("speciesLanding.stat2Label")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
}
