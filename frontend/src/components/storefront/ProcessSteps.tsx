"use client";

import { Search, MessageCircle, Stethoscope, Gift, Heart, LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { useT, Translate } from "@/lib/i18n";

function steps(t: Translate): { icon: LucideIcon; title: string; desc: string }[] {
  return [
    { icon: Search, title: t("process.s1Title"), desc: t("process.s1Desc") },
    { icon: MessageCircle, title: t("process.s2Title"), desc: t("process.s2Desc") },
    { icon: Stethoscope, title: t("process.s3Title"), desc: t("process.s3Desc") },
    { icon: Gift, title: t("process.s4Title"), desc: t("process.s4Desc") },
    { icon: Heart, title: t("process.s5Title"), desc: t("process.s5Desc") },
  ];
}

export default function ProcessSteps() {
  const t = useT();
  const STEPS = steps(t);

  return (
    <section className="py-8 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <h2 className="text-center text-xl font-bold text-brand-deep md:text-4xl">
            {t("process.title")}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mb-4 mt-2 text-center text-xs text-brand-deep/70 md:mb-0 md:mt-3 md:text-base">
            {t("process.subtitle")}
          </p>
        </Reveal>

        {/* Desktop: 5 cột, có đường nối giữa các bước */}
        <div className="mt-14 hidden md:grid md:grid-cols-5">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 100}>
                <div className="relative flex flex-col items-center text-center">
                  {index < STEPS.length - 1 && (
                    <div className="absolute left-[62%] top-8 h-0.5 w-[76%] bg-brand-pink/30" />
                  )}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink text-xl font-bold text-brand-deep">
                    {index + 1}
                  </div>
                  <Icon className="mt-3 h-[18px] w-[18px] text-brand-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-brand-deep">{step.title}</h3>
                  <p className="mt-2 max-w-[160px] text-sm text-brand-deep/60">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile: rút gọn, chỉ icon + tên bước */}
        <div className="grid grid-cols-5 gap-1 text-center md:hidden">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 80}>
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pink text-xs font-bold text-brand-deep">
                    {index + 1}
                  </div>
                  <Icon className="mt-1 h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
                  <h3 className="mt-1 text-[10px] font-medium leading-tight text-brand-deep">
                    {step.title}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
