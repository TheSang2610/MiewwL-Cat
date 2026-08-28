"use client";

import { useState } from "react";
import SpaHero from "./SpaHero";
import SpaCalculator, { CalculatorSelection } from "./SpaCalculator";
import BookingForm from "./BookingForm";
import PricingTable from "./PricingTable";
import MobilePriceBar from "./MobilePriceBar";
import CommitmentSection from "./CommitmentSection";
import BranchSection from "./BranchSection";
import { GROOMING_SERVICES } from "@/data/spa-pricing";
import { useT } from "@/lib/i18n";

export default function SpaPageContent() {
  const t = useT();
  const [selection, setSelection] = useState<CalculatorSelection>({
    species: null,
    weightTier: null,
    serviceId: null,
  });

  const service = GROOMING_SERVICES.find((s) => s.id === selection.serviceId);
  const estimatedPrice =
    service && selection.weightTier ? service.prices[selection.weightTier] : null;

  const scrollToBooking = () => {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-16 font-montserrat text-brand-deep md:pb-0">
      <SpaHero />

      <section id="calc" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-gold">
            {t("spa.calcKicker")}
          </div>
          <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
            {t("spa.calcTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-brand-deep/50">
            {t("spa.calcDesc")}
          </p>
        </div>

        <SpaCalculator
          selection={selection}
          onChange={(patch) => setSelection((prev) => ({ ...prev, ...patch }))}
          onHoldPrice={scrollToBooking}
        />
      </section>

      <section id="book" className="bg-white/60 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-gold">
              {t("spa.bookKicker")}
            </div>
            <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
              {t("spa.bookTitle")}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-brand-deep/50">
              {t("spa.bookDesc")}
            </p>
          </div>

          <BookingForm selection={selection} estimatedPrice={estimatedPrice} />
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-gold">
            {t("spa.pricingKicker")}
          </div>
          <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
            {t("spa.pricingTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-brand-deep/50">
            {t("spa.pricingDesc")}
          </p>
        </div>
        <PricingTable />
      </section>

      <MobilePriceBar price={estimatedPrice} onHoldPrice={scrollToBooking} />

      <CommitmentSection />
      <BranchSection />
    </div>
  );
}
