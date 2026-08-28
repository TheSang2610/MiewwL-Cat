import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  ids: string[];
  toggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

/** Danh sách yêu thích, lưu riêng trên trình duyệt của từng khách. */
export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) =>
        set({
          ids: get().ids.includes(productId)
            ? get().ids.filter((id) => id !== productId)
            : [...get().ids, productId],
        }),
      isFavorite: (productId) => get().ids.includes(productId),
    }),
    { name: "pet-shop-favorites" }
  )
);
