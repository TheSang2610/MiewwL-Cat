"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useContent } from "@/lib/content-i18n";
import UsdHint from "@/components/storefront/UsdHint";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGE = "/placeholder.svg";

/** Khớp với quy tắc tính phí ship ở trang /checkout. */
const FREE_SHIPPING_FROM = 500_000;

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const c = useContent();
  // Giỏ hàng nằm trong localStorage nên server không thấy — chỉ dựng danh
  // sách sau khi hydrate xong, tránh lệch HTML giữa server và client.
  const mounted = useHasMounted();
  const { items: persisted, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const items = mounted ? persisted : [];

  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = mounted ? getTotalPrice() : 0;
  const missingForFreeShip = FREE_SHIPPING_FROM - subtotal;

  // Đóng bằng phím Esc + khoá cuộn nền khi giỏ đang mở.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const goCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  // Thanh <header> có `transform` + `backdrop-blur` nên nó trở thành khung
  // chứa của mọi phần tử `position: fixed` bên trong — giỏ hàng render tại
  // chỗ sẽ bị cắt cụt theo chiều cao header. Vì vậy phải portal ra body.
  if (!mounted) return null;

  return createPortal(
    // Luôn nằm trong DOM để có hiệu ứng trượt ra/vào; khi đóng thì ẩn hẳn
    // và không chặn thao tác trên trang.
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label={t("cart.closeCart")}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-brand-deep/40 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-brand-cream font-montserrat text-brand-deep shadow-2xl transition-transform duration-300 ease-out sm:rounded-l-3xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand-deep/10 px-5 py-4 md:px-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5" />
            {t("cart.title")}
            {totalQty > 0 && (
              <span className="rounded-full bg-brand-deep px-2 py-0.5 text-xs font-bold text-white">
                {totalQty}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("cart.close")}
            tabIndex={isOpen ? 0 : -1}
            className="rounded-full p-2 text-brand-deep/50 transition-colors hover:bg-brand-deep/5 hover:text-brand-deep"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-pink/25 text-4xl">
                🛒
              </div>
              <p className="mt-4 text-base font-semibold">{t("cart.emptyTitle")}</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-deep/50">
                {t("cart.emptyDesc")}
              </p>
              <Link
                href="/phu-kien"
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className="mt-6 rounded-full bg-brand-deep px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90"
              >
                {t("cart.emptyCta")}
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const atStockCap = item.quantity >= item.stock;
                return (
                  <li
                    key={item.productId}
                    className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
                  >
                    <Link
                      href={`/product-detail?id=${item.productId}`}
                      onClick={onClose}
                      tabIndex={isOpen ? 0 : -1}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-cream"
                    >
                      <Image
                        src={item.image || FALLBACK_IMAGE}
                        alt={c(item.name)}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product-detail?id=${item.productId}`}
                          onClick={onClose}
                          tabIndex={isOpen ? 0 : -1}
                          className="min-w-0"
                        >
                          <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:underline">
                            {c(item.name)}
                          </h3>
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          aria-label={t("cart.remove", { name: c(item.name) })}
                          tabIndex={isOpen ? 0 : -1}
                          className="shrink-0 rounded-lg p-1.5 text-brand-deep/30 transition-colors hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-0.5 text-xs text-brand-deep/45">
                        {formatPrice(item.price, locale)} {t("cart.perUnit")}
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                        <div>
                          <div className="flex items-center rounded-full border border-brand-deep/15 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              aria-label={t("cart.decrease")}
                              tabIndex={isOpen ? 0 : -1}
                              className="rounded-l-full px-2.5 py-1.5 text-brand-deep/60 transition-colors hover:bg-brand-cream hover:text-brand-deep"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[28px] text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={atStockCap}
                              aria-label={t("cart.increase")}
                              tabIndex={isOpen ? 0 : -1}
                              className="rounded-r-full px-2.5 py-1.5 text-brand-deep/60 transition-colors hover:bg-brand-cream hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          {atStockCap && (
                            <p className="mt-1 text-[10px] text-amber-600">
                              {t("cart.onlyLeft", { count: item.stock })}
                            </p>
                          )}
                        </div>

                        <span className="whitespace-nowrap text-right text-sm font-extrabold">
                          {formatPrice(item.price * item.quantity, locale)}
                          <UsdHint
                            amount={item.price * item.quantity}
                            block
                            className="text-[10px]"
                          />
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-brand-deep/10 bg-white px-5 py-4 md:px-6">
            {/* Nhắc mốc miễn phí ship — cùng ngưỡng với trang thanh toán. */}
            <div className="mb-3 flex items-start gap-2 rounded-xl bg-brand-mint/15 px-3 py-2 text-xs leading-relaxed">
              <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-deep/60" />
              {missingForFreeShip > 0 ? (
                <span className="text-brand-deep/70">
                  {t("cart.freeShipHint", {
                    amount: formatPrice(missingForFreeShip, locale),
                  })}
                </span>
              ) : (
                <span className="font-semibold text-emerald-700">
                  {t("cart.freeShipDone")}
                </span>
              )}
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-deep/45">
                {t("cart.subtotal")}
              </span>
              <span className="text-right text-xl font-extrabold">
                {formatPrice(subtotal, locale)}
                <UsdHint amount={subtotal} block className="text-xs" />
              </span>
            </div>

            <button
              type="button"
              onClick={goCheckout}
              tabIndex={isOpen ? 0 : -1}
              className="w-full rounded-full bg-brand-deep py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-deep/90"
            >
              {t("cart.checkout")}
            </button>
            <button
              type="button"
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}
              className="mt-2 w-full py-1.5 text-sm font-medium text-brand-deep/50 transition-colors hover:text-brand-deep"
            >
              {t("cart.continue")}
            </button>
          </div>
        )}
      </aside>
    </div>,
    document.body
  );
}
