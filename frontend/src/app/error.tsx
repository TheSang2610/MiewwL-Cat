"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * Ranh giới lỗi cho toàn bộ phần cửa hàng. Không có file này thì Next hiện
 * màn hình lỗi mặc định bằng tiếng Anh, lạc hẳn khỏi giao diện site.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useT();

  useEffect(() => {
    // Ghi ra console để còn lần được dấu vết khi khách báo lỗi.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-cream px-4 py-24 text-center font-montserrat text-brand-deep">
      <p className="mb-4 text-6xl" aria-hidden="true">
        😿
      </p>
      <h1 className="mb-3 text-2xl font-extrabold md:text-3xl">{t("error.title")}</h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-brand-deep/60">{t("error.desc")}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90"
        >
          <RotateCcw className="h-4 w-4" />
          {t("error.retry")}
        </button>
        <Link
          href="/"
          className="rounded-full border border-brand-deep/20 px-7 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
        >
          {t("notFound.home")}
        </Link>
      </div>
      {error.digest && (
        <p className="mt-6 font-mono text-[11px] text-brand-deep/30">#{error.digest}</p>
      )}
    </div>
  );
}
