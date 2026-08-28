import { Role } from "./types";

/**
 * Ai vào được trang quản trị nào.
 *
 * Nguyên tắc chia:
 *  - CUSTOMER: không vào khu /admin, chỉ mua hàng ở phần khách.
 *  - STAFF: việc hằng ngày — đơn hàng và lịch spa. Không sửa được catalogue
 *    (sản phẩm, giống) và không phân quyền được cho ai.
 *  - ADMIN: toàn quyền, gồm cả trang phân quyền tài khoản.
 *
 * LƯU Ý: đây là chốt chặn ở giao diện. API ở cổng 3001 hiện chưa có phiên
 * đăng nhập nên vẫn gọi thẳng được — muốn chặn thật thì phải thêm token/session
 * cho backend.
 */
export const ADMIN_ROLES: Role[] = ["STAFF", "ADMIN"];

/** Trang quản trị và vai trò tối thiểu để mở được. */
export const ADMIN_ROUTES: { href: string; roles: Role[] }[] = [
  { href: "/admin", roles: ["STAFF", "ADMIN"] },
  { href: "/admin-orders", roles: ["STAFF", "ADMIN"] },
  { href: "/admin-spa-bookings", roles: ["STAFF", "ADMIN"] },
  { href: "/admin-products", roles: ["ADMIN"] },
  { href: "/admin-pets", roles: ["ADMIN"] },
  { href: "/admin-supplies", roles: ["ADMIN"] },
  { href: "/admin-product-new", roles: ["ADMIN"] },
  { href: "/admin-product-edit", roles: ["ADMIN"] },
  { href: "/admin-breeds", roles: ["ADMIN"] },
  { href: "/admin-breed-new", roles: ["ADMIN"] },
  { href: "/admin-breed-edit", roles: ["ADMIN"] },
  { href: "/admin-users", roles: ["ADMIN"] },
];

/** Vai trò này có được mở khu quản trị không. */
export function canEnterAdmin(role: Role | undefined | null): boolean {
  return !!role && ADMIN_ROLES.includes(role);
}

/**
 * Vai trò này có mở được đường dẫn đang truy cập không.
 * Trang không nằm trong danh sách (vd /admin-login) coi như mở cho mọi vai
 * trò đã vào được khu quản trị.
 */
export function canAccessRoute(role: Role | undefined | null, pathname: string): boolean {
  if (!canEnterAdmin(role)) return false;
  const route = ADMIN_ROUTES.find((r) => pathname === r.href);
  if (!route) return true;
  return route.roles.includes(role as Role);
}

export const ROLE_LABELS: Record<Role, { label: string; style: string; hint: string }> = {
  CUSTOMER: {
    label: "Khách hàng",
    style: "bg-zinc-100 text-zinc-600",
    hint: "Chỉ mua hàng, không vào được trang quản trị.",
  },
  STAFF: {
    label: "Nhân viên",
    style: "bg-blue-100 text-blue-800",
    hint: "Xử lý đơn hàng và yêu cầu spa. Không sửa sản phẩm, giống hay phân quyền.",
  },
  ADMIN: {
    label: "Quản trị",
    style: "bg-brand-gold/20 text-brand-gold",
    hint: "Toàn quyền, gồm cả phân quyền cho tài khoản khác.",
  },
};
