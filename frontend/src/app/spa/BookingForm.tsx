"use client";

import { useState } from "react";
import { api, errorMessage } from "@/lib/api";
import { GROOMING_SERVICES } from "@/data/spa-pricing";
import { useI18n, formatPrice } from "@/lib/i18n";
import UsdHint from "@/components/storefront/UsdHint";
import { vi } from "@/lib/messages";
import { CalculatorSelection } from "./SpaCalculator";

const WEEKDAY_ABBR_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const WEEKDAY_ABBR_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PHONE_RE = /^0\d{8,10}$/;

export default function BookingForm({
  selection,
  estimatedPrice,
}: {
  selection: CalculatorSelection;
  estimatedPrice: number | null;
}) {
  const { t, locale } = useI18n();
  const [phone, setPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const datePills = (() => {
    const abbr = locale === "en" ? WEEKDAY_ABBR_EN : WEEKDAY_ABBR_VI;
    const today = new Date();
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const top = i === 0 ? t("spa.today") : i === 1 ? t("spa.tomorrow") : abbr[d.getDay()];
      const bottom = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
      return { iso, top, bottom };
    });
  })();

  const [desiredDate, setDesiredDate] = useState(datePills[0].iso);

  const service = GROOMING_SERVICES.find((s) => s.id === selection.serviceId);
  const hasSelection = !!(
    selection.species &&
    selection.weightTier &&
    service &&
    estimatedPrice != null
  );
  const speciesLabel =
    selection.species === "CAT"
      ? t("species.catTitle")
      : selection.species === "DOG"
        ? t("species.dogTitle")
        : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!PHONE_RE.test(phone)) {
      setPhoneError(t("spa.phoneInvalid"));
      return;
    }
    setPhoneError(null);

    if (!hasSelection || !selection.species || !selection.weightTier || !service || estimatedPrice == null) {
      setSubmitError(t("spa.selectionMissing"));
      return;
    }

    setSubmitting(true);
    try {
      await api.spaBookings.create({
        phone,
        petName: petName || undefined,
        species: selection.species,
        weightTier: selection.weightTier,
        // Trang quản trị luôn tiếng Việt, nên lưu tên dịch vụ tiếng Việt
        // bất kể khách đang xem site bằng ngôn ngữ nào.
        serviceName: vi[service.nameKey],
        estimatedPrice,
        desiredDate,
      });
      setSuccess(true);
    } catch (err) {
      setSubmitError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="mb-1 text-lg font-bold text-emerald-800">{t("spa.successTitle")}</p>
        <p className="text-sm text-emerald-700">{t("spa.successDesc", { phone })}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-brand-deep/10 bg-brand-cream p-6">
        <h4 className="mb-3 text-sm font-bold text-brand-deep">{t("spa.summaryTitle")}</h4>
        {hasSelection ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-deep/60">{t("spa.summarySpecies")}</span>
              <span className="font-medium text-brand-deep">{speciesLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-deep/60">{t("spa.summaryWeight")}</span>
              <span className="font-medium text-brand-deep">{selection.weightTier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-deep/60">{t("spa.summaryService")}</span>
              <span className="font-medium text-brand-deep">{t(service!.nameKey)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-deep/10 pt-2">
              <span className="text-brand-deep/60">{t("spa.summaryPrice")}</span>
              <span className="text-right font-bold text-brand-deep">
                {formatPrice(estimatedPrice!, locale)}
                <UsdHint amount={estimatedPrice!} block className="text-[11px]" />
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-brand-deep/40">{t("spa.summaryEmpty")}</span>
            <span className="text-brand-deep/40">—</span>
          </div>
        )}
        <p className="mt-4 text-xs leading-relaxed text-brand-deep/40">{t("spa.summaryNote")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="f_phone" className="mb-1 block text-xs font-semibold text-brand-deep/70">
            {t("spa.phoneLabel")} <span className="text-rose-500">*</span>
          </label>
          <input
            id="f_phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="0xxx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-brand-deep/15 px-4 py-2.5 text-sm focus:border-brand-deep focus:outline-none"
          />
          {phoneError && <p className="mt-1 text-xs text-rose-600">{phoneError}</p>}
        </div>

        <div>
          <label htmlFor="f_name" className="mb-1 block text-xs font-semibold text-brand-deep/70">
            {t("spa.petNameLabel")}
          </label>
          <input
            id="f_name"
            type="text"
            placeholder={t("spa.petNamePlaceholder")}
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full rounded-xl border border-brand-deep/15 px-4 py-2.5 text-sm focus:border-brand-deep focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-brand-deep/70">
            {t("spa.dateLabel")}
          </label>
          <div className="flex flex-wrap gap-2">
            {datePills.map((p) => (
              <button
                key={p.iso}
                type="button"
                onClick={() => setDesiredDate(p.iso)}
                className={`flex flex-col items-center rounded-xl border px-3 py-2 text-xs transition-colors ${
                  desiredDate === p.iso
                    ? "border-brand-deep bg-brand-deep text-white"
                    : "border-brand-deep/15 text-brand-deep hover:border-brand-deep/40"
                }`}
              >
                <span className="font-semibold">{p.top}</span>
                <span className="opacity-70">{p.bottom}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-brand-deep/40">{t("spa.consent")}</p>

        {submitError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-brand-deep px-6 py-3.5 text-sm font-bold text-white transition-opacity disabled:opacity-50"
        >
          {submitting ? t("spa.submitting") : t("spa.submit")}
        </button>
      </form>
    </div>
  );
}
