import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.productId === newItem.productId
        );

        if (existingItem) {
          const updatedQuantity = Math.min(
            existingItem.quantity + newItem.quantity,
            newItem.stock
          );
          set({
            items: currentItems.map((item) =>
              item.productId === newItem.productId
                ? { ...item, quantity: updatedQuantity }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      // v2: product ids are now MongoDB ObjectIds from the API, so carts
      // saved against the old mock ids ("p1", "p2"...) must not be restored.
      name: "pet-shop-cart-v2",
    }
  )
);
