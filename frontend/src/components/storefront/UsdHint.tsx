"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { toUsd, toUsdApprox } from "@/lib/currency";
import { useExchangeRateStore } from "@/store/exchange-rate-store";
import { useHasMounted } from "@/lib/use-has-mounted";

/**
 * Số tiền USD quy đổi, chỉ hiện khi khách đang xem bằng tiếng Anh.
 * Giá chính vẫn là VNĐ vì đó mới là số tiền thật sự thanh toán.
 *
 * Tỷ giá lấy từ backend (`/api/exchange-rate`) và nhớ trong localStorage, nên
 * chỉ gọi mạng một lần mỗi 12 tiếng dù trang có bao nhiêu thẻ giá đi nữa.
 *
 * `block` = xuống dòng riêng bên dưới giá (dùng ở thẻ sản phẩm, trang chi tiết);
 * mặc định là inline, đứng ngay sau giá trên cùng một dòng.
 * `to` = mốc trên của khoảng giá, ví dụ giá giống chó có min–max.
 */
export default function UsdHint({
  amount,
  to,
  block = false,
  className = "",
}: {
  amount: number;
  to?: number;
  block?: boolean;
  className?: string;
}) {
  const { locale } = useI18n();
  const mounted = useHasMounted();
  const rate = useExchangeRateStore((s) => s.rate);
  const live = useExchangeRateStore((s) => s.live);
  const ensureRate = useExchangeRateStore((s) => s.ensureRate);

  // Chỉ tải tỷ giá khi thật sự cần hiển thị USD; bản tiếng Việt không gọi mạng.
  // Hook phải nằm trước mọi nhánh return sớm bên dưới.
  useEffect(() => {
    if (mounted && locale === "en") ensureRate();
  }, [mounted, locale, ensureRate]);

  if (locale !== "en") return null;

  const label =
    to !== undefined && to !== amount
      ? `~${toUsd(amount, rate)} – ${toUsd(to, rate)}`
      : toUsdApprox(amount, rate);

  return (
    <span
      // Tỷ giá dự phòng thì nói rõ khi rê chuột, để khách không hiểu nhầm đây
      // là tỷ giá ngân hàng tại thời điểm này.
      title={live ? undefined : "Reference rate — not a live bank rate"}
      className={`${block ? "block" : "ml-1.5"} font-normal text-brand-deep/45 ${className}`}
    >
      ({label})
    </span>
  );
}
