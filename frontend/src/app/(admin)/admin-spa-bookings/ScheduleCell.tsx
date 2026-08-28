"use client";

import { useState } from "react";
import { CalendarClock, Check, X } from "lucide-react";
import { useSpaBookingStore } from "@/store/spa-booking-store";
import { errorMessage } from "@/lib/api";

/**
 * Ô chốt giờ hẹn spa.
 *
 * Khách chọn "ngày mong muốn" trên máy tính giá, nhưng đó mới là mong muốn —
 * giờ thật chỉ có sau khi nhân viên gọi lại và hai bên thống nhất, mà trong
 * cuộc gọi khách rất hay đổi sang ngày khác. Trước đây không có chỗ nào ghi lại
 * giờ đã chốt, nên nó nằm trong đầu người trực máy hoặc trên giấy nhớ.
 *
 * `desiredDate` giữ nguyên không sửa để còn đối chiếu khi khách thắc mắc.
 */

/** `Date` -> chuỗi cho `<input type="datetime-local">`, theo giờ máy đang dùng. */
function toLocalInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function formatVi(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ScheduleCell({
  bookingId,
  confirmedAt,
  staffNote,
}: {
  bookingId: string;
  confirmedAt?: string | null;
  staffNote?: string | null;
}) {
  const setSchedule = useSpaBookingStore((s) => s.setSchedule);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [when, setWhen] = useState(() => toLocalInput(confirmedAt));
  const [note, setNote] = useState(staffNote ?? "");

  const save = async () => {
    setSaving(true);
    try {
      // Ô datetime-local trả giờ địa phương không kèm múi giờ; `new Date` hiểu
      // đúng theo giờ máy rồi `toISOString` mới quy về UTC để gửi đi.
      await setSchedule(
        bookingId,
        when ? new Date(when).toISOString() : null,
        note.trim() || null
      );
      setEditing(false);
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    setWhen(toLocalInput(confirmedAt));
    setNote(staffNote ?? "");
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="group flex flex-col items-start gap-0.5 text-left"
        title="Bấm để chốt giờ hẹn sau khi gọi cho khách"
      >
        {confirmedAt ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800">
            <CalendarClock className="h-3 w-3" />
            {formatVi(confirmedAt)}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-brand-deep/25 px-2 py-1 text-[11px] font-medium text-brand-deep/45 group-hover:border-brand-deep/50 group-hover:text-brand-deep/70">
            <CalendarClock className="h-3 w-3" />
            Chưa chốt giờ
          </span>
        )}
        {staffNote && (
          <span className="max-w-[180px] truncate text-[10px] text-brand-deep/45">
            {staffNote}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="flex min-w-[220px] flex-col gap-1.5">
      <input
        type="datetime-local"
        value={when}
        onChange={(e) => setWhen(e.target.value)}
        className="rounded-lg border border-brand-deep/20 px-2 py-1 text-[11px] focus:border-brand-deep focus:outline-none"
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={500}
        placeholder="Ghi chú sau khi gọi..."
        className="rounded-lg border border-brand-deep/20 px-2 py-1 text-[11px] focus:border-brand-deep focus:outline-none"
      />
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-deep px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-50"
        >
          <Check className="h-3 w-3" />
          Lưu
        </button>
        <button
          type="button"
          onClick={cancel}
          disabled={saving}
          className="inline-flex items-center gap-1 rounded-lg border border-brand-deep/20 px-2 py-1 text-[11px] font-medium text-brand-deep/70 disabled:opacity-50"
        >
          <X className="h-3 w-3" />
          Bỏ
        </button>
      </div>
      {when && (
        <p className="text-[10px] leading-tight text-brand-deep/40">
          Lưu giờ hẹn sẽ tự chuyển yêu cầu sang &quot;Đã xác nhận&quot;.
        </p>
      )}
    </div>
  );
}
