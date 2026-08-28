"use client";

import { useState } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { useT } from "@/lib/i18n";
import { MessageKey } from "@/lib/messages";

const FAQ_ITEMS: { q: MessageKey; a: MessageKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
];

export default function WarrantyFaq() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-16 border-t border-brand-deep/5 pt-12 md:mt-24">
      <h2 className="text-xl font-bold text-brand-deep">{t("faq.title")}</h2>
      <div className="mt-6">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className="border-b border-brand-deep/5">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left font-semibold text-brand-deep transition-colors hover:text-brand-gold"
              >
                <span className="flex items-center gap-3">
                  <Shield className="h-[18px] w-[18px] text-brand-gold" />
                  {t(item.q)}
                </span>
                <ChevronDown
                  className={`h-[18px] w-[18px] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <p className="pb-5 text-sm leading-relaxed text-brand-deep/70">{t(item.a)}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
