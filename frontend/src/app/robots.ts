import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Chặn công cụ tìm kiếm lập chỉ mục khu quản trị và các trang riêng tư của
 * khách. Đây là chỉ dẫn cho crawler tử tế, KHÔNG phải cơ chế bảo mật — quyền
 * truy cập thật vẫn do `lib/permissions.ts` và backend kiểm soát.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin-login",
        "/admin-orders",
        "/admin-products",
        "/admin-product-new",
        "/admin-product-edit",
        "/admin-breeds",
        "/admin-breed-new",
        "/admin-breed-edit",
        "/admin-spa-bookings",
        "/admin-users",
        "/account-orders",
        "/tai-khoan",
        "/checkout",
        "/checkout-payment",
        "/checkout-success",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
