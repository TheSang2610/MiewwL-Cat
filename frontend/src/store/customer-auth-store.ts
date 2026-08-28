import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, probeCookieAuth } from "@/lib/api";
import { AuthUser, RegisterInput } from "@/lib/types";
import { setAuthToken, clearAuthToken } from "@/lib/auth-token";

/**
 * Sau khi đăng nhập: giữ token làm dự phòng, rồi hỏi server xem cookie có tới
 * nơi không. Cookie chạy thì bỏ token khỏi localStorage — đó là mục tiêu.
 */
async function keepOnlyCookieIfPossible(token: string) {
  setAuthToken(token);
  if (await probeCookieAuth()) clearAuthToken();
}


interface CustomerAuthStore {
  user: AuthUser | null;
  /** False cho tới khi persist khôi phục xong từ localStorage — tránh
   *  các trang cần đăng nhập đá khách ra ngoài ngay khi F5. */
  ready: boolean;
  setReady: () => void;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => void;
}

export const useCustomerAuthStore = create<CustomerAuthStore>()(
  persist(
    (set) => ({
      user: null,
      ready: false,
      setReady: () => set({ ready: true }),

      login: async (email, password) => {
        const { token, ...user } = await api.auth.login(email, password);
        await keepOnlyCookieIfPossible(token);
        set({ user });
        return user;
      },

      register: async (input) => {
        const { token, ...user } = await api.auth.register(input);
        await keepOnlyCookieIfPossible(token);
        set({ user });
        return user;
      },

      logout: () => {
        clearAuthToken();
        void api.auth.logout().catch(() => {});
        set({ user: null });
      },
    }),
    {
      // Khoá riêng, không dùng chung với phiên admin.
      name: "pet-shop-customer-auth",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => state?.setReady(),
    }
  )
);
