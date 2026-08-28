import { z } from "zod";

/**
 * Đường dẫn ảnh: chấp nhận URL tuyệt đối (CDN ngoài) HOẶC đường dẫn nội bộ
 * bắt đầu bằng "/" (file trong `frontend/public`).
 *
 * Trước đây chỗ này chỉ nhận `z.string().url()`. Khi toàn bộ ảnh chuyển sang
 * tự host thành "/breeds/poodle-1.jpg" thì seed vẫn chạy (ghi thẳng qua Prisma,
 * không đi qua Zod) nhưng MỌI thao tác sửa sản phẩm/giống ở trang quản trị đều
 * trả 422. Đừng siết lại thành `.url()` nữa.
 */
const imagePath = z
  .string()
  .min(1, "Đường dẫn ảnh không được để trống")
  .refine(
    (v) => v.startsWith("/") || /^https?:\/\//.test(v),
    "Ảnh phải là URL http(s) hoặc đường dẫn nội bộ bắt đầu bằng /"
  );

export const productInput = z.object({
  /** Bản tiếng Anh do shop tự nhập; bỏ trống thì site tra từ điển.
   *  `null` = xoá bản dịch, `undefined` = giữ nguyên. */
  nameEn: z.string().nullable().optional(),
  descriptionEn: z.string().nullable().optional(),
  suitabilityEn: z.string().nullable().optional(),
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  slug: z.string().min(1).optional(),
  categoryId: z.string().min(1, "Thiếu danh mục"),
  price: z.number().nonnegative(),
  description: z.string().default(""),
  images: z.array(imagePath).default([]),
  breed: z.string().optional(),
  /// Khoá tới thư viện giống. `null` để gỡ liên kết (ví dụ đổi sang đồ dùng).
  breedId: z.string().nullable().optional(),
  age: z.string().optional(),
  stock: z.number().int().nonnegative().default(0),
  published: z.boolean().default(true),
  subCategory: z.string().optional(),
  // Thuộc tính riêng của thú cưng, phụ kiện/dịch vụ bỏ trống.
  gender: z.enum(["MALE", "FEMALE"]).nullish(),
  tags: z.array(z.string()).default([]),
  vaccineDoses: z.number().int().nonnegative().nullish(),
  warranty: z.boolean().default(false),
  birthDate: z.string().optional(),
  weight: z.string().optional(),
  color: z.string().optional(),
  suitability: z.string().optional(),
});

// `.partial()` only makes fields optional — it doesn't strip `.default()`,
// so a field with a default that's simply omitted from a partial update
// gets silently reset to that default instead of left untouched. Every
// field here is redeclared without `.default()` so an omitted field means
// "don't touch it", not "reset it".
export const productPatch = z.object({
  /** Bản tiếng Anh do shop tự nhập; bỏ trống thì site tra từ điển.
   *  `null` = xoá bản dịch, `undefined` = giữ nguyên. */
  nameEn: z.string().nullable().optional(),
  descriptionEn: z.string().nullable().optional(),
  suitabilityEn: z.string().nullable().optional(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  description: z.string().optional(),
  images: z.array(imagePath).optional(),
  breed: z.string().optional(),
  /// Khoá tới thư viện giống. `null` để gỡ liên kết (ví dụ đổi sang đồ dùng).
  breedId: z.string().nullable().optional(),
  age: z.string().optional(),
  stock: z.number().int().nonnegative().optional(),
  published: z.boolean().optional(),
  subCategory: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).nullish(),
  tags: z.array(z.string()).optional(),
  vaccineDoses: z.number().int().nonnegative().nullish(),
  warranty: z.boolean().optional(),
  birthDate: z.string().optional(),
  weight: z.string().optional(),
  color: z.string().optional(),
  suitability: z.string().optional(),
});

export const orderInput = z.object({
  customer: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    note: z.string().optional(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "Đơn hàng phải có ít nhất một sản phẩm"),
  paymentMethod: z.enum(["COD", "BANK"]).default("COD"),
  /** Gắn đơn vào tài khoản khách nếu đang đăng nhập; khách vãng lai để trống. */
  userId: z.string().optional(),
});

/** Admin đổi trạng thái giao hàng và/hoặc trạng thái tiền của một đơn. */
export const orderPatch = z
  .object({
    status: z
      .enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
      .optional(),
    paymentStatus: z.enum(["UNPAID", "PENDING_CONFIRM", "PAID"]).optional(),
  })
  .refine((v) => v.status !== undefined || v.paymentStatus !== undefined, {
    message: "Cần ít nhất một trong `status` hoặc `paymentStatus`",
  });

