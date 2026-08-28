"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/store/order-store";
import { PAYMENT_METHOD_LABELS } from "@/lib/order-labels";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import OrderStatusSelect from "./OrderStatusSelect";
import PaymentCell from "./PaymentCell";

export default function AdminOrdersPage() {
  const { orders, loading, error, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-deep">Quản lý đơn hàng</h1>
        <p className="text-sm text-brand-deep/50">
          Đơn chuyển khoản chỉ xử lý tiếp được sau khi bấm{" "}
          <strong className="font-semibold text-brand-deep/70">Đã nhận tiền</strong> — hãy
          kiểm tra tài khoản ngân hàng trước khi xác nhận.
        </p>
      </div>

      {loading ? (
        <LoadingMessage label="Đang tải đơn hàng..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchOrders} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-brand-deep/10 bg-brand-cream/60 text-xs font-semibold uppercase text-brand-deep/50">
                  <th className="p-4">Mã đơn</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Địa chỉ</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Thanh toán</th>
                  <th className="p-4">Tiền về</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày tạo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-deep/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-xs text-brand-deep/40">
                      Chưa có đơn hàng nào.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-brand-cream/30">
                      <td className="p-4 font-mono text-xs font-bold text-brand-deep">
                        #{order.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="p-4 font-medium text-brand-deep">
                        {order.customerName || "Khách hàng"}
                      </td>
                      <td className="p-4 text-brand-deep/70">{order.phone || "N/A"}</td>
                      <td className="max-w-xs truncate p-4 text-xs text-brand-deep/50">
                        {order.address ? `${order.address}, ${order.city}` : "N/A"}
                      </td>
                      <td className="p-4 font-bold text-emerald-600">
                        {order.totalPrice.toLocaleString("vi-VN")} đ
                      </td>
                      <td className="p-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            PAYMENT_METHOD_LABELS[order.paymentMethod]?.style ||
                            "bg-brand-deep/10 text-brand-deep/60"
                          }`}
                        >
                          {PAYMENT_METHOD_LABELS[order.paymentMethod]?.label ||
                            order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4">
                        <PaymentCell
                          orderId={order.id}
                          method={order.paymentMethod}
                          status={order.paymentStatus}
                          paidAt={order.paidAt}
                        />
                      </td>
                      <td className="p-4">
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      </td>
                      <td className="p-4 text-xs text-brand-deep/50">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
