"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { errorMessage } from "@/lib/api";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { useT } from "@/lib/i18n";

const inputClass =
  "w-full rounded-xl border border-brand-deep/15 bg-white p-3 text-sm focus:border-brand-deep focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-semibold text-brand-deep/70";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useT();
  const next = searchParams.get("next") || "/account-orders";

  const register = useCustomerAuthStore((s) => s.register);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
      });
      router.push(next);
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-16 font-montserrat text-brand-deep">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-brand-deep">{t("auth.registerTitle")}</h1>
        <p className="mt-1 text-sm text-brand-deep/50">{t("auth.registerDesc")}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>{t("auth.fullName")}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => set({ name: e.target.value })}
              className={inputClass}
              placeholder={t("auth.fullNamePlaceholder")}
              autoComplete="name"
            />
          </div>

          <div>
            <label className={labelClass}>{t("auth.email")}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set({ email: e.target.value })}
              className={inputClass}
              placeholder="ban@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className={labelClass}>{t("auth.phone")}</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set({ phone: e.target.value })}
              className={inputClass}
              placeholder="0901234567"
              autoComplete="tel"
            />
          </div>

          <div>
            <label className={labelClass}>{t("auth.password")}</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => set({ password: e.target.value })}
              className={inputClass}
              placeholder={t("auth.passwordHint")}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-deep py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-deep/90 disabled:opacity-50"
          >
            {loading ? t("auth.registering") : t("auth.register")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-deep/60">
          {t("auth.hasAccount")}{" "}
          <Link
            href={`/dang-nhap?next=${encodeURIComponent(next)}`}
            className="font-semibold text-brand-gold hover:underline"
          >
            {t("auth.loginTitle")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPageContent() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
