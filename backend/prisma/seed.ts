import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BREEDS } from "./breeds";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Mèo", slug: "meo" },
  { name: "Chó", slug: "cho" },
  { name: "Đồ dùng & Phụ kiện", slug: "phu-kien" },
  { name: "Spa & Grooming", slug: "spa" },
];

// Mirrors frontend/src/data/products.ts so both sides describe the same catalogue.
const PRODUCTS = [
  {
    name: "Mèo Anh Lông Ngắn (British Shorthair) - Màu Xanh Khói",
    slug: "meo-anh-long-ngan-xanh-khoi",
    categorySlug: "meo",
    price: 8500000,
    images: ["/breeds/british-shorthair-1.jpg", "/breeds/british-shorthair-2.jpg", "/breeds/british-shorthair-3.jpg"],
    description:
      "Mèo Anh lông ngắn thuần chủng, tính cách điềm đạm, thân thiện với trẻ nhỏ. Đã tiêm phòng đầy đủ và có giấy khám sức khỏe.",
    breed: "British Shorthair",
    age: "3 tháng tuổi",
    stock: 4,
    gender: "MALE" as const,
    tags: ["điềm đạm", "thân thiện với trẻ nhỏ"],
    vaccineDoses: 2,
    warranty: true,
    birthDate: "27/5/2026",
    weight: "1.2 kg",
    color: "Xanh khói",
    suitability: "Phù hợp gia đình có trẻ nhỏ, người mới nuôi mèo lần đầu.",
  },
  {
    name: "Mèo Ba Tư (Persian) - Lông Trắng Mắt Xanh",
    slug: "meo-ba-tu-long-trang-mat-xanh",
    categorySlug: "meo",
    price: 12000000,
    images: ["/breeds/persian-1.jpg", "/breeds/persian-2.jpg", "/breeds/persian-3.jpg"],
    description:
      "Mèo Ba Tư mặt tịt, lông dài mượt, ngoại hình sang trọng. Được chăm sóc theo chế độ dinh dưỡng chuẩn, sức khỏe ổn định.",
    breed: "Persian",
    age: "4 tháng tuổi",
    stock: 2,
    gender: "FEMALE" as const,
    tags: ["sang chảnh", "thích được vuốt ve"],
    vaccineDoses: 2,
    warranty: true,
    birthDate: "27/4/2026",
    weight: "1.5 kg",
    color: "Trắng",
    suitability: "Phù hợp người thích chải chuốt, có thời gian chăm sóc lông mỗi ngày.",
  },
  {
    name: "Mèo Scottish Fold - Tai Cụp Đáng Yêu",
    slug: "meo-scottish-fold-tai-cup",
    categorySlug: "meo",
    price: 9500000,
    images: ["/breeds/scottish-fold-1.jpg", "/breeds/scottish-fold-2.jpg", "/breeds/scottish-fold-3.jpg"],
    description:
      "Mèo tai cụp Scottish Fold, tính cách hiền lành, thích ôm ấp. Đã được tẩy giun và tiêm phòng mũi đầu.",
    breed: "Scottish Fold",
    age: "2.5 tháng tuổi",
    stock: 3,
    gender: "FEMALE" as const,
    tags: ["hiền lành", "thích ôm ấp"],
    vaccineDoses: 1,
    warranty: true,
    birthDate: "12/6/2026",
    weight: "1.0 kg",
    color: "Xám vện",
    suitability: "Phù hợp người sống một mình, thích mèo ít vận động, hay ôm ấp.",
  },
  {
    name: "Mèo Munchkin Chân Ngắn",
    slug: "meo-munchkin-chan-ngan",
    categorySlug: "meo",
    price: 15000000,
    images: ["/breeds/munchkin-1.jpg", "/breeds/munchkin-2.jpg", "/breeds/munchkin-3.jpg"],
    description:
      "Giống mèo chân ngắn độc đáo, hiếm gặp tại Việt Nam. Năng động, thích khám phá, phù hợp gia đình có không gian rộng.",
    breed: "Munchkin",
    age: "3 tháng tuổi",
    stock: 1,
    gender: "MALE" as const,
    tags: ["năng động", "thích khám phá"],
    vaccineDoses: 1,
    warranty: true,
    birthDate: "27/5/2026",
    weight: "1.1 kg",
    color: "Vàng nâu",
    suitability: "Phù hợp gia đình có không gian rộng, thích mèo năng động khám phá.",
  },
  {
    name: "Chó Poodle Tiny - Màu Nâu Đỏ",
    slug: "cho-poodle-tiny-nau-do",
    categorySlug: "cho",
    price: 6500000,
    images: ["/breeds/poodle-1.jpg", "/breeds/poodle-2.jpg", "/breeds/poodle-3.jpg"],
    description:
      "Poodle Tiny lông xoăn, thông minh, dễ huấn luyện. Thích hợp nuôi trong căn hộ, đã tiêm phòng 2 mũi.",
    breed: "Poodle",
    age: "2 tháng tuổi",
    stock: 5,
    gender: "MALE" as const,
    tags: ["thông minh", "dễ huấn luyện"],
    vaccineDoses: 2,
    warranty: true,
    birthDate: "27/6/2026",
    weight: "0.9 kg",
    color: "Nâu đỏ",
    suitability: "Phù hợp căn hộ, người mới nuôi chó lần đầu, cần chó ít rụng lông.",
  },
  {
    name: "Chó Corgi - Chân Ngắn Đuôi Cụt",
    slug: "cho-corgi-chan-ngan-duoi-cut",
    categorySlug: "cho",
    price: 11000000,
    images: ["/breeds/corgi-1.jpg", "/breeds/corgi-2.jpg", "/breeds/corgi-3.jpg"],
    description:
      "Corgi vui vẻ, năng động, rất quấn chủ. Nguồn gốc rõ ràng, có sổ tiêm phòng đầy đủ.",
    breed: "Corgi",
    age: "3 tháng tuổi",
    stock: 2,
    gender: "FEMALE" as const,
    tags: ["vui vẻ", "rất quấn chủ"],
    vaccineDoses: 2,
    warranty: true,
    birthDate: "27/5/2026",
    weight: "3.5 kg",
    color: "Vện trắng nâu",
    suitability: "Phù hợp gia đình năng động, có sân hoặc công viên gần nhà để bé chạy nhảy.",
  },
  // === Thức ăn ===
  {
    name: "Hạt Royal Canin Cho Mèo Trưởng Thành - Bao 2kg",
    slug: "hat-royal-canin-meo-truong-thanh-2kg",
    categorySlug: "phu-kien",
    subCategory: "thuc-an",
    price: 320000,
    images: ["/supplies/hat-royal-canin-meo-truong-thanh-2kg-1.jpg"],
    description:
      "Thức ăn hạt cao cấp Royal Canin dành cho mèo trưởng thành, bổ sung đầy đủ dưỡng chất, hỗ trợ tiêu hoá và lông mượt.",
    stock: 40,
  },
  {
    name: "Hạt Cho Chó Trưởng Thành Vị Gà & Rau Củ - Bao 3kg",
    slug: "hat-cho-cho-truong-thanh-ga-rau-cu-3kg",
    categorySlug: "phu-kien",
    subCategory: "thuc-an",
    price: 290000,
    images: ["/supplies/hat-cho-cho-truong-thanh-ga-rau-cu-3kg-1.jpg", "/supplies/hat-cho-cho-truong-thanh-ga-rau-cu-3kg-2.jpg"],
    description:
      "Hạt khô giàu đạm từ thịt gà, bổ sung rau củ và chất xơ giúp bé tiêu hoá tốt, phù hợp chó trưởng thành mọi giống.",
    stock: 35,
  },
  {
    name: "Pate Cho Mèo Vị Cá Ngừ - Lốc 12 Hộp",
    slug: "pate-cho-meo-vi-ca-ngu-loc-12-hop",
    categorySlug: "phu-kien",
    subCategory: "thuc-an",
    price: 240000,
    images: ["/supplies/pate-cho-meo-vi-ca-ngu-loc-12-hop-1.jpg"],
    description:
      "Pate mềm thơm vị cá ngừ, bổ sung độ ẩm cho bé lười uống nước, dùng làm bữa chính hoặc topping trộn hạt.",
    stock: 50,
  },

  // === Đồ chơi ===
  {
    name: "Cần Câu Lông Vũ Cho Mèo",
    slug: "can-cau-long-vu-cho-meo",
    categorySlug: "phu-kien",
    subCategory: "do-choi",
    price: 65000,
    images: ["/supplies/can-cau-long-vu-cho-meo-1.jpg", "/supplies/can-cau-long-vu-cho-meo-2.jpg"],
    description:
      "Cần câu lông vũ kích thích bản năng săn mồi, giúp bé vận động mỗi ngày và gắn kết với chủ khi chơi cùng.",
    stock: 80,
  },
  {
    name: "Bóng Cao Su Gặm Cho Chó - Size M",
    slug: "bong-cao-su-gam-cho-cho-size-m",
    categorySlug: "phu-kien",
    subCategory: "do-choi",
    price: 89000,
    images: ["/supplies/bong-cao-su-gam-cho-cho-size-m-1.jpg", "/supplies/bong-cao-su-gam-cho-cho-size-m-2.jpg"],
    description:
      "Bóng cao su tự nhiên đàn hồi tốt, an toàn khi gặm, hỗ trợ làm sạch răng và giải toả năng lượng cho bé.",
    stock: 70,
  },
  {
    name: "Trụ Cào Móng Cho Mèo Bọc Dây Thừng",
    slug: "tru-cao-mong-cho-meo-boc-day-thung",
    categorySlug: "phu-kien",
    subCategory: "do-choi",
    price: 350000,
    images: ["/supplies/tru-cao-mong-cho-meo-boc-day-thung-1.jpg", "/supplies/tru-cao-mong-cho-meo-boc-day-thung-2.jpg"],
    description:
      "Trụ cào bọc dây thừng sisal bền chắc, giúp bé mài móng đúng chỗ và không cào vào sofa, thảm trong nhà.",
    stock: 30,
  },

  // === Chuồng & vận chuyển ===
  {
    name: "Lồng Vận Chuyển Thú Cưng Size M",
    slug: "long-van-chuyen-thu-cung-size-m",
    categorySlug: "phu-kien",
    subCategory: "chuong-van-chuyen",
    price: 450000,
    images: ["/supplies/long-van-chuyen-thu-cung-size-m-1.jpg"],
    description:
      "Lồng vận chuyển chắc chắn, thông thoáng, phù hợp cho mèo/chó nhỏ khi di chuyển hoặc đi khám thú y.",
    stock: 25,
  },
  {
    name: "Chuồng Sắt Sơn Tĩnh Điện Cho Chó - Size L",
    slug: "chuong-sat-son-tinh-dien-cho-cho-size-l",
    categorySlug: "phu-kien",
    subCategory: "chuong-van-chuyen",
    price: 1250000,
    images: ["/supplies/chuong-sat-son-tinh-dien-cho-cho-size-l-1.jpg"],
    description:
      "Chuồng sắt sơn tĩnh điện chống gỉ, có khay hứng tháo rời dễ vệ sinh, phù hợp chó cỡ trung và lớn.",
    stock: 12,
  },
  {
    name: "Nệm Ngủ Lông Cừu Cho Thú Cưng - Size M",
    slug: "nem-ngu-long-cuu-cho-thu-cung-size-m",
    categorySlug: "phu-kien",
    subCategory: "chuong-van-chuyen",
    price: 280000,
    images: ["/supplies/nem-ngu-long-cuu-cho-thu-cung-size-m-1.jpg"],
    description:
      "Nệm lông cừu mềm ấm, đáy chống trượt, tháo giặt máy được — chỗ ngủ êm ái cho bé quanh năm.",
    stock: 40,
  },

  // === Vệ sinh ===
  {
    name: "Cát Vệ Sinh Mèo Bentonite Khử Mùi - Bao 10kg",
    slug: "cat-ve-sinh-meo-bentonite-10kg",
    categorySlug: "phu-kien",
    subCategory: "ve-sinh",
    price: 180000,
    images: ["/supplies/cat-ve-sinh-meo-bentonite-10kg-1.jpg", "/supplies/cat-ve-sinh-meo-bentonite-10kg-2.jpg"],
    description:
      "Cát vệ sinh vón cục nhanh, khử mùi hiệu quả, an toàn cho thú cưng, dễ dàng dọn dẹp hằng ngày.",
    stock: 60,
  },
  {
    name: "Sữa Tắm Dưỡng Lông Cho Chó & Mèo - Chai 500ml",
    slug: "sua-tam-duong-long-cho-cho-meo-500ml",
    categorySlug: "phu-kien",
    subCategory: "ve-sinh",
    price: 150000,
    images: ["/supplies/sua-tam-duong-long-cho-cho-meo-500ml-1.jpg"],
    description:
      "Sữa tắm dịu nhẹ pH cân bằng, khử mùi và dưỡng lông mượt, dùng được cho cả chó và mèo từ 3 tháng tuổi.",
    stock: 45,
  },

  // === Phụ kiện khác ===
  {
    name: "Bát Ăn Đôi Inox Có Đế Chống Trượt",
    slug: "bat-an-doi-inox-de-chong-truot",
    categorySlug: "phu-kien",
    subCategory: "phu-kien-khac",
    price: 120000,
    images: ["/supplies/bat-an-doi-inox-de-chong-truot-1.jpg", "/supplies/bat-an-doi-inox-de-chong-truot-2.jpg"],
    description:
      "Bát đôi inox không gỉ đựng thức ăn và nước riêng, đế cao su chống trượt và chống đổ khi bé ăn.",
    stock: 55,
  },
  {
    name: "Vòng Cổ Da Kèm Lục Lạc - Size S/M",
    slug: "vong-co-da-kem-luc-lac-size-s-m",
    categorySlug: "phu-kien",
    subCategory: "phu-kien-khac",
    price: 95000,
    images: ["/supplies/vong-co-da-kem-luc-lac-size-s-m-1.jpg", "/supplies/vong-co-da-kem-luc-lac-size-s-m-2.jpg"],
    description:
      "Vòng cổ da mềm điều chỉnh được nhiều nấc, kèm lục lạc nhỏ giúp bạn dễ biết bé đang ở đâu trong nhà.",
    stock: 65,
  },
  {
    name: "Gói Spa Tắm Rửa & Cắt Tỉa Lông Cơ Bản",
    slug: "goi-spa-tam-rua-cat-tia-long-co-ban",
    categorySlug: "spa",
    price: 250000,
    images: ["/supplies/goi-spa-tam-rua-cat-tia-long-co-ban-1.jpg"],
    description:
      "Dịch vụ tắm gội, sấy lông, cắt tỉa móng và vệ sinh tai cơ bản cho mèo/chó, sử dụng sản phẩm chuyên dụng dịu nhẹ.",
    stock: 999,
  },
];

