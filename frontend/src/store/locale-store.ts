import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "vi" | "en";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

/**
 * Ngôn ngữ hiển thị của phần khách hàng (trang admin luôn tiếng Việt).
 * Lưu vào localStorage để khách quay lại vẫn giữ đúng ngôn ngữ đã chọn.
 */
export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: "vi",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "pet-shop-locale" }
  )
);
