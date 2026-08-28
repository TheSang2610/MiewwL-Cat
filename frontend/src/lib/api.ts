import {
  AdminUser,
  Breed,
  ManagedUser,
  Role,
  BreedInput,
  BookingStatus,
  Category,
  Order,
  OrderCustomer,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  ProductInput,
  RegisterInput,
  Species,
  SpaBooking,
  SpaBookingInput,
  Subscriber,
} from "./types";
import { getAuthToken } from "./auth-token";
import { notifySessionExpired } from "./session-events";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/** Error carrying the HTTP status so callers can tell 409 (hết hàng) from 500. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Header xác thực dự phòng khi cookie không tới được (xem `auth-token.ts`). */
function authHeader(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      // Gửi kèm cookie phiên đăng nhập. Cookie chỉ tới nơi khi web và API cùng
      // site; khác site thì trình duyệt bỏ qua và ta dựa vào Bearer bên dưới.
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError(
      "Không kết nối được máy chủ. Kiểm tra backend đã chạy ở cổng 3001 chưa.",
      0
    );
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    // 401 ở giữa phiên nghĩa là phiên đã mất hiệu lực (bị thu hồi, hết hạn).
    // Riêng các route xác thực thì 401 chỉ có nghĩa "sai mật khẩu", không phải
    // phiên hỏng — đừng đăng xuất người đang gõ nhầm mật khẩu.
    if (res.status === 401 && !path.startsWith("/auth/")) {
      notifySessionExpired();
    }
    const message =
      body?.error?.message || `Yêu cầu thất bại (HTTP ${res.status})`;
    throw new ApiError(message, res.status);
  }

  return body.data as T;
}

function query(params: Record<string, string | boolean | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const s = search.toString();
  return s ? `?${s}` : "";
}

/** Hồ sơ người dùng kèm token của phiên vừa mở. */
export type AuthResult = AdminUser & { token: string };

export const api = {
  categories: {
    list: () => request<Category[]>("/categories"),
  },

  products: {
    list: (params: { category?: string; q?: string; published?: boolean } = {}) =>
      request<Product[]>(`/products${query(params)}`),

    get: (id: string) => request<Product>(`/products/${id}`),

    create: (input: ProductInput) =>
      request<Product>("/products", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    update: (id: string, input: Partial<ProductInput>) =>
      request<Product>(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
      }),

    remove: (id: string) =>
      request<{ deleted?: boolean; archived?: boolean }>(`/products/${id}`, {
        method: "DELETE",
      }),
  },

  breeds: {
    list: (params: { species?: Species; published?: boolean } = {}) =>
      request<Breed[]>(`/breeds${query(params)}`),

    get: (idOrSlug: string) => request<Breed>(`/breeds/${idOrSlug}`),

    create: (input: BreedInput) =>
      request<Breed>("/breeds", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    update: (id: string, input: Partial<BreedInput>) =>
      request<Breed>(`/breeds/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
      }),

    remove: (id: string) =>
      request<{ deleted: boolean; id: string }>(`/breeds/${id}`, {
        method: "DELETE",
      }),
  },

  orders: {
    list: (params: { status?: string; userId?: string } = {}) =>
      request<Order[]>(`/orders${query(params)}`),

    get: (id: string) => request<Order>(`/orders/${id}`),

    create: (input: {
      customer: OrderCustomer;
      items: { productId: string; quantity: number }[];
      paymentMethod: PaymentMethod;
      userId?: string;
    }) =>
      request<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    updateStatus: (id: string, status: OrderStatus) =>
      request<Order>(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),

    /** Đổi trạng thái tiền: khách báo đã chuyển, hoặc shop xác nhận đã nhận. */
    updatePaymentStatus: (id: string, paymentStatus: PaymentStatus) =>
      request<Order>(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ paymentStatus }),
      }),
  },

  spaBookings: {
    list: () => request<SpaBooking[]>("/spa-bookings"),

    create: (input: SpaBookingInput) =>
      request<SpaBooking>("/spa-bookings", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    updateStatus: (id: string, status: BookingStatus) =>
      request<SpaBooking>(`/spa-bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },

  users: {
    list: () => request<ManagedUser[]>("/users"),

    /** Quản trị đặt lại mật khẩu giúp khách quên. Trả mật khẩu tạm ĐÚNG MỘT LẦN. */
    resetPassword: (id: string) =>
      request<{ email: string; temporaryPassword: string }>(`/users/${id}/reset-password`, {
        method: "POST",
      }),

    /** Đổi vai trò. Người thực hiện lấy từ token nên không gửi kèm id nữa. */
    updateRole: (id: string, role: Role) =>
      request<ManagedUser>(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      }),
  },

  subscribers: {
    list: () => request<Subscriber[]>("/subscribers"),

    /** `created: false` nghĩa là email đã có sẵn — vẫn coi là thành công. */
    create: (email: string, source = "footer") =>
      request<{ email: string; created: boolean }>("/subscribers", {
        method: "POST",
        body: JSON.stringify({ email, source }),
      }),
  },

  uploads: {
    /**
     * Tải ảnh lên từ trang quản trị. Không đặt `Content-Type` thủ công —
     * trình duyệt phải tự sinh `multipart/form-data; boundary=...`.
     */
    create: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${BASE_URL}/uploads`, {
        method: "POST",
        credentials: "include",
        headers: authHeader(),
        body: form,
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new ApiError(body?.error?.message || `Tải ảnh thất bại (HTTP ${res.status})`, res.status);
      }
      return body.data as { id: string; filename: string; size: number; url: string };
    },

    remove: (id: string) =>
      request<{ deleted: boolean; id: string }>(`/uploads/${id}`, { method: "DELETE" }),
  },

  exchangeRate: {
    /** Tỷ giá VND/USD; `live: false` nghĩa là backend đang dùng số dự phòng. */
    get: () =>
      request<{ rate: number; live: boolean; fetchedAt: number; cached: boolean }>(
        "/exchange-rate"
      ),
  },

  auth: {
    login: (email: string, password: string) =>
      request<AuthResult>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (input: RegisterInput) =>
      request<AuthResult>("/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    /** Hồ sơ của phiên hiện tại; cũng dùng để dò cookie có hoạt động không. */
    me: () => request<AdminUser>("/auth/me"),

    /** Nhờ server xoá cookie HttpOnly — JS trên trang không tự xoá được. */
    logout: () => request<{ loggedOut: boolean }>("/auth/logout", { method: "POST" }),

    /** Đổi mật khẩu cho chính tài khoản đang đăng nhập (id lấy từ token). */
    changePassword: (currentPassword: string, newPassword: string) =>
      request<{ changed: boolean }>("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      }),
  },
};

export function errorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Đã xảy ra lỗi không xác định";
}

/**
 * Kiểm tra cookie phiên có tới được API không.
 *
 * Gọi `/auth/me` mà CỐ TÌNH không gửi header `Authorization`: nếu vẫn 200 thì
 * cookie đang hoạt động, và token trong localStorage là thừa — xoá đi để giảm
 * rủi ro XSS. Nếu 401 thì hai bên khác site, phải giữ token làm dự phòng.
 */
export async function probeCookieAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return res.ok;
  } catch {
    return false;
  }
}
