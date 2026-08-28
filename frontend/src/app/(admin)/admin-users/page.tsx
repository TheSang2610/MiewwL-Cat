"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { api, errorMessage } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { ManagedUser, Role } from "@/lib/types";
import { ROLE_LABELS } from "@/lib/permissions";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import { matchesSearch } from "@/lib/text";

const ROLE_ORDER: Role[] = ["ADMIN", "STAFF", "CUSTOMER"];

export default function AdminUsersPage() {
  const me = useAdminAuthStore((s) => s.user);
  const [savingId, setSavingId] = useState<string | null>(null);
  /** Mật khẩu tạm vừa cấp; chỉ hiện một lần cho quản trị đọc cho khách. */
  const [tempPassword, setTempPassword] = useState<{ email: string; password: string } | null>(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const { data, loading, error, reload } = useAsync(() => api.users.list(), []);
  const users = data ?? [];

  const resetPassword = async (user: ManagedUser) => {
    if (
      !confirm(
        `Đặt lại mật khẩu cho ${user.email}?\n\n` +
          "Mật khẩu cũ hết hiệu lực ngay và mọi thiết bị đang đăng nhập bị đăng xuất.\n" +
          "Chỉ làm việc này sau khi đã xác minh đúng là chủ tài khoản."
      )
    ) {
      return;
    }

    setSavingId(user.id);
    try {
      const result = await api.users.resetPassword(user.id);
      setTempPassword({ email: result.email, password: result.temporaryPassword });
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setSavingId(null);
    }
  };

  const changeRole = async (user: ManagedUser, next: Role) => {
    if (!me) return;
    if (
      !confirm(
        `Đổi vai trò của ${user.email} thành "${ROLE_LABELS[next].label}"?\n\n${ROLE_LABELS[next].hint}`
      )
    ) {
      return;
    }

    setSavingId(user.id);
    try {
      await api.users.updateRole(user.id, next);
      // Tải lại cả danh sách: backend có thể từ chối một phần (ví dụ chặn
      // hạ quyền admin cuối cùng) nên lấy lại trạng thái thật cho chắc.
      reload();
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setSavingId(null);
    }
  };

  const visible = users.filter(
    (u) =>
      (!role || u.role === role) && matchesSearch(search, u.name ?? "", u.email, u.phone ?? "")
  );

  const passwordBanner = tempPassword && (
    <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 p-4">
      <p className="text-sm font-bold text-amber-900">
        Mật khẩu tạm cho {tempPassword.email}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
        Đọc cho khách qua điện thoại rồi nhắc khách vào trang Tài khoản đổi lại ngay.
        Chuỗi này <strong>chỉ hiện một lần</strong> — đóng đi là không xem lại được.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <code className="select-all rounded-lg border border-amber-300 bg-white px-3 py-2 font-mono text-base font-bold tracking-wider text-amber-900">
          {tempPassword.password}
        </code>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(tempPassword.password)}
          className="rounded-lg border border-amber-400 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100"
        >
          Sao chép
        </button>
        <button
          type="button"
          onClick={() => setTempPassword(null)}
          className="rounded-lg px-3 py-2 text-xs font-semibold text-amber-900/70 hover:bg-amber-100"
        >
          Đóng
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {passwordBanner}
      <div>
        <h1 className="text-2xl font-bold text-brand-deep">Tài khoản & phân quyền</h1>
        <p className="text-sm text-brand-deep/50">
          Quyết định tài khoản nào là khách, nhân viên hay quản trị.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {ROLE_ORDER.map((r) => (
          <div
            key={r}
            className="rounded-2xl border border-brand-deep/10 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${ROLE_LABELS[r].style}`}
              >
                {ROLE_LABELS[r].label}
              </span>
              <span className="text-lg font-bold text-brand-deep">
                {users.filter((u) => u.role === r).length}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-brand-deep/50">
              {ROLE_LABELS[r].hint}
            </p>
          </div>
        ))}
      </div>

      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm theo tên, email, số điện thoại..."
        filters={[
          {
            label: "Vai trò",
            value: role,
            onChange: setRole,
            options: ROLE_ORDER.map((r) => ({ value: r, label: ROLE_LABELS[r].label })),
          },
        ]}
        total={users.length}
        shown={visible.length}
      />

      {loading ? (
        <LoadingMessage label="Đang tải tài khoản..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-brand-deep/10 bg-brand-cream/60 text-xs font-semibold uppercase text-brand-deep/50">
                  <th className="p-4">Họ tên</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4">Vai trò</th>
                  <th className="p-4">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-deep/5">
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-xs text-brand-deep/40">
                      Không có tài khoản nào khớp bộ lọc.
                    </td>
                  </tr>
                ) : (
                  visible.map((user) => {
                    const isMe = user.id === me?.id;
                    return (
                      <tr key={user.id} className="hover:bg-brand-cream/30">
                        <td className="p-4 font-medium text-brand-deep">
                          <span className="flex items-center gap-2">
                            {user.name || "—"}
                            {isMe && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-brand-deep/5 px-2 py-0.5 text-[10px] font-semibold text-brand-deep/60">
                                <ShieldCheck className="h-3 w-3" />
                                Bạn
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="p-4 text-brand-deep/70">{user.email}</td>
                        <td className="p-4 text-brand-deep/50">{user.phone || "—"}</td>
                        <td className="p-4 text-xs text-brand-deep/50">
                          {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="p-4">
                          {isMe ? (
                            // Tự hạ quyền chính mình sẽ khoá mình ra ngoài ngay
                            // lập tức — backend cũng chặn, đây chỉ là lớp UI.
                            <span
                              title="Không thể tự đổi vai trò của chính mình"
                              className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase ${ROLE_LABELS[user.role].style}`}
                            >
                              {ROLE_LABELS[user.role].label}
                            </span>
                          ) : (
                            <select
                              value={user.role}
                              disabled={savingId === user.id}
                              onChange={(e) => changeRole(user, e.target.value as Role)}
                              className={`cursor-pointer rounded border border-transparent px-2.5 py-1 text-[11px] font-medium focus:border-zinc-400 focus:outline-none disabled:opacity-50 ${ROLE_LABELS[user.role].style}`}
                            >
                              {ROLE_ORDER.map((r) => (
                                <option key={r} value={r}>
                                  {ROLE_LABELS[r].label}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="p-4">
                          {!isMe && (
                            <button
                              type="button"
                              onClick={() => resetPassword(user)}
                              disabled={savingId === user.id}
                              className="rounded-lg border border-brand-deep/20 px-2.5 py-1 text-[11px] font-medium text-brand-deep transition-colors hover:bg-brand-cream disabled:opacity-50"
                            >
                              Đặt lại mật khẩu
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
