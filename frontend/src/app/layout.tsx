import type { Metadata } from "next";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import LocaleHtmlLang from "@/components/storefront/LocaleHtmlLang";
import SessionWatcher from "@/components/storefront/SessionWatcher";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Metadata mặc định cho cả site.
 *
 * `title.template` giúp mỗi trang chỉ cần khai tên riêng, phần " | MiewwL Pet
 * House" được ghép tự động. `metadataBase` để các URL tương đối (ảnh Open
 * Graph, canonical) nở thành URL tuyệt đối khi deploy.
 *
 * Lưu ý: metadata do server dựng nên nó luôn là tiếng Việt, kể cả khi khách
 * đang xem site bằng tiếng Anh — server không đọc được lựa chọn ngôn ngữ nằm
 * trong localStorage của trình duyệt.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Cửa hàng thú cưng`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Mèo và chó thuần chủng có hồ sơ sức khoẻ rõ ràng, đồ dùng phụ kiện và dịch vụ spa — giao an toàn toàn quốc.",
  applicationName: SITE_NAME,
  keywords: [
    "thú cưng",
    "mèo thuần chủng",
    "chó thuần chủng",
    "phụ kiện thú cưng",
    "spa thú cưng",
    "MiewwL Pet House",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "vi_VN",
    url: SITE_URL,
    title: `${SITE_NAME} | Cửa hàng thú cưng`,
    description:
      "Mèo và chó thuần chủng có hồ sơ sức khoẻ rõ ràng, đồ dùng phụ kiện và dịch vụ spa.",
    images: [{ url: "/breeds/scottish-fold-1.jpg", width: 1200, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Cửa hàng thú cưng`,
    description: "Mèo và chó thuần chủng, phụ kiện và dịch vụ spa cho thú cưng.",
    images: ["/breeds/scottish-fold-1.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `lang` khởi đầu là "vi" giống HTML server dựng ra; LocaleHtmlLang đổi
    // lại sau khi hydrate nếu khách đang chọn tiếng Anh.
    <html lang="vi">
      <body className="bg-[#FAF7F2] text-zinc-900 antialiased flex flex-col min-h-screen">
        <LocaleHtmlLang />
        <SessionWatcher />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
