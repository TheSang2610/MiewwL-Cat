import { MessageKey } from "@/lib/messages";

export interface WarrantyTier {
  key: string;
  nameKey: MessageKey;
  badgeKey: MessageKey;
  durationKey: MessageKey;
  coverageKey: MessageKey;
  extraPrice: number;
  perkKeys: MessageKey[];
  recommended?: boolean;
}

/** Gói bảo hành sức khỏe tùy chọn — thông tin tham khảo, chốt giá cuối khi
 *  tư vấn qua điện thoại (không cộng thẳng vào giỏ hàng tự động thanh toán). */
export const WARRANTY_TIERS: WarrantyTier[] = [
  {
    key: "standard",
    nameKey: "tier.standardName",
    badgeKey: "tier.standardBadge",
    durationKey: "tier.standardDuration",
    coverageKey: "tier.standardCoverage",
    extraPrice: 0,
    perkKeys: ["tier.standardPerk1", "tier.standardPerk2", "tier.standardPerk3"],
  },
  {
    key: "gold",
    nameKey: "tier.goldName",
    badgeKey: "tier.goldBadge",
    durationKey: "tier.goldDuration",
    coverageKey: "tier.goldCoverage",
    extraPrice: 3_000_000,
    perkKeys: ["tier.goldPerk1", "tier.goldPerk2", "tier.goldPerk3"],
    recommended: true,
  },
  {
    key: "premium",
    nameKey: "tier.premiumName",
    badgeKey: "tier.premiumBadge",
    durationKey: "tier.premiumDuration",
    coverageKey: "tier.premiumCoverage",
    extraPrice: 4_200_000,
    perkKeys: ["tier.premiumPerk1", "tier.premiumPerk2", "tier.premiumPerk3"],
  },
];
