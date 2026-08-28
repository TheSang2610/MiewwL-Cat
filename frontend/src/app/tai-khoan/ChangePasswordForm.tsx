"use client";

import { useState } from "react";
import { Check, KeyRound } from "lucide-react";
import { api, ApiError, errorMessage } from "@/lib/api";
import { useT } from "@/lib/i18n";

type State = "idle" | "saving" | "done";

export default function ChangePasswordForm() {
  const t = useT();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "saving") return;
    setError(null);

    // Kiểm tra tại chỗ những thứ không cần hỏi server.
    if (next.length < 6) return setError(t("password.tooShort"));
    if (next !== confirm) return setError(t("password.mismatch"));
    if (next === current) return setError(t("password.sameAsOld"));

    setState("saving");
    try {
      await api.auth.changePassword(current, next);
      setState("done");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      setState("idle");
      // 422 từ server thường là "mật khẩu mới trùng mật khẩu cũ"; thông điệp
      // của server đã đủ rõ nên hiển thị nguyên văn.
      setError(err instanceof ApiError ? err.message : errorMessage(err));
    }
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-brand-deep">
        <KeyRound className="h-4 w-4" />
        {t("password.title")}
      </h2>
      <p className="mb-5 text-sm text-brand-deep/55">{t("password.desc")}</p>

      <form onSubmit={submit} className="max-w-sm space-y-4" noValidate>
        <Field
          id="cur-pw"
          label={t("password.current")}
          value={current}
          onChange={setCurrent}
          autoComplete="current-password"
        />
        <Field
          id="new-pw"
          label={t("password.new")}
          value={next}
          onChange={setNext}
          autoComplete="new-password"
        />
        <Field
          id="cf-pw"
          label={t("password.confirm")}
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
        />

        {error && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {error}
          </p>
        )}
        {state === "done" && (
          <p className="flex items-start gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {t("password.success")}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "saving"}
          className="w-full rounded-full bg-brand-deep py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90 disabled:opacity-50"
        >
          {state === "saving" ? t("password.saving") : t("password.submit")}
        </button>
      </form>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-brand-deep/70">
        {label}
      </label>
      <input
        id={id}
        type="password"
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-brand-deep/15 px-4 py-2.5 text-sm focus:border-brand-deep focus:outline-none"
      />
    </div>
  );
}
