"use client";

import { useState } from "react";
import { Species } from "@/lib/types";
import { GROOMING_SERVICES, WEIGHT_TIERS, WeightTier } from "@/data/spa-pricing";
import { useI18n, formatPrice } from "@/lib/i18n";
import UsdHint from "@/components/storefront/UsdHint";

export interface CalculatorSelection {
  species: Species | null;
  weightTier: WeightTier | null;
  /** Id ổn định của dịch vụ; tên hiển thị lấy theo ngôn ngữ đang chọn. */
  serviceId: string | null;
}

export default function SpaCalculator({
  selection,
  onChange,
  onHoldPrice,
}: {
  selection: CalculatorSelection;
  onChange: (patch: Partial<CalculatorSelection>) => void;
  onHoldPrice: () => void;
}) {
  const { t, locale } = useI18n();
  const [step, setStep] = useState(1);
  const { species, weightTier, serviceId } = selection;

  const speciesOptions: { value: Species; label: string }[] = [
    { value: "DOG", label: t("species.dogTitle") },
    { value: "CAT", label: t("species.catTitle") },
  ];

  const stepLabels = [
    { title: t("spa.step1Title"), hint: t("spa.step1Hint") },
    { title: t("spa.step2Title"), hint: t("spa.step2Hint") },
    { title: t("spa.step3Title"), hint: t("spa.step3Hint") },
  ];

  const service = GROOMING_SERVICES.find((s) => s.id === serviceId);
  const price = service && weightTier ? service.prices[weightTier] : null;
  const speciesLabel =
    species === "CAT" ? t("species.cat") : species === "DOG" ? t("species.dog") : t("spa.yourPet");

  const goToStep = (target: number) => {
    if (target === 2 && !species) return;
    if (target === 3 && !weightTier) return;
    setStep(target);
  };

  return (
    <div className="calc-shell grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="calc-card rounded-3xl border border-brand-deep/10 bg-white p-5 md:p-8">
        {/* Stepper */}
        <div className="mb-6 flex gap-2">
          {stepLabels.map((s, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => goToStep(n)}
                disabled={n > step && !(n === 2 ? species : n === 3 ? weightTier : true)}
                className={`flex flex-1 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  active
                    ? "border-brand-deep bg-brand-deep text-white"
                    : done
                      ? "border-brand-gold/40 bg-brand-cream text-brand-deep"
                      : "border-brand-deep/10 text-brand-deep/40"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active
                      ? "bg-white text-brand-deep"
                      : done
                        ? "bg-brand-gold text-white"
                        : "bg-brand-deep/10 text-brand-deep/40"
                  }`}
                >
                  {done ? "✓" : n}
                </span>
                <span className="hidden sm:block">
                  <span className="block text-xs font-semibold">{s.title}</span>
                  <span className="block text-[10px] opacity-70">{s.hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Step 1: species */}
        {step === 1 && (
          <div>
            <h3 className="mb-1 text-lg font-bold text-brand-deep">{t("spa.step1Q")}</h3>
            <p className="mb-4 text-sm text-brand-deep/50">{t("spa.step1Desc")}</p>
            <div className="flex flex-wrap gap-2">
              {speciesOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange({ species: opt.value });
                    setStep(2);
                  }}
                  className={`rounded-xl border px-6 py-3 text-sm font-semibold transition-colors ${
                    species === opt.value
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-brand-deep/15 text-brand-deep hover:border-brand-deep/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: weight tier */}
        {step === 2 && (
          <div>
            <h3 className="mb-1 text-lg font-bold text-brand-deep">
              {t("spa.step2Q", { species: speciesLabel })}
            </h3>
            <p className="mb-4 text-sm text-brand-deep/50">{t("spa.step2Desc")}</p>
            <div className="flex flex-wrap gap-2">
              {WEIGHT_TIERS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => {
                    onChange({ weightTier: tier });
                    setStep(3);
                  }}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    weightTier === tier
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-brand-deep/15 text-brand-deep hover:border-brand-deep/40"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-brand-deep/50 hover:text-brand-deep"
              >
                {t("common.back")}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: service */}
        {step === 3 && weightTier && (
          <div>
            <h3 className="mb-1 text-lg font-bold text-brand-deep">{t("spa.step3Q")}</h3>
            <p className="mb-4 text-sm text-brand-deep/50">
              {t("spa.step3Desc", { tier: weightTier })}
            </p>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-deep/40">
              {t("spa.combos")}
            </p>
            <div className="mb-4 grid gap-2 sm:grid-cols-2">
              {GROOMING_SERVICES.filter((s) => s.group === "combo").map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChange({ serviceId: s.id })}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    serviceId === s.id
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-brand-deep/15 text-brand-deep hover:border-brand-deep/40"
                  }`}
                >
                  <span className="font-medium">{t(s.nameKey)}</span>
                  <span className="font-bold tabular-nums">
                    {formatPrice(s.prices[weightTier], locale)}
                  </span>
                </button>
              ))}
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-deep/40">
              {t("spa.singles")}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {GROOMING_SERVICES.filter((s) => s.group === "le").map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChange({ serviceId: s.id })}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    serviceId === s.id
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-brand-deep/15 text-brand-deep hover:border-brand-deep/40"
                  }`}
                >
                  <span className="font-medium">{t(s.nameKey)}</span>
                  <span className="font-bold tabular-nums">
                    {formatPrice(s.prices[weightTier], locale)}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm font-medium text-brand-deep/50 hover:text-brand-deep"
              >
                {t("common.back")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Price rail */}
      <aside className="rail-card sticky top-24 h-fit rounded-3xl border border-brand-deep/10 bg-brand-cream p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-deep/40">
          {t("spa.estimated")}
        </p>
        {price != null && service ? (
          <>
            <p className="text-3xl font-extrabold text-brand-deep">
              {formatPrice(price, locale)}
              <UsdHint amount={price} block className="text-sm" />
            </p>
            <p className="mt-1 text-xs text-brand-deep/50">
              {t(service.nameKey)} · {speciesLabel} {weightTier}
            </p>
          </>
        ) : (
          <p className="text-sm text-brand-deep/50">{t("spa.estimatedEmpty")}</p>
        )}
        <button
          type="button"
          onClick={onHoldPrice}
          disabled={price == null}
          className="mt-5 w-full rounded-xl bg-brand-deep px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          {t("spa.holdPrice")}
        </button>
      </aside>
    </div>
  );
}
