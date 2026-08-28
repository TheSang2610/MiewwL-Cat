"use client";

import Link from "next/link";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { LoadingMessage } from "@/components/storefront/StateMessage";
import { useT } from "@/lib/i18n";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountPageContent() {
  const user = useCustomerAuthStore((s) => s.user);
  const ready = useCustomerAuthStore((s) => s.ready);
  const t = useT();

  // `ready` bắt đầu là false ở cả server lẫn client nên không lệch hydrate,
  // và tránh chớp màn hình "chưa đăng nhập" khi F5 lúc đang đăng nhập.
  if (!ready) return <LoadingMessage />;

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-2xl font-bold text-brand-deep">{t("orders.loginTitle")}</h1>
        <p className="mb-6 text-sm text-brand-deep/55">{t("orders.loginDesc")}</p>
        <Link
          href="/dang-nhap?next=%2Ftai-khoan"
          className="rounded-full bg-brand-deep px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90"
        >
          {t("nav.login")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream px-4 py-12 font-montserrat text-brand-deep">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-brand-deep/40">
          <Link href="/" className="transition-colors hover:text-brand-deep">
            {t("common.home")}
          </Link>
          <span>›</span>
          <span className="font-medium text-brand-deep">{t("account.title")}</span>
        </nav>

        <h1 className="mb-8 text-3xl font-extrabold">{t("account.title")}</h1>

        <div className="space-y-5">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">{t("account.infoTitle")}</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <Row label={t("account.name")} value={user.name} fallback={t("account.notProvided")} />
              <Row label={t("account.email")} value={user.email} fallback={t("account.notProvided")} />
              <Row label={t("account.phone")} value={user.phone} fallback={t("account.notProvided")} />
            </dl>
            <Link
              href="/account-orders"
              className="mt-5 inline-block text-sm font-semibold text-brand-gold underline underline-offset-4 hover:text-brand-deep"
            >
              {t("account.viewOrders")} →
            </Link>
          </section>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  fallback,
}: {
  label: string;
  value?: string | null;
  fallback: string;
}) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-brand-deep/40">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-brand-deep">{value || fallback}</dd>
    </div>
  );
}
