"use client";

import { useT } from "@/lib/i18n";

export function LoadingMessage({ label }: { label?: string }) {
  const t = useT();
  return (
    <p className="py-24 text-center text-sm font-light text-zinc-500">
      {label ?? t("common.loading")}
    </p>
  );
}

export function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const t = useT();
  return (
    <div className="py-24 text-center">
      <p className="mb-4 text-sm text-rose-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border border-zinc-300 px-6 py-2.5 text-xs uppercase tracking-widest text-zinc-700 transition-colors hover:border-zinc-900"
        >
          {t("common.retry")}
        </button>
      )}
    </div>
  );
}
