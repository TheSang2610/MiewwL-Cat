import { MessageKey } from "./messages";
import { OrderStatus, PaymentMethod, PaymentStatus } from "./types";

/**
 * Màu badge dùng chung cho cả trang khách lẫn trang admin.
 * Chữ hiển thị thì tách làm hai: khu quản trị luôn tiếng Việt (các map
 * `*_LABELS` bên dưới), còn phần khách đi qua `*_KEY` để dịch theo ngôn ngữ
 * đang chọn.
 */
export const ORDER_STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-rose-100 text-rose-800",
};

export const ORDER_STATUS_KEY: Record<OrderStatus, MessageKey> = {
  PENDING: "orderStatus.PENDING",
  PROCESSING: "orderStatus.PROCESSING",
  SHIPPED: "orderStatus.SHIPPED",
  DELIVERED: "orderStatus.DELIVERED",
  CANCELLED: "orderStatus.CANCELLED",
};

/** Nhãn tiếng Việt cho khu quản trị. */
export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; style: string }> = {
  PENDING: { label: "Chờ xử lý", style: ORDER_STATUS_STYLE.PENDING },
  PROCESSING: { label: "Đang đóng gói", style: ORDER_STATUS_STYLE.PROCESSING },
  SHIPPED: { label: "Đang giao", style: ORDER_STATUS_STYLE.SHIPPED },
  DELIVERED: { label: "Đã giao", style: ORDER_STATUS_STYLE.DELIVERED },
  CANCELLED: { label: "Đã hủy", style: ORDER_STATUS_STYLE.CANCELLED },
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, { label: string; style: string }> = {
  COD: { label: "COD", style: "bg-brand-deep/10 text-brand-deep/70" },
  BANK: { label: "Chuyển khoản", style: "bg-blue-100 text-blue-800" },
};

const PAYMENT_STATUS_STYLE: Record<PaymentStatus, string> = {
  UNPAID: "bg-zinc-100 text-zinc-600",
  PENDING_CONFIRM: "bg-amber-100 text-amber-800",
  PAID: "bg-emerald-100 text-emerald-800",
};

const COD_UNPAID_STYLE = "bg-zinc-100 text-zinc-600";

/**
 * Nhãn tiền theo cách thanh toán: đơn COD chưa trả là chuyện bình thường
 * (thu khi giao), còn đơn chuyển khoản chưa trả thì đang thực sự treo.
 */
export function paymentStatusLabel(
  method: PaymentMethod,
  status: PaymentStatus
): { label: string; style: string } {
  if (method === "COD" && status === "UNPAID") {
    return { label: "Thu khi giao", style: COD_UNPAID_STYLE };
  }
  const labels: Record<PaymentStatus, string> = {
    UNPAID: "Chưa thanh toán",
    PENDING_CONFIRM: "Chờ đối soát",
    PAID: "Đã nhận tiền",
  };
  return { label: labels[status] ?? labels.UNPAID, style: PAYMENT_STATUS_STYLE[status] };
}

/** Bản dịch được cho trang khách — trả về khoá chữ thay vì chữ cứng. */
export function paymentStatusBadge(
  method: PaymentMethod,
  status: PaymentStatus
): { key: MessageKey; style: string } {
  if (method === "COD" && status === "UNPAID") {
    return { key: "paymentStatus.cod", style: COD_UNPAID_STYLE };
  }
  const keys: Record<PaymentStatus, MessageKey> = {
    UNPAID: "paymentStatus.UNPAID",
    PENDING_CONFIRM: "paymentStatus.PENDING_CONFIRM",
    PAID: "paymentStatus.PAID",
  };
  return { key: keys[status] ?? keys.UNPAID, style: PAYMENT_STATUS_STYLE[status] };
}
