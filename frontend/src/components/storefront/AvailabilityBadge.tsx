"use client";

import { useI18n } from "@/lib/i18n";

/**
 * Huy hiệu "còn mấy bé" cho một giống.
 *
 * Dùng chung cho cả thẻ giống ngoài trang chủ, thẻ ở trang /cho và /meo, lẫn
 * trang chi tiết giống — ba nơi cùng một câu chữ và cùng một cách đếm, để
 * khách không thấy chỗ báo còn chỗ báo hết cho cùng một giống.
 *
 * Cố ý hiện cả khi hết. Trước đây chỉ hiện lúc còn hàng, nên giống hết bé trông
 * y hệt giống chưa kịp cập nhật — khách không biết nên hỏi hay nên chờ.
 */
export default function AvailabilityBadge({
  count,
  variant = "overlay",
}: {
  count: number;
  /** `overlay` nằm đè lên ảnh, `inline` nằm trong luồng chữ. */
  variant?: "overlay" | "inline";
}) {
  const { t } = useI18n();
  const available = count > 0;

  const base =
    variant === "overlay"
      ? "absolute bottom-3 left-3 border-white/60 bg-white/85 shadow-sm backdrop-blur-md"
      : "border-brand-deep/10 bg-white";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${base}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {available && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            available ? "bg-emerald-500" : "bg-brand-deep/25"
          }`}
        />
      </span>
      <span
        className={`text-[11px] font-semibold ${
          available ? "text-brand-deep" : "text-brand-deep/45"
        }`}
      >
        {available
          ? t("availability.inStock", { count })
          : t("availability.soldOut")}
      </span>
    </div>
  );
}
