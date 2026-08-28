export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type PetGender = "MALE" | "FEMALE";

export interface Product {
  /** Bản tiếng Anh shop tự nhập; rỗng thì site tra từ điển `content-en.ts`. */
  nameEn?: string | null;
  descriptionEn?: string | null;
  suitabilityEn?: string | null;
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  /** Tên giống để hiển thị. Backend tự điền theo `breedId`, đừng ghi tay. */
  breed?: string | null;
  /** Khoá tới thư viện giống — thứ quyết định bé hiện ở trang giống nào. */
  breedId?: string | null;
  age?: string | null;
  stock: number;
  published: boolean;
  categoryId: string;
  category?: Category;
  /** Nhóm nhỏ trong danh mục "Đồ dùng & Phụ kiện"; thú cưng/spa để trống. */
  subCategory?: string | null;
  /** Chỉ có với thú cưng; phụ kiện & dịch vụ để trống. */
  gender?: PetGender | null;
  tags: string[];
  vaccineDoses?: number | null;
  warranty: boolean;
  birthDate?: string | null;
  weight?: string | null;
  color?: string | null;
  suitability?: string | null;
}

/** Payload for creating/updating a product from the admin forms. */
export interface ProductInput {
  /** Bản tiếng Anh do shop nhập; bỏ trống thì site tra từ điển. */
  nameEn?: string | null;
  descriptionEn?: string | null;
  suitabilityEn?: string | null;
  name: string;
  categoryId: string;
  price: number;
  description: string;
  images: string[];
  breed?: string;
  age?: string;
  stock: number;
  published: boolean;
  subCategory?: string;
  gender?: PetGender | null;
  tags: string[];
  vaccineDoses?: number | null;
  warranty: boolean;
  birthDate?: string;
  weight?: string;
  color?: string;
  suitability?: string;
}

export type Species = "DOG" | "CAT";
export type BreedSize = "SMALL" | "MEDIUM" | "LARGE" | "XLARGE";

/** Giống shop có thể tìm/đặt cọc — khác với Product là bé đang có sẵn. */
export interface Breed {
  /** Bản tiếng Anh shop tự nhập; rỗng thì site tra từ điển `content-en.ts`. */
  aliasEn?: string | null;
  descriptionEn?: string | null;
  suitabilityEn?: string | null;
  careNotesEn?: string | null;
  id: string;
  name: string;
  slug: string;
  alias?: string | null;
  description: string;
  species: Species;
  size: BreedSize;
  weightRange?: string | null;
  priceMin: number;
  priceMax: number;
  image?: string | null;
  /** Ảnh gallery cho trang chi tiết giống; rỗng thì trang dùng `image`. */
  images: string[];
  tags: string[];
  /** Mẹo chăm sóc ngắn, hiển thị ở trang /cham-soc. */
  careGuide: string[];
  /** Đoạn "Phù hợp với" trên trang chi tiết giống. */
  suitability?: string | null;
  /** Đoạn lưu ý chăm sóc ngắn trên trang chi tiết giống. */
  careNotes?: string | null;
  /** Cảnh báo ngắn hiển thị nổi bật cạnh giá. */
  warning?: string | null;
  energyLevel?: number | null;
  apartmentFriendly?: number | null;
  kidFriendly?: number | null;
  petFriendly?: number | null;
  sheddingLevel?: number | null;
  groomingNeeds?: number | null;
  trainability?: number | null;
  barkingLevel?: number | null;
  position: number;
  published: boolean;
  /** Số bé đang bán khớp giống này, do API tính. */
  availableCount: number;
}

/** Payload for creating/updating a breed from the admin forms. */
export interface BreedInput {
  /** Bản tiếng Anh do shop nhập; bỏ trống thì site tra từ điển. */
  aliasEn?: string | null;
  descriptionEn?: string | null;
  suitabilityEn?: string | null;
  careNotesEn?: string | null;
  name: string;
  alias?: string;
  description: string;
  species: Species;
  size: BreedSize;
  weightRange?: string;
  priceMin: number;
  priceMax: number;
  image?: string;
  images?: string[];
  tags: string[];
  careGuide: string[];
  suitability?: string;
  careNotes?: string;
  warning?: string;
  energyLevel?: number;
  apartmentFriendly?: number;
  kidFriendly?: number;
  petFriendly?: number;
  sheddingLevel?: number;
  groomingNeeds?: number;
  trainability?: number;
  barkingLevel?: number;
  position: number;
  published: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
  stock: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
  city: string;
  note?: string;
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "COD" | "BANK";

/**
 * Tiền đã thực nhận hay chưa — tách khỏi `OrderStatus` vì đơn có thể đang
 * giao mà chưa trả tiền (COD), hoặc đã trả mà chưa gửi đi (chuyển khoản).
 * `PENDING_CONFIRM` = khách báo đã chuyển, shop chưa đối soát ngân hàng.
 */
export type PaymentStatus = "UNPAID" | "PENDING_CONFIRM" | "PAID";

export interface OrderItem {
  id?: string;
  productId: string;
  name: string;
  image?: string | null;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  note?: string | null;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  /** Thời điểm shop xác nhận tiền đã vào tài khoản. */
  paidAt?: string | null;
  createdAt: string;
  items: OrderItem[];
}

/** CUSTOMER không vào được khu quản trị; STAFF vào được nhưng hạn chế. */
export type Role = "CUSTOMER" | "STAFF" | "ADMIN";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
}

/** Cùng shape với AdminUser — dùng cho tài khoản khách hàng. */
export type AuthUser = AdminUser;

/** Tài khoản trong trang phân quyền. */
export interface ManagedUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  phone?: string | null;
  createdAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

/** Yêu cầu giữ chỗ từ máy tính giá spa — lead để nhân viên gọi lại xác nhận. */
export interface SpaBooking {
  id: string;
  phone: string;
  petName?: string | null;
  species: Species;
  weightTier: string;
  serviceName: string;
  estimatedPrice: number;
  /** Ngày khách tự chọn lúc gửi yêu cầu. Không sửa — để đối chiếu khi có tranh cãi. */
  desiredDate: string;
  /** Giờ hẹn nhân viên chốt qua điện thoại, dạng ISO. Trống = chưa gọi được. */
  confirmedAt?: string | null;
  /** Ghi chú sau cuộc gọi, ví dụ "khách xin dời sang chiều". */
  staffNote?: string | null;
  status: BookingStatus;
  createdAt: string;
}

export interface SpaBookingInput {
  phone: string;
  petName?: string;
  species: Species;
  weightTier: string;
  serviceName: string;
  estimatedPrice: number;
  desiredDate: string;
}

/** Email đăng ký nhận tin ở chân trang. */
export interface Subscriber {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}
