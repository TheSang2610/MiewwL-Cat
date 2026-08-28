"use client";

import { useEffect } from "react";
import { useSpaBookingStore } from "@/store/spa-booking-store";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import SpaBookingStatusSelect from "./SpaBookingStatusSelect";
import ScheduleCell from "./ScheduleCell";

export default function AdminSpaBookingsPage() {
  const { bookings, loading, error, fetchBookings } = useSpaBookingStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-deep">Yêu cầu giữ chỗ Spa</h1>
        <p className="text-sm text-brand-deep/50">
          Lead từ máy tính giá /spa — gọi lại khách để xác nhận khung giờ
        </p>
      </div>

      {loading ? (
        <LoadingMessage label="Đang tải yêu cầu..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchBookings} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-deep/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-brand-deep/10 bg-brand-cream/60 text-xs font-semibold uppercase text-brand-deep/50">
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Tên bé</th>
                  <th className="p-4">Loài</th>
                  <th className="p-4">Cân nặng</th>
                  <th className="p-4">Dịch vụ</th>
                  <th className="p-4">Giá dự kiến</th>
                  <th className="p-4">Ngày khách muốn</th>
                  <th className="p-4">Giờ hẹn đã chốt</th>
                  <th className="p-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-deep/5">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-xs text-brand-deep/40">
                      Chưa có yêu cầu giữ chỗ nào.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-brand-cream/30">
                      <td className="p-4 font-medium text-brand-deep">
                        <a href={`tel:${b.phone}`} className="hover:underline">
                          {b.phone}
                        </a>
                      </td>
                      <td className="p-4 text-brand-deep/70">{b.petName || "—"}</td>
                      <td className="p-4 text-xs text-brand-deep/60">
                        {b.species === "CAT" ? "Mèo" : "Chó"}
                      </td>
                      <td className="p-4 text-xs text-brand-deep/60">{b.weightTier}</td>
                      <td className="p-4 text-xs text-brand-deep/70">{b.serviceName}</td>
                      <td className="p-4 font-bold text-emerald-600">
                        {b.estimatedPrice.toLocaleString("vi-VN")} đ
                      </td>
                      <td className="p-4 text-xs text-brand-deep/50">{b.desiredDate}</td>
                      <td className="p-4">
                        <ScheduleCell
                          bookingId={b.id}
                          confirmedAt={b.confirmedAt}
                          staffNote={b.staffNote}
                        />
                      </td>
                      <td className="p-4">
                        <SpaBookingStatusSelect bookingId={b.id} currentStatus={b.status} />
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
