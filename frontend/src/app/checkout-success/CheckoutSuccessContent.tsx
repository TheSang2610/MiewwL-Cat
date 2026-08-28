"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Clock, CreditCard } from "lucide-react";
import { api } from "@/lib/api";
import { Order } from "@/lib/types";
import { useI18n, formatPrice, MessageKey } from "@/lib/i18n";
import UsdHint from "@/components/storefront/UsdHint";

type View = {
  tone: "success" | "waiting";
  icon: typeof Check;
  titleKey: MessageKey;
  bodyKey: MessageKey;
};

/**
 * Đơn chuyển khoản CHƯA phải là đơn thành công — tiền phải vào tài khoản
 * ngân hàng và shop đối soát xong thì mới tính. Trang này nói đúng trạng
 * thái thật của đơn thay vì luôn báo "thành công".
 */
function viewFor(order: Order | null): View {
  if (!order) {
    return {
      tone: "success",
      icon: Check,
      titleKey: "success.receivedTitle",
      bodyKey: "success.receivedDesc",
    };
  }

  if (order.paymentMethod === "COD") {
    return {
      tone: "success",
      icon: Check,
      titleKey: "success.codTitle",
      bodyKey: "success.codDesc",
    };
  }

  if (order.paymentStatus === "PAID") {
    return {
      tone: "success",
      icon: Check,
      titleKey: "success.paidTitle",
      bodyKey: "success.paidDesc",
    };
  }

  if (order.paymentStatus === "PENDING_CONFIRM") {
    return {
      tone: "waiting",
      icon: Clock,
      titleKey: "success.waitingTitle",
      bodyKey: "success.waitingDesc",
    };
  }

  return {
    tone: "waiting",
    icon: CreditCard,
    titleKey: "success.unpaidTitle",
    bodyKey: "success.unpaidDesc",
  };
}

function CheckoutSuccessBody() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const [order, setOrder] = useState<Order | null>(null);
  const { t, locale } = useI18n();

  useEffect(() => {
    if (!orderId) return;
    // Best-effort: the confirmation still reads fine without the order code.
    api.orders.get(orderId).then(setOrder).catch(() => setOrder(null));
  }, [orderId]);

  const view = viewFor(order);
  const Icon = view.icon;
  const success = view.tone === "success";
  const needsPayment =
    order?.paymentMethod === "BANK" && order.paymentStatus === "UNPAID";

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-4 py-12 text-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
          success ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
        }`}
      >
        <Icon className="w-8 h-8" />
      </div>

      <h1 className="font-serif-brand text-3xl text-zinc-900 mb-3">{t(view.titleKey)}</h1>
      <p className="text-zinc-600 text-sm max-w-md mb-2 leading-relaxed">{t(view.bodyKey)}</p>

      {order && (
        <p className="text-zinc-500 text-xs mb-2">
          {t("success.orderCode")}{" "}
          <span className="font-mono font-semibold">#{order.id.slice(-6).toUpperCase()}</span>
          {" · "}
          {formatPrice(order.totalPrice, locale)}
          <UsdHint amount={order.totalPrice} />
        </p>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {needsPayment && (
          <Link
            href={`/checkout-payment?orderId=${order.id}`}
            className="bg-zinc-900 text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-zinc-800 transition-colors"
          >
            {t("success.payNow")}
          </Link>
        )}
        <Link
          href="/account-orders"
          className={`text-xs uppercase tracking-widest px-8 py-3.5 transition-colors ${
            needsPayment
              ? "border border-zinc-300 text-zinc-800 hover:border-zinc-900"
              : "bg-zinc-900 text-white hover:bg-zinc-800"
          }`}
        >
          {t("success.viewOrders")}
        </Link>
        <Link
          href="/phu-kien"
          className="border border-zinc-300 text-zinc-800 text-xs uppercase tracking-widest px-8 py-3.5 hover:border-zinc-900 transition-colors"
        >
          {t("success.keepShopping")}
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessContent() {
  return (
    <Suspense>
      <CheckoutSuccessBody />
    </Suspense>
  );
}
