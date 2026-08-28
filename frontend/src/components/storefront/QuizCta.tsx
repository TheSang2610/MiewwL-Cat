"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Reveal from "./Reveal";
import { useT } from "@/lib/i18n";

export default function QuizCta() {
  const t = useT();

  const personalityGroups = [
    t("quiz.g1"),
    t("quiz.g2"),
    t("quiz.g3"),
    t("quiz.g4"),
    t("quiz.g5"),
    t("quiz.g6"),
  ];

  return (
    <section className="py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,#FFCFE9_0%,#FFF6E6_55%,rgba(157,209,211,0.25)_100%)] px-6 py-10 md:px-12 md:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-brand-deep backdrop-blur-sm">
                  <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("quiz.badge")}
                </span>

                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-brand-deep md:text-4xl">
                  {t("quiz.title")}
                </h2>

                <p className="mt-3 max-w-xl text-sm text-brand-deep/70 md:text-base">
                  {t("quiz.desc")}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {personalityGroups.map((group) => (
                    <span
                      key={group}
                      className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-brand-deep backdrop-blur-sm"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                <Link
                  href="/#catalog"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-deep px-8 py-3 text-base font-semibold text-white transition-transform duration-300 ease-in-out hover:scale-105 md:py-4 md:text-lg"
                >
                  <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
                  {t("quiz.cta")}
                </Link>
              </div>

              <div className="hidden lg:flex lg:justify-end">
                <div className="flex h-44 w-44 items-center justify-center rounded-[2rem] bg-white/45 backdrop-blur-sm">
                  <Heart
                    className="text-brand-pink"
                    size={92}
                    fill="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
