"use client";

import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Product } from "@/lib/types";
import PetCard from "@/components/storefront/PetCard";
import { useT } from "@/lib/i18n";

export default function SimilarPets({ product }: { product: Product }) {
  const categorySlug = product.category?.slug || "";
  const t = useT();

  const { data: pool } = useAsync(
    () =>
      categorySlug
        ? api.products.list({ category: categorySlug, published: true })
        : Promise.resolve([]),
    [categorySlug]
  );

  const similar = (pool ?? []).filter((p) => p.id !== product.id).slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24">
      <h2 className="text-xl font-bold text-brand-deep">{t("petDetail.similar")}</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {similar.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </section>
  );
}
