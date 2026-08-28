"use client";

import Reveal from "./Reveal";
import { useT } from "@/lib/i18n";

const HOTLINE_DISPLAY = "0384.589.559";

export default function ContactCta() {
  const t = useT();

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-brand-pink to-brand-cream py-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="rounded-3xl bg-white/55 px-6 py-10 text-center backdrop-blur-sm md:px-10 md:py-14">
            <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
              {t("contactCta.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-deep/70 md:mt-4 md:text-base">
              {t("contactCta.desc")}
            </p>
            <a
              href="tel:0384589559"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-deep px-10 py-3 text-base font-semibold text-white transition-transform duration-300 ease-in-out hover:scale-105 md:mt-8 md:w-auto md:py-4 md:text-lg"
            >
              {t("contactCta.cta", { phone: HOTLINE_DISPLAY })}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
