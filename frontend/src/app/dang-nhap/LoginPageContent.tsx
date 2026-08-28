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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useT();
  // Sau khi đăng nhập quay lại đúng trang khách đang xem dở (vd /checkout).
  const next = searchParams.get("next") || "/account-orders";

  const login = useCustomerAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push(next);
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-16 font-montserrat text-brand-deep">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-brand-deep">{t("auth.loginTitle")}</h1>
        <p className="mt-1 text-sm text-brand-deep/50">{t("auth.loginDesc")}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>{t("auth.email")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="ban@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className={labelClass}>{t("auth.password")}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-deep py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-deep/90 disabled:opacity-50"
          >
            {loading ? t("auth.loggingIn") : t("auth.loginTitle")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-deep/60">
          {t("auth.noAccount")}{" "}
          <Link
            href={`/dang-ky?next=${encodeURIComponent(next)}`}
            className="font-semibold text-brand-gold hover:underline"
          >
            {t("auth.registerNow")}
          </Link>
        </p>

        {/* Chưa gửi được email đặt lại mật khẩu — nói thẳng cách xử lý thay vì
            để một link "quên mật khẩu" bấm vào không ra gì. */}
        <details className="mt-5 rounded-xl border border-brand-deep/10 p-3">
          <summary className="cursor-pointer text-sm font-medium text-brand-deep/70">
            {t("password.forgotTitle")}
          </summary>
          <p className="mt-2 text-xs leading-relaxed text-brand-deep/55">
            {t("password.forgotDesc", { phone: HOTLINE })}
          </p>
        </details>

        <div className="mt-6 rounded-xl bg-brand-cream p-3 text-center text-xs text-brand-deep/50">
          {t("auth.demoAccount")} <strong>khachhang@gmail.com</strong> / <strong>123456</strong>
        </div>
      </div>
    </div>
  );
}

const HOTLINE = "0384.589.559";

export default function LoginPageContent() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