export const breedInput = z.object({
  /** Bản tiếng Anh do shop tự nhập; bỏ trống thì site tra từ điển.
   *  `null` = xoá bản dịch, `undefined` = giữ nguyên. */
  aliasEn: z.string().nullable().optional(),
  descriptionEn: z.string().nullable().optional(),
  suitabilityEn: z.string().nullable().optional(),
  careNotesEn: z.string().nullable().optional(),
  name: z.string().min(1, "Tên giống không được để trống"),
  slug: z.string().min(1).optional(),
  alias: z.string().optional(),
  description: z.string().default(""),
  species: z.enum(["DOG", "CAT"]),
  size: z.enum(["SMALL", "MEDIUM", "LARGE", "XLARGE"]),
  weightRange: z.string().optional(),
  priceMin: z.number().nonnegative(),
  priceMax: z.number().nonnegative(),
  image: imagePath.optional(),
  images: z.array(imagePath).default([]),
  tags: z.array(z.string()).default([]),
  careGuide: z.array(z.string()).default([]),
  suitability: z.string().optional(),
  careNotes: z.string().optional(),
  warning: z.string().optional(),
  energyLevel: z.number().int().min(1).max(5).optional(),
  apartmentFriendly: z.number().int().min(1).max(5).optional(),
  kidFriendly: z.number().int().min(1).max(5).optional(),
  petFriendly: z.number().int().min(1).max(5).optional(),
  sheddingLevel: z.number().int().min(1).max(5).optional(),
  groomingNeeds: z.number().int().min(1).max(5).optional(),
  trainability: z.number().int().min(1).max(5).optional(),
  barkingLevel: z.number().int().min(1).max(5).optional(),
  position: z.number().int().default(0),
  published: z.boolean().default(true),
});

// See the comment on `productPatch` above — same reason this is hand-written
// instead of `breedInput.partial()`.
export const breedPatch = z.object({
  /** Bản tiếng Anh do shop tự nhập; bỏ trống thì site tra từ điển.
   *  `null` = xoá bản dịch, `undefined` = giữ nguyên. */
  aliasEn: z.string().nullable().optional(),
  descriptionEn: z.string().nullable().optional(),
  suitabilityEn: z.string().nullable().optional(),
  careNotesEn: z.string().nullable().optional(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  alias: z.string().optional(),
  description: z.string().optional(),
  species: z.enum(["DOG", "CAT"]).optional(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE", "XLARGE"]).optional(),
  weightRange: z.string().optional(),
  priceMin: z.number().nonnegative().optional(),
  priceMax: z.number().nonnegative().optional(),
  image: imagePath.optional(),
  images: z.array(imagePath).optional(),
  tags: z.array(z.string()).optional(),
  careGuide: z.array(z.string()).optional(),
  suitability: z.string().optional(),
  careNotes: z.string().optional(),
  warning: z.string().optional(),
  energyLevel: z.number().int().min(1).max(5).optional(),
  apartmentFriendly: z.number().int().min(1).max(5).optional(),
  kidFriendly: z.number().int().min(1).max(5).optional(),
  petFriendly: z.number().int().min(1).max(5).optional(),
  sheddingLevel: z.number().int().min(1).max(5).optional(),
  groomingNeeds: z.number().int().min(1).max(5).optional(),
  trainability: z.number().int().min(1).max(5).optional(),
  barkingLevel: z.number().int().min(1).max(5).optional(),
  position: z.number().int().optional(),
  published: z.boolean().optional(),
});

export const spaBookingInput = z.object({
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  petName: z.string().optional(),
  species: z.enum(["DOG", "CAT"]),
  weightTier: z.string().min(1, "Thiếu bậc cân nặng"),
  serviceName: z.string().min(1, "Thiếu dịch vụ"),
  estimatedPrice: z.number().nonnegative(),
  desiredDate: z.string().min(1, "Thiếu ngày mong muốn"),
});

/**
 * Nhân viên sửa một yêu cầu spa sau khi gọi cho khách.
 *
 * Cả ba trường đều tuỳ chọn để trang quản trị gửi riêng lẻ: đổi mỗi trạng thái,
 * hoặc chốt mỗi giờ hẹn, không phải gửi lại toàn bộ.
 */
export const spaBookingStatusPatch = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]).optional(),
  /// Giờ hẹn đã chốt, dạng ISO. `null` để xoá giờ đã chốt.
  confirmedAt: z.string().datetime().nullable().optional(),
  /// Ghi chú sau cuộc gọi. `null` hoặc chuỗi rỗng để xoá.
  staffNote: z.string().max(500).nullable().optional(),
})
  .refine(
    (v) => v.status !== undefined || v.confirmedAt !== undefined || v.staffNote !== undefined,
    { message: "Không có gì để cập nhật" }
  );

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/** Đổi vai trò một tài khoản — chỉ ADMIN được phép (kiểm ở route). */
export const userRolePatch = z.object({
  role: z.enum(["CUSTOMER", "STAFF", "ADMIN"]),
});

/** Đổi mật khẩu — id người dùng lấy từ token, không nhận từ body. */
export const changePasswordInput = z.object({
  currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
  newPassword: z.string().min(6, "Mật khẩu mới cần ít nhất 6 ký tự"),
});

export const registerInput = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tự"),
  phone: z.string().optional(),
});

export const subscriberInput = z.object({
  email: z.string().email("Email không hợp lệ"),
  /** Form nào gửi lên; hiện chỉ có chân trang. */
  source: z.string().max(40).optional(),
});

// U+0300..U+036F is the combining-diacritics block NFD leaves behind.
const COMBINING_MARKS = /[̀-ͯ]/g;

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/[đ]/g, "d")
    .replace(/[Đ]/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
