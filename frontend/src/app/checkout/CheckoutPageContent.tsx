"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { errorMessage } from "@/lib/api";
import { PaymentMethod } from "@/lib/types";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useContent } from "@/lib/content-i18n";
import UsdHint from "@/components/storefront/UsdHint";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPageContent() {
  const mounted = useHasMounted();
  const { t, locale } = useI18n();
  const c = useContent();
  const { items: persistedItems, clearCart } = useCartStore();
  // Cart is persisted to localStorage, invisible to SSR — branching on it
  // before hydration completes would render the wrong view and mismatch.
  const items = mounted ? persistedItems : [];
  const createOrder = useOrderStore((s) => s.createOrder);
  const userRaw = useCustomerAuthStore((s) => s.user);
  const user = mounted ? userRaw : null;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
    paymentMethod: "COD" as PaymentMethod,
  });

  // Điền sẵn từ tài khoản, nhưng nhường lại ngay khi khách tự sửa —
  // dùng giá trị dẫn xuất thay vì đồng bộ vào state trong effect.
  const filled = touched
    ? formData
    : {
        ...formData,
        name: formData.name || user?.name || "",
        phone: formData.phone || user?.phone || "",
        address: formData.address || user?.address || "",
        city: formData.city || user?.city || "",
      };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 500000 || subtotal === 0 ? 0 : 30000;
  const totalPrice = subtotal + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTouched(true);
    setFormData({ ...filled, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setSubmitError(null);

    try {
      // The server re-prices from the database, so only ids and quantities
      // are sent; `totalPrice` below is display-only.
      const order = await createOrder({
        customer: {
          name: filled.name,
          phone: filled.phone,
          address: filled.address,
          city: filled.city,
          note: filled.note || undefined,
        },
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod: filled.paymentMethod,
        userId: user?.id,
      });

      clearCart();

      // COD xong luôn; chuyển khoản cần qua bước quét mã QR.
      if (filled.paymentMethod === "COD") {
        router.push(`/checkout-success?orderId=${order.id}`);
      } else {
        router.push(`/checkout-payment?orderId=${order.id}`);
      }
    } catch (err) {
      setSubmitError(errorMessage(err));
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-4">
        <h1 className="font-serif-brand text-2xl text-zinc-900 mb-4">
          {t("checkout.emptyTitle")}
        </h1>
        <p className="text-zinc-500 text-sm mb-6">{t("checkout.emptyDesc")}</p>
        <Link
          href="/phu-kien"
          className="bg-zinc-900 text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-zinc-800 transition-colors"
        >
          {t("checkout.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif-brand text-3xl text-zinc-900 mb-8 pb-4 border-b border-[#E8E2D9]">
          {t("checkout.title")}
        </h1>

        {/* Khách vãng lai vẫn đặt được — đăng nhập chỉ để tiện theo dõi đơn. */}
        {mounted && !user && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-[#E8E2D9] bg-white p-4 text-sm">
            <span className="text-zinc-600">{t("checkout.loginBanner")}</span>
            <Link
              href="/dang-nhap?next=%2Fcheckout"
              className="shrink-0 border border-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              {t("nav.login")}
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Thông tin giao hàng */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif-brand text-xl text-zinc-900 mb-4">
              {t("checkout.shippingInfo")}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-600 mb-1.5">
                  {t("checkout.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={filled.name}
                  onChange={handleChange}
                  placeholder={t("checkout.namePlaceholder")}
                  className="w-full bg-white border border-[#D8D2C7] px-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-600 mb-1.5">
                    {t("checkout.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={filled.phone}
                    onChange={handleChange}
                    placeholder="0901234567"
                    className="w-full bg-white border border-[#D8D2C7] px-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-600 mb-1.5">
                    {t("checkout.city")}
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={filled.city}
                    onChange={handleChange}
                    placeholder={t("checkout.cityPlaceholder")}
                    className="w-full bg-white border border-[#D8D2C7] px-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-600 mb-1.5">
                  {t("checkout.address")}
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={filled.address}
                  onChange={handleChange}
                  placeholder={t("checkout.addressPlaceholder")}
                  className="w-full bg-white border border-[#D8D2C7] px-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-600 mb-1.5">
                  {t("checkout.note")}
                </label>
                <textarea
                  name="note"
                  rows={3}
                  value={filled.note}
                  onChange={handleChange}
                  placeholder={t("checkout.notePlaceholder")}
                  className="w-full bg-white border border-[#D8D2C7] px-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-zinc-900 resize-none"
                />
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="pt-6 border-t border-[#E8E2D9]">
              <h2 className="font-serif-brand text-xl text-zinc-900 mb-4">
                {t("checkout.paymentMethod")}
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-white border border-[#D8D2C7] cursor-pointer hover:border-zinc-900 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={filled.paymentMethod === "COD"}
                    onChange={handleChange}
                    className="accent-zinc-900"
                  />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{t("checkout.codTitle")}</p>
                    <p className="text-xs text-zinc-500">{t("checkout.codDesc")}</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white border border-[#D8D2C7] cursor-pointer hover:border-zinc-900 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="BANK"
                    checked={filled.paymentMethod === "BANK"}
                    onChange={handleChange}
                    className="accent-zinc-900"
                  />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{t("checkout.bankTitle")}</p>
                    <p className="text-xs text-zinc-500">{t("checkout.bankDesc")}</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="lg:col-span-5 bg-white p-6 border border-[#E8E2D9] h-fit">
            <h2 className="font-serif-brand text-xl text-zinc-900 mb-6 pb-3 border-b border-[#E8E2D9]">
              {t("checkout.summary", { count: items.length })}
            </h2>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6 divide-y divide-[#FAF7F2]">
              {items.map((item, index) => (
                <div
                  key={item.productId || `checkout-item-${index}`}
                  className="pt-4 first:pt-0 flex gap-4 items-center"
                >
                  <div className="relative w-16 h-20 bg-stone-100 shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={c(item.name)}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-zinc-900 truncate">{c(item.name)}</h4>
                    <p className="text-xs text-zinc-600 mt-1">
                      {t("checkout.qty")}: {item.quantity} × {formatPrice(item.price, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8E2D9] text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>{t("checkout.subtotal")}</span>
                <span>
                  {formatPrice(subtotal, locale)}
                  <UsdHint amount={subtotal} className="text-xs" />
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>{t("checkout.shippingFee")}</span>
                <span>
                  {shippingFee === 0 ? t("checkout.free") : formatPrice(shippingFee, locale)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-zinc-900 pt-3 border-t border-[#E8E2D9]">
                <span>{t("checkout.total")}</span>
                <span className="text-right">
                  {formatPrice(totalPrice, locale)}
                  <UsdHint amount={totalPrice} block className="text-xs" />
                </span>
              </div>
            </div>

            {submitError && (
              <div className="mt-6 border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-zinc-900 text-white text-xs uppercase tracking-widest py-4 hover:bg-zinc-800 transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? t("checkout.submitting") : t("checkout.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
