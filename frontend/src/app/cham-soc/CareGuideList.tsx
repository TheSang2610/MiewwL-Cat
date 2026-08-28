"use client";

import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Breed, BreedSize, Species } from "@/lib/types";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import { useT, Translate, MessageKey } from "@/lib/i18n";
import { useTranslated } from "@/lib/content-i18n";

const SIZE_KEYS: Record<BreedSize, MessageKey> = {
  SMALL: "size.SMALL",
  MEDIUM: "size.MEDIUM",
  LARGE: "size.LARGE",
  XLARGE: "size.XLARGE",
};

const FALLBACK_IMAGE = "/placeholder.svg";

function BreedCareCard({ breed, t }: { breed: Breed; t: Translate }) {
  const tr = useTranslated();

  return (
    <Link
      href={`/breed-detail?slug=${breed.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <Image
          src={breed.image || FALLBACK_IMAGE}
          alt={t("care.cardAlt", { breed: breed.name })}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold group-hover:text-brand-gold">{breed.name}</h3>
        {breed.alias && <p className="text-xs text-brand-deep/50">{tr(breed.alias, breed.aliasEn)}</p>}
        <p className="mt-2 text-xs text-brand-deep/60">📏 {t(SIZE_KEYS[breed.size])}</p>
        {breed.availableCount > 0 && (
          <p className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            {t("care.availableCount", { count: breed.availableCount })}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function CareGuideList() {
  const t = useT();
  const {
    data: breeds,
    loading,
    error,
    reload,
  } = useAsync(() => api.breeds.list({ published: true }), []);

  const groups: { species: Species; label: string }[] = [
    { species: "DOG", label: t("care.dogsGroup") },
    { species: "CAT", label: t("care.catsGroup") },
  ];

  if (loading) return <LoadingMessage label={t("care.loading")} />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <>
      {groups.map(({ species, label }) => {
        const list = (breeds ?? []).filter((b) => b.species === species);
        if (list.length === 0) return null;

        return (
          <section key={species} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">{label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((breed) => (
                <BreedCareCard key={breed.id} breed={breed} t={t} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
