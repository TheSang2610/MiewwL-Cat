"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  PackagePlus,
  ShoppingCart,
  PawPrint,
  Sparkles,
  Users,
  LucideIcon,
} from "lucide-react";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { canAccessRoute, ROLE_LABELS } from "@/lib/permissions";
import LogoutButton from "./LogoutButton";

const NAV_ITEMS: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { name: "Sản phẩm", href: "/admin-products", icon: ShoppingBag },
  { name: "Thêm sản phẩm", href: "/admin-product-new", icon: PackagePlus },
  { name: "Giống", href: "/admin-breeds", icon: PawPrint },
  { name: "Đơn hàng", href: "/admin-orders", icon: ShoppingCart },
  { name: "Yêu cầu Spa", href: "/admin-spa-bookings", icon: Sparkles },
  { name: "Tài khoản", href: "/admin-users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const user = useAdminAuthStore((s) => s.user);

  // Chỉ hiện những mục vai trò hiện tại mở được — nhân viên không thấy
  // các trang họ không vào được.
  const navItems = NAV_ITEMS.filter((item) => canAccessRoute(user?.role, item.href));
  const roleInfo = user ? ROLE_LABELS[user.role] : null;

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col justify-between border-r border-white/5 bg-brand-deep p-6 font-montserrat text-white">
      <div>
        <div className="mb-6">
          <h1 className="font-serif-brand text-xl font-bold tracking-wider">MiewwL Pet Admin</h1>
          <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">
            Quản lý cửa hàng
          </p>
        </div>

        {user && roleInfo && (
          <div className="mb-6 rounded-xl bg-white/5 px-3 py-2.5">
            <p className="truncate text-xs font-medium text-white/80">
              {user.name || user.email}
            </p>
            <p className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-gold">
              {roleInfo.label}
            </p>
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-brand-gold"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <LogoutButton />
    </aside>
  );
}
