"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Phone, Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCustomerAuthStore } from "@/store/customer-auth-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { useI18n } from "@/lib/i18n";
import { Locale } from "@/store/locale-store";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

const HOTLINE_TEL = "tel:0384589559";
const HOTLINE_DISPLAY = "0384.589.559";
const LANGUAGES: Locale[] = ["vi", "en"];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const mounted = useHasMounted();
  const totalItemsRaw = useCartStore((s) => s.getTotalItems());
  // Cart is persisted to localStorage, which SSR can't see — showing the
  // badge before hydration would render "0" then "N" and mismatch React.
  const totalItems = mounted ? totalItemsRaw : 0;

  // Tài khoản khách cũng nằm trong localStorage, phải chờ hydrate xong.
  const userRaw = useCustomerAuthStore((s) => s.user);
  const logout = useCustomerAuthStore((s) => s.logout);
  const user = mounted ? userRaw : null;

  // Admin screens have their own sidebar chrome, and stay Vietnamese.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.cats"), href: "/meo" },
    { name: t("nav.dogs"), href: "/cho" },
    { name: t("nav.supplies"), href: "/phu-kien" },
    { name: t("nav.spa"), href: "/spa" },
  ];

  const langSwitcher = (
    <div className="flex shrink-0 items-center rounded-full border border-brand-deep/15 bg-white/60 text-xs font-semibold">
      {LANGUAGES.map((lang, i) => (
        <span key={lang} className="flex items-center">
          {i > 0 && <span className="select-none text-brand-deep/20">|</span>}
          <button
            type="button"
            onClick={() => setLocale(lang)}
            aria-pressed={locale === lang}
            className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
              locale === lang
                ? "text-brand-deep"
                : "text-brand-deep/35 hover:text-brand-deep/70"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-brand-deep/10 bg-brand-cream/90 transition-transform duration-300 ease-in-out translate-y-0 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
          <span className="font-serif-brand text-xl tracking-wide text-brand-deep md:text-2xl">
            MiewwL Pet
          </span>
          <span className="text-[10px] uppercase tracking-widest text-brand-gold md:text-xs">
            House
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-brand-gold"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Search Button */}
          <button
            type="button"
            aria-label={t("nav.search")}
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center rounded-full p-2 text-brand-deep transition-colors duration-300 ease-in-out hover:text-brand-gold"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          {langSwitcher}

          {/* Phone Hotline Button */}
          <a
            href={HOTLINE_TEL}
            aria-label={t("nav.hotline", { phone: HOTLINE_DISPLAY })}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-deep px-3 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-in-out hover:scale-105 xl:px-4"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden xl:inline">{HOTLINE_DISPLAY}</span>
          </a>

          {/* Account */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href="/tai-khoan"
                title={user.email}
                className="flex max-w-[140px] items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-brand-deep transition-colors hover:text-brand-gold"
              >
                <User className="h-4 w-4 shrink-0" />
                {/* Chỉ còn icon ở khoảng 768–1024px để thanh nav không bị xuống dòng. */}
                <span className="hidden truncate xl:inline">
                  {user.name || t("nav.account")}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                aria-label={t("nav.logout")}
                title={t("nav.logout")}
                className="rounded-full p-2 text-brand-deep/50 transition-colors hover:text-brand-deep"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/dang-nhap"
              aria-label={t("nav.login")}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-sm font-medium text-brand-deep transition-colors hover:text-brand-gold"
            >
              <User className="h-4 w-4 shrink-0" />
              <span className="hidden xl:inline">{t("nav.login")}</span>
            </Link>
          )}

          {/* Cart Button */}
          <button
            type="button"
            aria-label={t("nav.cart")}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center rounded-full p-2 text-brand-deep transition-colors duration-300 ease-in-out hover:text-brand-gold"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-deep text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Actions & Menu Toggle.
            Language switcher lives in the drawer — four controls here overflow
            the bar on a 390px screen. */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Search Button */}
          <button
            type="button"
            aria-label={t("nav.search")}
            onClick={() => setIsSearchOpen(true)}
            className="rounded-2xl border border-brand-deep/20 p-2.5 transition-colors duration-300 ease-in-out hover:bg-brand-deep/5"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Mobile Cart Button */}
          <button
            type="button"
            aria-label={t("nav.cart")}
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-2xl border border-brand-deep/20 p-2.5 transition-colors duration-300 ease-in-out hover:bg-brand-deep/5"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-deep text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-2xl border border-brand-deep/20 p-2.5 transition-colors duration-300 ease-in-out hover:bg-brand-deep/5"
            aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-brand-deep/10 bg-brand-cream px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 transition-colors duration-300 ease-in-out hover:text-brand-gold"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-brand-deep/10 pt-4">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/tai-khoan"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-w-0 items-center gap-2 text-sm font-medium"
                >
                  <User className="h-4 w-4 shrink-0" />
                  <span className="truncate">{user.name || user.email}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-deep/20 px-3 py-1.5 text-xs font-semibold text-brand-deep/70"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/dang-nhap"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-brand-deep/20 py-2.5 text-sm font-semibold"
                >
                  <User className="h-4 w-4" />
                  {t("nav.login")}
                </Link>
                <Link
                  href="/dang-ky"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-1 items-center justify-center rounded-full bg-brand-deep py-2.5 text-sm font-semibold text-white"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-deep/10 pt-4">
            <a
              href={HOTLINE_TEL}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-deep px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" />
              {HOTLINE_DISPLAY}
            </a>

            {langSwitcher}
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
