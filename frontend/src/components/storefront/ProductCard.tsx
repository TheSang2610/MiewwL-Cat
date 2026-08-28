"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useTranslated } from "@/lib/content-i18n";
import UsdHint from "./UsdHint";

const FALLBACK_IMAGE = "/placeholder.svg";

/**
 * Card cho phụ kiện & sản phẩm chung. Dùng chung ngôn ngữ thị giác với
 * PetCard (nền trắng bo 2xl, badge tồn kho, giá đậm + link vàng) để các
 * lưới sản phẩm trên toàn site trông như một hệ thống.
 */
export default function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const tr = useTranslated();
  const name = tr(product.name, product.nameEn);
  const imageUrl = product.images?.[0] || FALLBACK_IMAGE;
  const available = product.stock > 0;
  const href = `/product-detail?id=${product.id}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <Link href={href} className="relative block aspect-4/5 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-brand-deep shadow-sm backdrop-blur-md">
            <span
              className={`inline-flex h-1.5 w-1.5 rounded-full ${
                available ? "bg-blue-500" : "bg-zinc-400"
              }`}
            />
            {available ? t("card.inStock") : t("card.outOfStock")}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-3 md:p-4">
        <Link href={href} className="min-w-0 hover:underline">
          <h3 className="line-clamp-2 text-sm font-bold text-brand-deep sm:text-base">
            {name}
          </h3>
        </Link>

        {product.breed && (
          <p className="-mt-0.5 truncate text-xs text-brand-deep/60 sm:text-sm">
            {product.breed}
          </p>
        )}

        <div className="mt-auto border-t border-brand-deep/5" />

        <div className="flex flex-col gap-1 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-extrabold text-brand-deep sm:text-base">
            {formatPrice(product.price, locale)}
            <UsdHint amount={product.price} block className="text-[11px]" />
          </span>
          <Link
            href={href}
            className="flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-brand-gold transition-colors hover:text-brand-deep sm:text-sm"
          >
            {t("common.viewDetail")}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
