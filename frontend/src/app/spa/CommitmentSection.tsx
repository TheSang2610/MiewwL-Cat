"use client";

import { useT, Translate } from "@/lib/i18n";

function commitments(t: Translate) {
  return [
    { icon: "🛡️", title: t("spa.commit1Title"), desc: t("spa.commit1Desc") },
    { icon: "🧴", title: t("spa.commit2Title"), desc: t("spa.commit2Desc") },
    { icon: "✂️", title: t("spa.commit3Title"), desc: t("spa.commit3Desc") },
    { icon: "📷", title: t("spa.commit4Title"), desc: t("spa.commit4Desc") },
  ];
}

function processSteps(t: Translate) {
  return [
    { n: "01", title: t("spa.flow1Title"), desc: t("spa.flow1Desc") },
    { n: "02", title: t("spa.flow2Title"), desc: t("spa.flow2Desc") },
    { n: "03", title: t("spa.flow3Title"), desc: t("spa.flow3Desc") },
    { n: "04", title: t("spa.flow4Title"), desc: t("spa.flow4Desc") },
  ];
}

export default function CommitmentSection() {
  const t = useT();

  return (
    <section className="bg-white/60 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-gold">
            {t("spa.commitKicker")}
          </div>
          <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
            {t("spa.commitTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-brand-deep/50">
            {t("spa.commitDesc")}
          </p>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {commitments(t).map((c) => (
            <div key={c.title} className="rounded-2xl border border-brand-deep/10 bg-white p-5">
              <div className="mb-2 text-2xl">{c.icon}</div>
              <h4 className="mb-1 text-sm font-bold text-brand-deep">{c.title}</h4>
              <p className="text-xs leading-relaxed text-brand-deep/50">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {processSteps(t).map((s) => (
            <div key={s.n}>
              <div className="mb-1 text-2xl font-extrabold text-brand-pink">{s.n}</div>
              <b className="text-sm text-brand-deep">{s.title}</b>
              <p className="mt-1 text-xs leading-relaxed text-brand-deep/50">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
