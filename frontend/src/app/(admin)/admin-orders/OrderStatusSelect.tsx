"use client";

import { useState } from "react";
import { useOrderStore } from "@/store/order-store";
import { OrderStatus } from "@/lib/types";
import { ORDER_STATUS_LABELS as STATUS_LABELS } from "@/lib/order-labels";
import { errorMessage } from "@/lib/api";

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus);
  const [saving, setSaving] = useState(false);

  const handleChange = async (status: OrderStatus) => {
    if (status === "CANCELLED" && !confirm("Hủy đơn này? Tồn kho sẽ được hoàn lại.")) {
      return;
    }
    setSaving(true);
    try {
      await updateOrderStatus(orderId, status);
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
      onChange={(e) => handleChange(e.target.value as OrderStatus)}
      className={`text-[11px] font-medium px-2.5 py-1 rounded border border-transparent focus:outline-none focus:border-zinc-400 cursor-pointer disabled:opacity-50 ${
        STATUS_LABELS[currentStatus]?.style || "bg-zinc-100 text-zinc-700"
      }`}
    >
      {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status].label}
        </option>
      ))}
    </select>
  );
}
