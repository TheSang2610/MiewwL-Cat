"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { canAccessRoute, canEnterAdmin, ROLE_LABELS } from "@/lib/permissions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAdminAuthStore((s) => s.user);
  const ready = useAdminAuthStore((s) => s.ready);
  const logout = useAdminAuthStore((s) => s.logout);
  const pathname = usePathname();
  const router = useRouter();

  // Kiểm cả vai trò chứ không chỉ "có phiên đăng nhập": phiên nằm trong
  // localStorage nên có thể bị sửa tay, và tài khoản cũng có thể bị hạ quyền
  // sau khi đã đăng nhập.
  const allowedInAdmin = canEnterAdmin(user?.role);

  useEffect(() => {
    // Wait for persist to rehydrate, otherwise a refresh bounces to login.
    if (!ready) return;
    if (!user || !allowedInAdmin) {
      if (user) logout();
      router.replace("/admin-login");
    }
  }, [ready, user, allowedInAdmin, logout, router]);

  if (!ready || !user || !allowedInAdmin) {
    return null;
  }

  const allowedHere = canAccessRoute(user.role, pathname ?? "");

  return (
    <div className="flex min-h-screen bg-brand-cream font-montserrat text-brand-deep">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {allowedHere ? (
          children
        ) : (
          // Nhân viên gõ thẳng đường dẫn của trang dành cho quản trị.
          <div className="mx-auto max-w-md py-24 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold text-brand-deep">
              Bạn không có quyền vào trang này
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-brand-deep/60">
              Tài khoản của bạn đang ở vai trò{" "}
              <strong className="text-brand-deep">{ROLE_LABELS[user.role].label}</strong>.{" "}
              {ROLE_LABELS[user.role].hint}
            </p>
            <Link
              href="/admin-orders"
              className="mt-6 inline-block rounded-full bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep/90"
            >
              Về trang đơn hàng
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
