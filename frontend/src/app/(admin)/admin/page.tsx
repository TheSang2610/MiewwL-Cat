"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DollarSign, ShoppingBag, Clock, AlertTriangle, PawPrint, Sparkles } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { useOrderStore } from "@/store/order-store";
import { useBreedStore } from "@/store/breed-store";
import { useSpaBookingStore } from "@/store/spa-booking-store";

export default function AdminDashboardPage() {
  const { products, error: productError, fetchProducts } = useProductStore();
  const { orders, error: orderError, fetchOrders } = useOrderStore();
  const { breeds, fetchBreeds } = useBreedStore();
  const { bookings, fetchBookings } = useSpaBookingStore();

  useEffect(() => {
    // Admin needs hidden products too, so no `published` filter here.
    fetchProducts();
    fetchOrders();
    fetchBreeds();
    fetchBookings();
  }, [fetchProducts, fetchOrders, fetchBreeds, fetchBookings]);

  const error = productError || orderError;
  const recentOrders = orders.slice(0, 5);
  // Chỉ tính tiền thực sự đã về: chuyển khoản phải được đối soát (PAID),
  // COD phải giao xong mới thu được tiền. Đơn đang treo nằm ở dòng dưới.
  const collected = orders.filter(
    (o) =>
      o.status !== "CANCELLED" &&
      (o.paymentMethod === "BANK" ? o.paymentStatus === "PAID" : o.status === "DELIVERED")
  );
  const totalRevenue = collected.reduce((sum, order) => sum + order.totalPrice, 0);

  const awaitingPayment = orders.filter(
    (o) =>
      o.status !== "CANCELLED" &&
      o.paymentMethod === "BANK" &&
      o.paymentStatus !== "PAID"
  );
  const awaitingAmount = awaitingPayment.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-deep">Tổng quan hệ thống</h1>
        <p className="text-sm text-brand-deep/50">Báo cáo chỉ số kinh doanh & hoạt động bán hàng</p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-2xl border border-brand-deep/10 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-2 flex items-center justify-between text-brand-deep/50">
            <span className="text-xs font-semibold uppercase tracking-wider">Doanh thu đã thu</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-brand-deep">{totalRevenue.toLocaleString("vi-VN")} đ</p>
          {awaitingPayment.length > 0 && (
            <p className="mt-1 text-xs text-amber-700">
              Chờ nhận tiền: {awaitingPayment.length} đơn ·{" "}
              {awaitingAmount.toLocaleString("vi-VN")} đ
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-brand-deep/10 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-brand-deep/50">
            <span className="text-xs font-semibold uppercase tracking-wider">Đơn chờ xử lý</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-brand-deep">{pendingOrders}</p>
        </div>

        <div className="rounded-2xl border border-brand-deep/10 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-brand-deep/50">
            <span className="text-xs font-semibold uppercase tracking-wider">Tổng sản phẩm</span>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-brand-deep">{products.length}</p>
        </div>

        <div className="rounded-2xl border border-brand-deep/10 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-brand-deep/50">
            <span className="text-xs font-semibold uppercase tracking-wider">Tồn kho thấp (&le;5)</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-rose-600">{lowStockCount}</p>
        </div>

        <div className="rounded-2xl border border-brand-deep/10 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-brand-deep/50">
            <span className="text-xs font-semibold uppercase tracking-wider">Giống đang bán</span>
            <PawPrint className="h-4 w-4 text-brand-gold" />
          </div>
          <p className="text-2xl font-bold text-brand-deep">{breeds.length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-brand-deep/10 bg-brand-cream/60 p-4">
            <h2 className="text-sm font-semibold text-brand-deep">Đơn hàng mới nhất</h2>
            <Link href="/admin-orders" className="text-xs font-semibold text-brand-gold hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-brand-deep/5">
            {recentOrders.length === 0 ? (
              <p className="p-6 text-center text-xs text-brand-deep/40">Chưa có đơn hàng nào.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 hover:bg-brand-cream/40">
                  <div>
                    <p className="font-mono text-xs font-bold text-brand-deep">
                      #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="mt-0.5 text-xs text-brand-deep/50">
                      {order.customerName || "Khách hàng"} • {order.phone || "Chưa có SĐT"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      {order.totalPrice.toLocaleString("vi-VN")} đ
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        order.status === "PENDING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-brand-deep/10 bg-brand-cream/60 p-4">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              Yêu cầu Spa
            </h2>
            <Link href="/admin-spa-bookings" className="text-xs font-semibold text-brand-gold hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="p-5">
            <p className="text-3xl font-extrabold text-brand-deep">{pendingBookings}</p>
            <p className="mt-1 text-xs text-brand-deep/50">yêu cầu giữ chỗ đang chờ gọi lại</p>
          </div>
        </div>
      </div>
    </div>
  );
}
