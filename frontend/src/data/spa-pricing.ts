import { MessageKey } from "@/lib/messages";

/** Bảng giá tham khảo cho máy tính giá spa (/spa). Giá cuối xác nhận tại cửa hàng
 *  sau khi cân & kiểm tra tình trạng lông thực tế.
 *
 *  Tên dịch vụ nằm trong `messages.ts` để đổi theo ngôn ngữ; ở đây mỗi dịch vụ
 *  giữ một `id` ổn định (dùng làm khoá lưu vào đơn giữ chỗ) và khoá dịch. */

export const WEIGHT_TIERS = [
  "<3kg",
  ">3-6kg",
  ">6-10kg",
  ">10-20kg",
  ">20-30kg",
  ">30-40kg",
  ">40kg",
] as const;

export type WeightTier = (typeof WEIGHT_TIERS)[number];

export interface GroomingService {
  id: string;
  nameKey: MessageKey;
  group: "combo" | "le";
  prices: Record<WeightTier, number>;
}

function tierPrices(values: number[]): Record<WeightTier, number> {
  return Object.fromEntries(WEIGHT_TIERS.map((t, i) => [t, values[i]])) as Record<
    WeightTier,
    number
  >;
}

export const GROOMING_SERVICES: GroomingService[] = [
  {
    id: "combo-tam-ve-sinh",
    nameKey: "spaService.combo-tam-ve-sinh",
    group: "combo",
    prices: tierPrices([120_000, 200_000, 300_000, 400_000, 500_000, 600_000, 700_000]),
  },
  {
    id: "combo-tam-cao",
    nameKey: "spaService.combo-tam-cao",
    group: "combo",
    prices: tierPrices([200_000, 250_000, 350_000, 450_000, 600_000, 700_000, 800_000]),
  },
  {
    id: "combo-tam-cat",
    nameKey: "spaService.combo-tam-cat",
    group: "combo",
    prices: tierPrices([300_000, 350_000, 400_000, 550_000, 700_000, 800_000, 1_000_000]),
  },
  {
    id: "combo-tam-cat-tao-hinh",
    nameKey: "spaService.combo-tam-cat-tao-hinh",
    group: "combo",
    prices: tierPrices([350_000, 400_000, 500_000, 650_000, 800_000, 1_000_000, 1_200_000]),
  },
  {
    id: "cat-dua-mong",
    nameKey: "spaService.cat-dua-mong",
    group: "le",
    prices: tierPrices([30_000, 30_000, 50_000, 50_000, 70_000, 70_000, 70_000]),
  },
  {
    id: "ve-sinh-tai",
    nameKey: "spaService.ve-sinh-tai",
    group: "le",
    prices: tierPrices([30_000, 30_000, 50_000, 50_000, 70_000, 70_000, 70_000]),
  },
  {
    id: "cao-bung",
    nameKey: "spaService.cao-bung",
    group: "le",
    prices: tierPrices([30_000, 30_000, 50_000, 50_000, 70_000, 70_000, 70_000]),
  },
  {
    id: "tam-say",
    nameKey: "spaService.tam-say",
    group: "le",
    prices: tierPrices([100_000, 150_000, 250_000, 350_000, 450_000, 550_000, 650_000]),
  },
  {
    id: "cao-long",
    nameKey: "spaService.cao-long",
    group: "le",
    prices: tierPrices([150_000, 200_000, 300_000, 400_000, 500_000, 600_000, 700_000]),
  },
  {
    id: "cat-long",
    nameKey: "spaService.cat-long",
    group: "le",
    prices: tierPrices([200_000, 300_000, 400_000, 500_000, 650_000, 750_000, 900_000]),
  },
];

export const DYE_TIERS = ["<6kg", ">6-15kg", ">15-30kg", ">30kg"] as const;
export type DyeTier = (typeof DYE_TIERS)[number];

export interface DyeService {
  id: string;
  nameKey: MessageKey;
  prices: Record<DyeTier, number>;
}

function dyeTierPrices(values: number[]): Record<DyeTier, number> {
  return Object.fromEntries(DYE_TIERS.map((t, i) => [t, values[i]])) as Record<
    DyeTier,
    number
  >;
}

export const DYE_SERVICES: DyeService[] = [
  {
    id: "nhuom-tai-duoi",
    nameKey: "spaService.nhuom-tai-duoi",
    prices: dyeTierPrices([250_000, 300_000, 350_000, 400_000]),
  },
  {
    id: "nhuom-4-chan",
    nameKey: "spaService.nhuom-4-chan",
    prices: dyeTierPrices([250_000, 300_000, 350_000, 400_000]),
  },
  {
    id: "nhuom-hinh-nho",
    nameKey: "spaService.nhuom-hinh-nho",
    prices: dyeTierPrices([300_000, 350_000, 400_000, 500_000]),
  },
];

export const CUSTOM_QUOTE_ITEMS: { id: string; nameKey: MessageKey; noteKey: MessageKey }[] = [
  { id: "go-roi", nameKey: "spaService.go-roi", noteKey: "spaQuote.byCoat" },
  { id: "tay-o", nameKey: "spaService.tay-o", noteKey: "spaQuote.byCoat" },
  { id: "tam-trang", nameKey: "spaService.tam-trang", noteKey: "spaQuote.byCoat" },
  { id: "xa-duong", nameKey: "spaService.xa-duong", noteKey: "spaQuote.byCoat" },
  { id: "nhuom-hinh-lon", nameKey: "spaService.nhuom-hinh-lon", noteKey: "spaQuote.bySize" },
  { id: "nhuom-tao-hinh", nameKey: "spaService.nhuom-tao-hinh", noteKey: "spaQuote.byDesign" },
];
