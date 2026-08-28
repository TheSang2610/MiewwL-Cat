"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { useT } from "@/lib/i18n";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import PetDetailView from "./PetDetailView";
import SimpleDetailView from "./SimpleDetailView";

const PET_CATEGORIES = ["meo", "cho"];

function ProductDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const t = useT();

  const {
    data: product,
    loading,
    error,
    reload,
  } = useAsync(() => {
    if (!id) throw new Error("missing-id");
    return api.products.get(id);
  }, [id]);

  if (loading) return <LoadingMessage label={t("productDetail.loading")} />;

  if (error || !product) {
    const message =
      error === "missing-id" ? t("productDetail.missingId") : error || t("productDetail.notFound");
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ErrorMessage message={message} onRetry={reload} />
        <Link href="/" className="text-sm text-zinc-700 underline">
          {t("common.backToHome")}
        </Link>
      </div>
    );
  }

  const isPet = PET_CATEGORIES.includes(product.category?.slug || "");

  return isPet ? <PetDetailView product={product} /> : <SimpleDetailView product={product} />;
}

export default function ProductDetailContent() {
  return (
    <Suspense>
      <ProductDetail />
    </Suspense>
  );
}
