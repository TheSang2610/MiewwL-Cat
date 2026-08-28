"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/order-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import {
  ORDER_STATUS_KEY,
  ORDER_STATUS_STYLE,
  paymentStatusBadge,
} from "@/lib/order-labels";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import { useI18n, formatPrice, formatDate } from "@/lib/i18n";
import { useContent } from "@/lib/content-i18n";
import UsdHint from "@/components/storefront/UsdHint";

export default function AccountOrdersContent() {
  const { orders, loading, error, fetchOrders } = useOrderStore();
  const user = useCustomerAuthStore((s) => s.user);
  const ready = useCustomerAuthStore((s) => s.ready);
  const { t, locale } = useI18n();
  const c = useContent();

  useEffect(() => {
    // Chỉ lấy đơn của chính tài khoản này.
    if (user) fetchOrders({ userId: user.id });
  }, [fetchOrders, user]);

  // `ready` bắt đầu là false ở cả server lẫn client nên không lệch hydrate,
  // và tránh chớp màn hình "chưa đăng nhập" khi F5 lúc đang đăng nhập.
  if (!ready) return <LoadingMessage />;

  if (!user) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif-brand mb-3 text-2xl text-zinc-900">
          {t("orders.loginTitle")}
        </h1>
        <p className="mb-6 text-sm text-zinc-500">{t("orders.loginDesc")}</p>
        <div className="flex gap-3">
          <Link
            href="/dang-nhap?next=%2Faccount-orders"
            className="bg-zinc-900 px-8 py-3.5 text-xs uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/dang-ky?next=%2Faccount-orders"
            className="border border-zinc-900 px-8 py-3.5 text-xs uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            {t("nav.register")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif-brand text-3xl text-zinc-900 mb-2">{t("orders.title")}</h1>
      <p className="text-sm text-zinc-500 mb-8">
        {t("orders.greeting")} <strong>{user.name || user.email}</strong>{" "}
        {t("orders.greetingSuffix")}
      </p>

      {loading ? (
        <LoadingMessage label={t("orders.loading")} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchOrders({ userId: user.id })} />
      ) : orders.length === 0 ? (
        <p className="text-zinc-500 font-light text-center py-24">{t("orders.empty")}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const pay = paymentStatusBadge(order.paymentMethod, order.paymentStatus);
            return (
              <div key={order.id} className="bg-white border border-[#E8E2D9] p-5">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-zinc-800">
                    #{order.id.slice(-6).toUpperCase()}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Trạng thái tiền tách riêng — đơn chuyển khoản chưa đối soát
                        thì vẫn còn treo dù trạng thái giao hàng là gì. */}
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${pay.style}`}
                    >
                      {t(pay.key)}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        ORDER_STATUS_STYLE[order.status] || "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {t(ORDER_STATUS_KEY[order.status])}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  {order.customerName} • {order.phone} • {formatDate(order.createdAt, locale)}
                </p>
                <div className="text-xs text-zinc-600 space-y-1 mb-3">
                  {order.items.map((item, i) => (
                    <p key={item.id || i}>
                      {c(item.name)} × {item.quantity}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-zinc-900">
                    {t("orders.total")} {formatPrice(order.totalPrice, locale)}
                    <UsdHint amount={order.totalPrice} />
                  </p>
                  {order.paymentMethod === "BANK" && order.paymentStatus === "UNPAID" && (
                    <Link
                      href={`/checkout-payment?orderId=${order.id}`}
                      className="border border-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
                    >
                      {t("orders.payNow")}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
