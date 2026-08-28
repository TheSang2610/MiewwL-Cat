"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAdminAuthStore } from "@/store/admin-auth-store";

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAdminAuthStore((s) => s.logout);

  return (
    <button
      onClick={() => {
        logout();
        router.push("/admin-login");
      }}
      className="flex w-full items-center gap-2 py-2 text-left text-xs text-rose-300 transition-colors hover:text-rose-200"
    >
      <LogOut className="w-4 h-4" />
      Đăng xuất
    </button>
  );
}
