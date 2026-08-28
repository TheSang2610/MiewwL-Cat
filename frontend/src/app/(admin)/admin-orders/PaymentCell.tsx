"use client";

import { useState } from "react";
import { BanknoteArrowUp, Undo2 } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { PaymentMethod, PaymentStatus } from "@/lib/types";
import { paymentStatusLabel } from "@/lib/order-labels";
import { errorMessage } from "@/lib/api";

/**
 * Đối soát thủ công: shop mở app ngân hàng, thấy tiền vào thì bấm xác nhận.
 * Chỉ sau bước này đơn chuyển khoản mới được coi là đã thanh toán và mới
 * chuyển được sang các trạng thái xử lý tiếp theo.
 */
export default function PaymentCell({
  orderId,
  method,
  status,
  paidAt,
}: {
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: string | null;
}) {
  const updatePaymentStatus = useOrderStore((s) => s.updatePaymentStatus);
  const [saving, setSaving] = useState(false);

  const badge = paymentStatusLabel(method, status);

  const set = async (next: PaymentStatus, confirmText?: string) => {
    if (confirmText && !confirm(confirmText)) return;
    setSaving(true);
    try {
      await updatePaymentStatus(orderId, next);
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${badge.style}`}
      >
        {badge.label}
      </span>

      {status === "PAID" ? (
        <div className="flex flex-col items-start gap-1">
          {paidAt && (
            <span className="text-[10px] text-brand-deep/40">
              {new Date(paidAt).toLocaleString("vi-VN")}
            </span>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              set("UNPAID", "Bỏ xác nhận thanh toán của đơn này? Đơn sẽ quay lại trạng thái chưa nhận tiền.")
            }
            className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-deep/40 transition-colors hover:text-rose-600 disabled:opacity-50"
          >
            <Undo2 className="h-3 w-3" />
            Bỏ xác nhận
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={saving}
          onClick={() => set("PAID")}
          className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
        >
          <BanknoteArrowUp className="h-3 w-3" />
          {saving ? "Đang lưu..." : "Đã nhận tiền"}
        </button>
      )}
    </div>
  );
}