async function main() {
  console.log("Xoá dữ liệu cũ...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.breed.deleteMany();
  await prisma.user.deleteMany();

  console.log("Tạo tài khoản admin...");
  const email = process.env.ADMIN_EMAIL || "admin@petshop.vn";
  // Cố tình KHÔNG có mật khẩu mặc định. Repo này công khai, nên bất kỳ giá trị
  // mặc định nào viết ở đây đều là mật khẩu quản trị mà ai đọc repo cũng biết.
  // Thà dừng seed còn hơn tạo một tài khoản như vậy trên database thật.
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 8) {
    console.error("Thiếu ADMIN_PASSWORD, hoặc ngắn hơn 8 ký tự.");
    console.error('Thêm vào backend/.env:  ADMIN_PASSWORD="mat-khau-cua-ban"');
    throw new Error("ADMIN_PASSWORD chưa hợp lệ");
  }
  await prisma.user.create({
    data: {
      name: "Quản trị viên",
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: Role.ADMIN,
    },
  });
  console.log(`  -> ${email}`);

  // Hai tài khoản mẫu dùng mật khẩu "123456" ghi thẳng trong repo — tiện để
  // thử ở máy, nhưng trên database thật thì đó là cửa mở sẵn: tài khoản nhân
  // viên xem được tên, số điện thoại và địa chỉ của mọi khách đã đặt hàng.
  // Vì vậy chỉ tạo khi được yêu cầu rõ ràng bằng SEED_DEMO_USERS="true".
  if (process.env.SEED_DEMO_USERS === "true") {
    console.log("Tạo tài khoản nhân viên mẫu...");
    const staffEmail = "nhanvien@miewwl.vn";
    await prisma.user.create({
      data: {
        name: "Nhân viên cửa hàng",
        email: staffEmail,
        passwordHash: await bcrypt.hash("123456", 10),
        role: Role.STAFF,
      },
    });
    console.log(`  -> ${staffEmail} / 123456`);

    console.log("Tạo tài khoản khách hàng mẫu...");
    const customerEmail = "khachhang@gmail.com";
    await prisma.user.create({
      data: {
        name: "Nguyễn Văn A",
        email: customerEmail,
        passwordHash: await bcrypt.hash("123456", 10),
        role: Role.CUSTOMER,
        phone: "0901234567",
        address: "12 Nguyễn Huệ, Phường Bến Nghé",
        city: "TP. Hồ Chí Minh",
      },
    });
    console.log(`  -> ${customerEmail} / 123456`);
  } else {
    console.log("Bỏ qua tài khoản mẫu (đặt SEED_DEMO_USERS=\"true\" nếu muốn).");
  }

  console.log("Tạo danh mục...");
  const categoryBySlug = new Map<string, string>();
  for (const c of CATEGORIES) {
    const created = await prisma.category.create({ data: c });
    categoryBySlug.set(created.slug, created.id);
  }

  console.log("Tạo sản phẩm...");
  for (const { categorySlug, ...p } of PRODUCTS) {
    await prisma.product.create({
      data: { ...p, published: true, categoryId: categoryBySlug.get(categorySlug)! },
    });
  }

  console.log("Tạo danh sách giống...");
  for (const breed of BREEDS) {
    await prisma.breed.create({ data: { ...breed, published: true } });
  }

  console.log(
    `Xong: ${CATEGORIES.length} danh mục, ${PRODUCTS.length} sản phẩm, ${BREEDS.length} giống.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
