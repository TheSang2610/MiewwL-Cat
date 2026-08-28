"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const pathname = usePathname();
  const t = useT();

  // Tự động ẩn Footer khi vào bất kỳ route admin nào
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-brand-deep/10 bg-brand-cream px-4 pb-12 pt-16 font-montserrat sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">

        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="flex items-baseline gap-1.5">
            <span className="font-serif-brand text-xl tracking-wide text-brand-deep">MiewwL Pet</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-gold">House</span>
          </h2>
          <p className="text-xs font-light leading-relaxed text-brand-deep/60">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-brand-deep">
            {t("footer.explore")}
          </h3>
          <ul className="space-y-2 text-xs font-light text-brand-deep/60">
            <li><Link href="/#catalog" className="hover:text-brand-deep">{t("footer.available")}</Link></li>
            <li><Link href="/meo" className="hover:text-brand-deep">{t("footer.cats")}</Link></li>
            <li><Link href="/cho" className="hover:text-brand-deep">{t("footer.dogs")}</Link></li>
            <li><Link href="/phu-kien" className="hover:text-brand-deep">{t("footer.supplies")}</Link></li>
            <li><Link href="/spa" className="hover:text-brand-deep">{t("footer.spa")}</Link></li>
            <li><Link href="/blog" className="hover:text-brand-deep">{t("footer.blog")}</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-brand-deep">
            {t("footer.support")}
          </h3>
          <ul className="space-y-2 text-xs font-light text-brand-deep/60">
            <li><Link href="/account-orders" className="hover:text-brand-deep">{t("footer.orders")}</Link></li>
            <li><Link href="/tai-khoan" className="hover:text-brand-deep">{t("account.title")}</Link></li>
            <li><span className="cursor-default">{t("footer.returns")}</span></li>
            <li><span className="cursor-default">{t("footer.shipping")}</span></li>
            <li><a href="tel:0384589559" className="hover:text-brand-deep">{t("footer.contact")}</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-brand-deep">
            {t("footer.newsletter")}
          </h3>
          <p className="mb-3 text-xs font-light text-brand-deep/60">{t("footer.newsletterDesc")}</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-brand-deep/10 pt-6 text-center text-[11px] font-light text-brand-deep/40">
        © {new Date().getFullYear()} MiewwL Pet House. {t("footer.rights")}{" "}
        <Link href="/nguon-anh" className="underline underline-offset-2 hover:text-brand-deep">
          {t("footer.credits")}
        </Link>
      </div>
    </footer>
  );
}
