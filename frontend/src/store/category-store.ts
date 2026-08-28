import { create } from "zustand";
import { api, errorMessage } from "@/lib/api";
import { Category } from "@/lib/types";

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await api.categories.list();
      set({ categories, loading: false });
    } catch (err) {
      set({ error: errorMessage(err), loading: false });
    }
  },
}));
