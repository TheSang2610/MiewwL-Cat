"use client";

import { Shield, Award, Syringe, Heart, LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { useT, Translate } from "@/lib/i18n";

function reasons(t: Translate): { icon: LucideIcon; title: string; desc: string }[] {
  return [
    { icon: Shield, title: t("why.warrantyTitle"), desc: t("why.warrantyDesc") },
    { icon: Award, title: t("why.purebredTitle"), desc: t("why.purebredDesc") },
    { icon: Syringe, title: t("why.vaccineTitle"), desc: t("why.vaccineDesc") },
    { icon: Heart, title: t("why.aftercareTitle"), desc: t("why.aftercareDesc") },
  ];
}

export default function WhyChooseUs() {
  const t = useT();

  return (
    <section className="py-10 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-brand-deep md:text-4xl">
            {t("why.title")}
          </h2>
        </Reveal>

        <div className="mt-6 grid auto-rows-fr grid-cols-2 gap-3 md:mt-12 md:gap-6 xl:grid-cols-4">
          {reasons(t).map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={index * 100} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white/85 p-4 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl md:rounded-3xl md:p-8">
                  <Icon
                    className="h-8 w-8 text-brand-gold md:h-12 md:w-12"
                    aria-hidden="true"
                  />
                  <h3 className="mb-1 mt-2 text-sm font-bold leading-tight text-brand-deep md:mb-2 md:mt-4 md:text-xl">
                    {reason.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-brand-deep/60 md:text-sm">
                    {reason.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
