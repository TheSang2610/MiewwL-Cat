"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, CheckCircle2, Images } from "lucide-react";
import { Product } from "@/lib/types";
import { useFavoritesStore } from "@/store/favorites-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useContent, useTranslated } from "@/lib/content-i18n";
import UsdHint from "./UsdHint";

const FALLBACK_IMAGE = "/placeholder.svg";

export default function PetCard({
  pet,
  priority = false,
}: {
  pet: Product;
  priority?: boolean;
}) {
  const mounted = useHasMounted();
  const { t, locale } = useI18n();
  const c = useContent();
  const tr = useTranslated();
  const favorites = useFavoritesStore((s) => s.ids);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  // Favorites are persisted to localStorage, invisible to SSR — reading them
  // before hydration would render a filled/unfilled heart that flips right
  // after mount and mismatches React.
  const isFavorite = mounted && favorites.includes(pet.id);

  const href = `/product-detail?id=${pet.id}`;
  const available = pet.stock > 0;
  const genderLabel =
    pet.gender === "MALE" ? t("gender.male") : pet.gender === "FEMALE" ? t("gender.female") : null;
  const name = tr(pet.name, pet.nameEn);
  const subtitle = [pet.breed, c(pet.age)].filter(Boolean).join(" · ");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative block aspect-3/4 overflow-hidden">
        <Link href={href} className="absolute inset-0">
          <Image
            src={pet.images[0] || FALLBACK_IMAGE}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Trạng thái còn hàng */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-brand-deep shadow-sm backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              {available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  available ? "bg-blue-500" : "bg-zinc-400"
                }`}
              />
            </span>
            {available ? t("card.available") : t("card.taken")}
          </span>
        </div>

        {/* Số ảnh bé đang có — cho khách biết bấm vào còn xem được thêm. */}
        {pet.images.length > 1 && (
          <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Images className="h-3 w-3" />
            {pet.images.length}
          </div>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(pet.id)}
          aria-label={
            isFavorite
              ? t("card.favoriteRemove", { name })
              : t("card.favoriteAdd", { name })
          }
          aria-pressed={isFavorite}
          className={`absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white ${
            isFavorite ? "text-pink-500" : "text-brand-deep/40 hover:text-pink-500"
          }`}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-3 md:p-4">
        <div className="flex items-center justify-between gap-2">
          <Link href={href} className="min-w-0 hover:underline">
            <h3 className="truncate text-sm font-bold text-brand-deep sm:text-base">
              {name}
            </h3>
          </Link>
          {pet.gender && (
            <span
              title={genderLabel ?? undefined}
              className={`shrink-0 text-lg font-bold ${
                pet.gender === "MALE" ? "text-blue-500" : "text-pink-500"
              }`}
            >
              {pet.gender === "MALE" ? "♂" : "♀"}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="-mt-0.5 truncate text-xs text-brand-deep/60 sm:text-sm">{subtitle}</p>
        )}

        {pet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pet.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md border border-brand-gold/20 bg-brand-cream px-2 py-0.5 text-[10px] font-medium text-brand-gold sm:text-xs"
              >
                {c(tag)}
              </span>
            ))}
          </div>
        )}

        {(pet.vaccineDoses || pet.warranty) && (
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-brand-deep/50 sm:text-[11px]">
            {!!pet.vaccineDoses && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {t("card.vaccinated", { count: pet.vaccineDoses })}
              </span>
            )}
            {pet.warranty && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                {t("card.warranty")}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto border-t border-brand-deep/5" />

        <div className="flex flex-col gap-1 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-extrabold text-brand-deep sm:text-base">
            {formatPrice(pet.price, locale)}
            <UsdHint amount={pet.price} block className="text-[11px]" />
          </span>
          <Link
            href={href}
            className="flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-brand-gold transition-colors hover:text-brand-deep sm:text-sm"
          >
            {t("card.viewPet")}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
