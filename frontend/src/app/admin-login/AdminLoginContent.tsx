"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { errorMessage } from "@/lib/api";

export default function AdminLoginContent() {
  const router = useRouter();
  const login = useAdminAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      // Nhân viên không mở được trang Tổng quan, đưa thẳng về đơn hàng.
      router.push(user.role === "ADMIN" ? "/admin" : "/admin-orders");
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4 font-montserrat">
      <div className="w-full max-w-md rounded-3xl border border-brand-deep/10 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif-brand text-2xl uppercase tracking-widest text-brand-deep">
            MiewwL Pet<span className="font-sans text-xs font-light tracking-normal text-brand-deep/40"> admin</span>
          </h1>
          <p className="mt-2 text-xs text-brand-deep/50">Vui lòng đăng nhập để tiếp tục</p>
          <p className="mt-1 text-[11px] text-brand-deep/40">
            Dành cho nhân viên và quản trị. Tài khoản khách hàng đăng nhập tại{" "}
            <Link href="/dang-nhap" className="font-semibold text-brand-gold hover:underline">
              trang khách
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-3 text-center text-xs text-rose-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-deep/50">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-deep/50">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-brand-deep/15 p-2.5 text-sm focus:border-brand-deep focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-brand-deep py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-all hover:bg-brand-deep/90 disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
