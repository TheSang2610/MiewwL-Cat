"use client";

import { useI18n, formatPrice } from "@/lib/i18n";
import UsdHint from "@/components/storefront/UsdHint";

export default function MobilePriceBar({
  price,
  onHoldPrice,
}: {
  price: number | null;
  onHoldPrice: () => void;
}) {
  const { t, locale } = useI18n();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-brand-deep/10 bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-deep/40">
          {t("spa.estimated")}
        </div>
        <div className={`text-base font-bold ${price != null ? "text-brand-deep" : "text-brand-deep/30"}`}>
          {price != null ? (
            <>
              {formatPrice(price, locale)}
              <UsdHint amount={price} className="text-xs" />
            </>
          ) : (
            t("spa.estimatedEmptyShort")
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onHoldPrice}
        disabled={price == null}
        className="shrink-0 rounded-xl bg-brand-gold px-5 py-2.5 text-sm font-bold text-brand-deep transition-opacity disabled:opacity-30"
      >
        {t("spa.holdShort")}
      </button>
    </div>
  );
}
