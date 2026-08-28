"use client";

import { useState } from "react";
import { useSpaBookingStore } from "@/store/spa-booking-store";
import { BookingStatus } from "@/lib/types";
import { errorMessage } from "@/lib/api";

const STATUS_LABELS: Record<BookingStatus, { label: string; style: string }> = {
  PENDING: { label: "Chờ gọi lại", style: "bg-amber-100 text-amber-800" },
  CONFIRMED: { label: "Đã xác nhận", style: "bg-emerald-100 text-emerald-800" },
  CANCELLED: { label: "Đã hủy", style: "bg-rose-100 text-rose-800" },
};

export default function SpaBookingStatusSelect({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: BookingStatus;
}) {
  const updateStatus = useSpaBookingStore((s) => s.updateStatus);
  const [saving, setSaving] = useState(false);

  const handleChange = async (status: BookingStatus) => {
    setSaving(true);
    try {
      await updateStatus(bookingId, status);
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={currentStatus}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as BookingStatus)}
      className={`cursor-pointer rounded border border-transparent px-2.5 py-1 text-[11px] font-medium focus:border-brand-deep/30 focus:outline-none disabled:opacity-50 ${
        STATUS_LABELS[currentStatus]?.style || "bg-brand-deep/10 text-brand-deep/70"
      }`}
    >
      {(Object.keys(STATUS_LABELS) as BookingStatus[]).map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status].label}
        </option>
      ))}
    </select>
  );
}
