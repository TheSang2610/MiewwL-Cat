"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

/** Ảnh minh hoạ khu grooming. KHÔNG dùng ảnh cửa hàng của người khác ở đây
 *  — khi có ảnh thật của tiệm mình thì thay vào. */
const BRANCH_IMAGE = "/blog/grooming.jpg";

const HOTLINE_DISPLAY = "0384.589.559";

export default function BranchSection() {
  const t = useT();

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-gold">
            {t("spa.branchKicker")}
          </div>
          <h2 className="text-2xl font-bold text-brand-deep md:text-4xl">
            {t("spa.branchTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-brand-deep/50">
            {t("spa.branchDesc")}
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-brand-deep/10 bg-white md:grid-cols-2">
          <div className="relative aspect-4/3 md:aspect-auto">
            <Image
              src={BRANCH_IMAGE}
              alt={t("spa.branchImageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <h4 className="mb-3 text-lg font-bold text-brand-deep">{t("spa.branchName")}</h4>
            <div className="mb-6 space-y-1 text-sm text-brand-deep/60">
              <p className="font-semibold text-brand-deep">
                {t("spa.branchAddress")}
                <span className="ml-1 text-xs font-normal text-brand-deep/40">
                  {t("spa.branchAddressNote")}
                </span>
              </p>
              <p>{t("spa.branchHours")}</p>
              <p>
                {t("spa.branchHotline")}{" "}
                <b className="text-brand-deep">{HOTLINE_DISPLAY}</b>
              </p>
            </div>
            <a
              href="tel:0384589559"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t("spa.branchCall", { phone: HOTLINE_DISPLAY })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
