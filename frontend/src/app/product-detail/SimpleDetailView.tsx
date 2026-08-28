"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import Gallery from "@/components/storefront/Gallery";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/use-document-title";
import { useTranslated } from "@/lib/content-i18n";
import UsdHint from "@/components/storefront/UsdHint";

export default function SimpleDetailView({ product }: { product: Product }) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const tr = useTranslated();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const available = product.stock > 0;
  const name = tr(product.name, product.nameEn);

  useDocumentTitle(name);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      // Giỏ hàng và đơn hàng luôn lưu tên tiếng Việt để trang quản trị đọc
      // đúng, dù khách đang xem site bằng tiếng Anh.
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      stock: product.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6 pt-4 font-montserrat text-brand-deep md:pt-6">
      <nav className="flex items-center gap-1.5 text-sm text-brand-deep/40">
        <Link href="/" className="transition-colors hover:text-brand-deep">
          {t("common.home")}
        </Link>
        <span>›</span>
        <span className="font-medium text-brand-deep">{name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Gallery images={product.images} alt={name} aspectClass="aspect-square" />

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
            {available
              ? t("simpleDetail.stockLeft", { count: product.stock })
              : t("card.outOfStock")}
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-brand-deep md:text-4xl">{name}</h1>

          {product.description && (
            <p className="mt-4 text-base leading-relaxed text-brand-deep/70">{tr(product.description, product.descriptionEn)}</p>
          )}

          <p className="mt-5 text-3xl font-extrabold text-brand-deep">
            {formatPrice(product.price, locale)}
            <UsdHint amount={product.price} className="text-lg" />
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-deep/40">
              {t("simpleDetail.quantity")}
            </span>
            <div className="flex items-center rounded-lg border border-brand-deep/15">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={t("cart.decrease")}
                className="px-3 py-1.5 text-brand-deep/70 hover:bg-brand-cream"
              >
                -
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                aria-label={t("cart.increase")}
                className="px-3 py-1.5 text-brand-deep/70 hover:bg-brand-cream"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!available}
              className="w-full rounded-full bg-brand-deep py-3.5 text-base font-medium text-white transition-all hover:bg-brand-deep/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {added ? t("simpleDetail.added") : t("simpleDetail.addToCart")}
            </button>
            <button
              type="button"
              onClick={() => {
                handleAddToCart();
                router.push("/checkout");
              }}
              disabled={!available}
              className="w-full rounded-full border border-brand-deep/20 py-3 text-base font-medium text-brand-deep transition-all hover:bg-brand-deep/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("simpleDetail.buyNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
