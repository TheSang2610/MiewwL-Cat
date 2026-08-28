import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, probeCookieAuth } from "@/lib/api";
import { AdminUser } from "@/lib/types";
import { canEnterAdmin } from "@/lib/permissions";
import { setAuthToken, clearAuthToken } from "@/lib/auth-token";

/**
 * Sau khi đăng nhập: giữ token làm dự phòng, rồi hỏi server xem cookie có tới
 * nơi không. Cookie chạy thì bỏ token khỏi localStorage — đó là mục tiêu.
 */
async function keepOnlyCookieIfPossible(token: string) {
  setAuthToken(token);
  if (await probeCookieAuth()) clearAuthToken();
}


interface AdminAuthStore {
  user: AdminUser | null;
  /** False until persist has restored from localStorage, so the admin
   *  layout doesn't bounce a logged-in user to the login page on refresh. */
  ready: boolean;
  setReady: () => void;
  login: (email: string, password: string) => Promise<AdminUser>;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      user: null,
      ready: false,
      setReady: () => set({ ready: true }),

      login: async (email, password) => {
        const { token, ...user } = await api.auth.login(email, password);
        // Tài khoản khách hàng đăng nhập ở đây thì bị từ chối ngay: không lưu
        // phiên quản trị, và cũng không giữ lại token.
        if (!canEnterAdmin(user.role)) {
          throw new Error(
            "Tài khoản khách hàng không vào được trang quản trị. Hãy đăng nhập ở trang khách."
          );
        }
        await keepOnlyCookieIfPossible(token);
        set({ user });
        return user;
      },

      logout: () => {
        clearAuthToken();
        // Cookie HttpOnly chỉ server xoá được; lỗi mạng thì cũng không chặn
        // việc đăng xuất ở phía giao diện.
        void api.auth.logout().catch(() => {});
        set({ user: null });
      },
    }),
    {
      name: "pet-shop-admin-auth",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => state?.setReady(),
    }
  )
);
