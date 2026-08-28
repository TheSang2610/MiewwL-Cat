"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, Check, Clock, ShieldCheck } from "lucide-react";
import { api, errorMessage } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { PaymentStatus } from "@/lib/types";
import { useI18n, formatPrice, Translate } from "@/lib/i18n";
import UsdHint from "@/components/storefront/UsdHint";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import { BANK, bankQrUrl, isBankConfigured, transferNote } from "@/lib/payment-config";

function CopyRow({ label, value, t }: { label: string; value: string; t: Translate }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Trình duyệt chặn clipboard (thường do không phải HTTPS) — khách vẫn
      // đọc và gõ tay được, nên chỉ bỏ qua thay vì báo lỗi.
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-brand-deep/5 py-2.5 last:border-b-0">
      <span className="shrink-0 text-xs text-brand-deep/50">{label}</span>
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate font-mono text-sm font-semibold text-brand-deep">{value}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={t("payment.copy", { label })}
          className="shrink-0 rounded-lg p-1.5 text-brand-deep/40 transition-colors hover:bg-brand-cream hover:text-brand-deep"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const { t, locale } = useI18n();

  const {
    data: order,
    loading,
    error,
    reload,
  } = useAsync(() => {
    if (!orderId) throw new Error("missing-id");
    return api.orders.get(orderId);
  }, [orderId]);

  // Sau khi khách báo đã chuyển, dùng giá trị này thay vì tải lại cả đơn.
  const [reported, setReported] = useState<PaymentStatus | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  if (loading) return <LoadingMessage label={t("payment.loading")} />;

  if (error || !order) {
    const message =
      error === "missing-id" ? t("payment.missingId") : error || t("payment.notFound");
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ErrorMessage message={message} onRetry={reload} />
        <Link href="/phu-kien" className="text-sm text-brand-deep underline">
          {t("payment.backToShop")}
        </Link>
      </div>
    );
  }

  const payStatus = reported ?? order.paymentStatus;
  const note = transferNote(order.id);

  const reportPaid = async () => {
    setSending(true);
    setSendError(null);
    try {
      // Chỉ là "khách báo đã chuyển" — đơn chỉ thành công khi shop đối soát
      // thấy tiền vào tài khoản và bấm xác nhận trong trang quản trị.
      await api.orders.updatePaymentStatus(order.id, "PENDING_CONFIRM");
      setReported("PENDING_CONFIRM");
      router.push(`/checkout-success?orderId=${order.id}`);
    } catch (err) {
      setSendError(errorMessage(err));
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream px-4 py-12 font-montserrat text-brand-deep">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-brand-deep">{t("payment.title")}</h1>
            <p className="mt-1 text-sm text-brand-deep/50">
              {t("payment.orderLine", { code: order.id.slice(-6).toUpperCase() })}{" "}
              <strong className="text-brand-deep">
                {formatPrice(order.totalPrice, locale)}
              </strong>
              <UsdHint amount={order.totalPrice} />
            </p>
          </div>

          {payStatus === "PAID" ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600" />
              <p className="mt-2 text-base font-bold text-emerald-800">
                {t("payment.paidTitle")}
              </p>
              <p className="mt-1 text-sm text-emerald-700/80">{t("payment.paidDesc")}</p>
            </div>
          ) : payStatus === "PENDING_CONFIRM" ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
              <Clock className="mx-auto h-8 w-8 text-amber-600" />
              <p className="mt-2 text-base font-bold text-amber-800">
                {t("payment.waitingTitle")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-700/80">
                {t("payment.waitingDesc")}
              </p>
            </div>
          ) : !isBankConfigured ? (
            // Thiếu biến môi trường ngân hàng. Thà nói thẳng còn hơn hiện mã QR
            // hỏng hoặc số tài khoản rỗng cho khách chuyển tiền vào.
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center">
              <Clock className="mx-auto h-8 w-8 text-rose-500" />
              <p className="mt-2 text-base font-bold text-rose-800">
                {t("payment.notConfiguredTitle")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-rose-700/80">
                {t("payment.notConfiguredDesc")}
              </p>
            </div>
          ) : (
            <>
              <div className="mt-6 flex justify-center">
                {BANK.staticQrImage ? (
                  <Image
                    src={BANK.staticQrImage}
                    alt={t("payment.qrAlt")}
                    width={280}
                    height={280}
                    className="rounded-2xl border border-brand-deep/10"
                  />
                ) : (
                  // VietQR đã nhúng sẵn số tiền + nội dung nên khách không cần gõ tay.
                  <Image
                    src={bankQrUrl(order.totalPrice, note)}
                    alt={t("payment.qrAlt")}
                    width={280}
                    height={280}
                    unoptimized
                    className="rounded-2xl border border-brand-deep/10"
                  />
                )}
              </div>
              <p className="mt-3 text-center text-xs text-brand-deep/50">
                {BANK.staticQrImage
                  ? t("payment.qrHintStatic")
                  : t("payment.qrHintDynamic")}
              </p>
            </>
          )}

          <div className="mt-4 rounded-2xl bg-brand-cream/60 px-4 py-1">
            {isBankConfigured && (
              <>
                <CopyRow label={t("payment.bank")} value={BANK.name} t={t} />
                <CopyRow label={t("payment.accountNo")} value={BANK.accountNo} t={t} />
                <CopyRow label={t("payment.accountName")} value={BANK.accountName} t={t} />
              </>
            )}
            <CopyRow
              label={t("payment.amount")}
              value={String(Math.round(order.totalPrice))}
              t={t}
            />
            <CopyRow label={t("payment.transferNote")} value={note} t={t} />
          </div>

          {/* Chỉ hiện khi đang xem bằng tiếng Anh: nói rõ con số USD bên trên
              chỉ là quy đổi tham khảo, tiền chuyển thật vẫn là VNĐ. */}
          {locale === "en" && (
            <p className="mt-3 rounded-xl bg-brand-cream/60 p-3 text-xs leading-relaxed text-brand-deep/55">
              {t("payment.vndOnly")}
            </p>
          )}

          {payStatus === "UNPAID" && (
            <>
              <p className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-xs leading-relaxed text-yellow-800">
                <strong className="font-semibold">{t("payment.notePrefix")}</strong>
                {t("payment.noteBody", { note })}
              </p>

              {sendError && (
                <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                  {sendError}
                </p>
              )}

              <button
                type="button"
                onClick={reportPaid}
                disabled={sending}
                className="mt-5 block w-full rounded-full bg-brand-deep py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-brand-deep/90 disabled:opacity-50"
              >
                {sending ? t("payment.sending") : t("payment.reportPaid")}
              </button>
            </>
          )}

          <Link
            href="/account-orders"
            className={`block w-full text-center text-sm font-medium ${
              payStatus === "UNPAID"
                ? "mt-3 text-brand-deep/50 hover:text-brand-deep"
                : "mt-5 rounded-full bg-brand-deep py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-deep/90"
            }`}
          >
            {t("payment.viewOrders")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPageContent() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
