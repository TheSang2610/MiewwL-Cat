"use client";

import {
  CUSTOM_QUOTE_ITEMS,
  DYE_SERVICES,
  DYE_TIERS,
  GROOMING_SERVICES,
  WEIGHT_TIERS,
} from "@/data/spa-pricing";
import { useI18n, Locale } from "@/lib/i18n";

/** Rút gọn giá cho vừa ô bảng: 1.200.000 -> "1,2tr" / "1.2m". */
function fmt(n: number, locale: Locale) {
  const group = locale === "en" ? "en-US" : "vi-VN";
  return n >= 1_000_000
    ? `${(n / 1_000_000).toLocaleString(group)}${locale === "en" ? "m" : "tr"}`
    : `${Math.round(n / 1000)}k`;
}

export default function PricingTable() {
  const { t, locale } = useI18n();
  const combos = GROOMING_SERVICES.filter((s) => s.group === "combo");
  const singles = GROOMING_SERVICES.filter((s) => s.group === "le");

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left text-sm">
            <thead>
              <tr className="bg-brand-deep text-xs uppercase tracking-wide text-white">
                <th className="p-4">{t("spa.tableGrooming")}</th>
                {WEIGHT_TIERS.map((tier) => (
                  <th key={tier} className="p-4 text-right font-medium text-white/80">
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-deep/10">
              <tr>
                <td
                  colSpan={WEIGHT_TIERS.length + 1}
                  className="pt-5 px-4 pb-2 text-xs font-bold uppercase tracking-wide text-brand-gold"
                >
                  {t("spa.combos")}
                </td>
              </tr>
              {combos.map((s) => (
                <tr key={s.id}>
                  <td className="p-4 font-medium text-brand-deep">{t(s.nameKey)}</td>
                  {WEIGHT_TIERS.map((tier) => (
                    <td key={tier} className="p-4 text-right tabular-nums text-brand-deep/70">
                      {fmt(s.prices[tier], locale)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td
                  colSpan={WEIGHT_TIERS.length + 1}
                  className="pt-5 px-4 pb-2 text-xs font-bold uppercase tracking-wide text-brand-gold"
                >
                  {t("spa.singles")}
                </td>
              </tr>
              {singles.map((s) => (
                <tr key={s.id}>
                  <td className="p-4 font-medium text-brand-deep">{t(s.nameKey)}</td>
                  {WEIGHT_TIERS.map((tier) => (
                    <td key={tier} className="p-4 text-right tabular-nums text-brand-deep/70">
                      {fmt(s.prices[tier], locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left text-sm">
            <thead>
              <tr className="bg-brand-deep text-xs uppercase tracking-wide text-white">
                <th className="p-4">{t("spa.tableDye")}</th>
                {DYE_TIERS.map((tier) => (
                  <th key={tier} className="p-4 text-right font-medium text-white/80">
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-deep/10">
              {DYE_SERVICES.map((s) => (
                <tr key={s.id}>
                  <td className="p-4 font-medium text-brand-deep">{t(s.nameKey)}</td>
                  {DYE_TIERS.map((tier) => (
                    <td key={tier} className="p-4 text-right tabular-nums text-brand-deep/70">
                      {fmt(s.prices[tier], locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-brand-deep text-xs uppercase tracking-wide text-white">
              <th className="p-4" colSpan={2}>
                {t("spa.tableCustom")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-deep/10">
            {CUSTOM_QUOTE_ITEMS.map((item) => (
              <tr key={item.id}>
                <td className="p-4 font-medium text-brand-deep">{t(item.nameKey)}</td>
                <td className="p-4 text-right text-xs text-brand-deep/50">{t(item.noteKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-brand-deep/40">{t("spa.pricingFootnote")}</p>
    </div>
  );
}
