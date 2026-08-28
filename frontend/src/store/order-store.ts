import { create } from "zustand";
import { api, errorMessage } from "@/lib/api";
import {
  Order,
  OrderCustomer,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/lib/types";

interface OrderStore {
  orders: Order[];
  loading: boolean;
  error: string | null;

  fetchOrders: (params?: { status?: string; userId?: string }) => Promise<void>;
  fetchOrder: (id: string) => Promise<Order>;
  getOrder: (id: string) => Order | undefined;
  createOrder: (data: {
    customer: OrderCustomer;
    items: { productId: string; quantity: number }[];
    paymentMethod: PaymentMethod;
    userId?: string;
  }) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  updatePaymentStatus: (id: string, paymentStatus: PaymentStatus) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const orders = await api.orders.list(params);
      set({ orders, loading: false });
    } catch (err) {
      set({ error: errorMessage(err), loading: false });
    }
  },

  fetchOrder: async (id) => {
    const order = await api.orders.get(id);
    const known = get().orders.some((o) => o.id === order.id);
    set({
      orders: known
        ? get().orders.map((o) => (o.id === order.id ? order : o))
        : [order, ...get().orders],
    });
    return order;
  },

  getOrder: (id) => get().orders.find((o) => o.id === id),

  createOrder: async (data) => {
    const order = await api.orders.create(data);
    set({ orders: [order, ...get().orders] });
    return order;
  },

  updateOrderStatus: async (id, status) => {
    const order = await api.orders.updateStatus(id, status);
    set({ orders: get().orders.map((o) => (o.id === id ? order : o)) });
  },

  updatePaymentStatus: async (id, paymentStatus) => {
    // Server có thể tự đẩy `status` sang PROCESSING khi tiền vào, nên ghi đè
    // cả đơn bằng bản trả về thay vì chỉ sửa mỗi `paymentStatus` tại chỗ.
    const order = await api.orders.updatePaymentStatus(id, paymentStatus);
    set({ orders: get().orders.map((o) => (o.id === id ? order : o)) });
  },
}));
