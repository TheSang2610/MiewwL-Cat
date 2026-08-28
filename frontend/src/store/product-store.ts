import { create } from "zustand";
import { api, errorMessage } from "@/lib/api";
import { Product, ProductInput } from "@/lib/types";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: (params?: {
    category?: string;
    q?: string;
    published?: boolean;
  }) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  addProduct: (input: ProductInput) => Promise<Product>;
  updateProduct: (id: string, input: Partial<ProductInput>) => Promise<Product>;
  removeProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const products = await api.products.list(params);
      set({ products, loading: false });
    } catch (err) {
      set({ error: errorMessage(err), loading: false });
    }
  },

  getProduct: (id) => get().products.find((p) => p.id === id),

  addProduct: async (input) => {
    const product = await api.products.create(input);
    set({ products: [product, ...get().products] });
    return product;
  },

  updateProduct: async (id, input) => {
    const product = await api.products.update(id, input);
    set({
      products: get().products.map((p) => (p.id === id ? product : p)),
    });
    return product;
  },

  removeProduct: async (id) => {
    const result = await api.products.remove(id);
    if (result.archived) {
      // Product was kept but hidden because it appears in an order.
      set({
        products: get().products.map((p) =>
          p.id === id ? { ...p, published: false } : p
        ),
      });
    } else {
      set({ products: get().products.filter((p) => p.id !== id) });
    }
  },
}));
