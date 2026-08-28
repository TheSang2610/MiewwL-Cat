"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useT } from "@/lib/i18n";

export default function ContentTeasers() {
  const t = useT();

  const teasers = [
    { href: "/blog", title: t("teasers.blogTitle"), desc: t("teasers.blogDesc") },
    { href: "/cham-soc", title: t("teasers.careTitle"), desc: t("teasers.careDesc") },
  ];

  return (
    <section className="py-8 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {teasers.map((teaser) => (
              <Link
                key={teaser.href}
                href={teaser.href}
                className="group flex items-center justify-between gap-4 rounded-3xl bg-white/70 px-6 py-6 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg md:px-8 md:py-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-brand-deep md:text-xl">
                    {teaser.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-deep/70">{teaser.desc}</p>
                </div>
                <span className="shrink-0 text-xl text-brand-deep transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
