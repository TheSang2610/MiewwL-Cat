"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import PetCard from "./PetCard";
import { LoadingMessage, ErrorMessage } from "./StateMessage";
import { useProductStore } from "@/store/product-store";
import { useT } from "@/lib/i18n";

/** Chỉ hai danh mục này là "các bé"; phụ kiện và spa không lên khu vực này. */
const PET_CATEGORIES = ["cho", "meo"];

export default function PetCatalog() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [filter, setFilter] = useState("");
  const t = useT();

  const filters = [
    { value: "", label: t("petCatalog.all") },
    { value: "cho", label: t("nav.dogs") },
    { value: "meo", label: t("nav.cats") },
  ];

  useEffect(() => {
    fetchProducts({ published: true });
  }, [fetchProducts]);

  const pets = useMemo(() => {
    const onlyPets = products.filter((p) =>
      PET_CATEGORIES.includes(p.category?.slug ?? "")
    );
    return filter
      ? onlyPets.filter((p) => p.category?.slug === filter)
      : onlyPets;
  }, [products, filter]);

  return (
    <section id="catalog" className="scroll-mt-20 bg-white/85 py-10 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
            {t("petCatalog.title")}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-3 mt-2 max-w-2xl text-sm text-brand-deep/70 md:mb-0 md:mt-4 md:text-base">
            <span>{pets.length}</span> {t("petCatalog.count")}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-4 inline-flex w-fit flex-wrap gap-3 md:mt-8">
            {filters.map((item) => (
              <button
                key={item.value || "all"}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
                  filter === item.value
                    ? "bg-brand-deep text-white"
                    : "bg-gray-100 text-brand-deep hover:bg-gray-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <LoadingMessage label={t("petCatalog.loading")} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => fetchProducts({ published: true })} />
        ) : pets.length === 0 ? (
          <p className="py-16 text-center text-sm text-brand-deep/60">
            {t("petCatalog.empty")}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {pets.map((pet, index) => (
              // Đổi filter thì key đổi theo để hiệu ứng reveal chạy lại.
              <Reveal key={`${filter}-${pet.id}`} delay={index * 60}>
                <PetCard pet={pet} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={300}>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cho"
              className="inline-flex justify-center rounded-full border border-brand-deep px-8 py-3 font-semibold text-brand-deep transition-all duration-300 ease-in-out hover:bg-brand-deep hover:text-white"
            >
              {t("petCatalog.allDogs")}
            </Link>
            <Link
              href="/meo"
              className="inline-flex justify-center rounded-full border border-brand-deep px-8 py-3 font-semibold text-brand-deep transition-all duration-300 ease-in-out hover:bg-brand-deep hover:text-white"
            >
              {t("petCatalog.allCats")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
