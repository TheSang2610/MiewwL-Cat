import { MessageKey } from "./messages";

/**
 * Các nhóm nhỏ trong danh mục "Đồ dùng & Phụ kiện" (Product.subCategory).
 * Thứ tự ở đây là thứ tự section hiển thị trên trang /phu-kien.
 *
 * Chữ hiển thị nằm trong `messages.ts` để đổi được theo ngôn ngữ; ở đây chỉ
 * giữ slug (khớp với dữ liệu trong DB), icon và khoá dịch.
 */
export interface SupplyGroupDef {
  slug: string;
  icon: string;
  labelKey: MessageKey;
  blurbKey: MessageKey;
}

export const SUPPLY_GROUPS: SupplyGroupDef[] = [
  {
    slug: "thuc-an",
    icon: "🍖",
    labelKey: "supplyGroup.thuc-an",
    blurbKey: "supplyGroup.thuc-anBlurb",
  },
  {
    slug: "do-choi",
    icon: "🎾",
    labelKey: "supplyGroup.do-choi",
    blurbKey: "supplyGroup.do-choiBlurb",
  },
  {
    slug: "chuong-van-chuyen",
    icon: "🏠",
    labelKey: "supplyGroup.chuong-van-chuyen",
    blurbKey: "supplyGroup.chuong-van-chuyenBlurb",
  },
  {
    slug: "ve-sinh",
    icon: "🧴",
    labelKey: "supplyGroup.ve-sinh",
    blurbKey: "supplyGroup.ve-sinhBlurb",
  },
  {
    slug: "phu-kien-khac",
    icon: "🎀",
    labelKey: "supplyGroup.phu-kien-khac",
    blurbKey: "supplyGroup.phu-kien-khacBlurb",
  },
];

/** Nhóm cho sản phẩm chưa gán subCategory — luôn xếp cuối trang. */
export const UNGROUPED: SupplyGroupDef = {
  slug: "khac",
  icon: "📦",
  labelKey: "supplyGroup.khac",
  blurbKey: "supplyGroup.khacBlurb",
};

/** Nhãn tiếng Việt cho khu quản trị (admin không đổi ngôn ngữ). */
const ADMIN_LABELS: Record<string, string> = {
  "thuc-an": "Thức ăn",
  "do-choi": "Đồ chơi",
  "chuong-van-chuyen": "Chuồng & Vận chuyển",
  "ve-sinh": "Vệ sinh",
  "phu-kien-khac": "Phụ kiện khác",
};

export function supplyGroupLabel(slug?: string | null) {
  return (slug && ADMIN_LABELS[slug]) || "Sản phẩm khác";
}
