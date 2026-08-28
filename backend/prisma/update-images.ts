/**
 * Đồng bộ ảnh giống và ảnh thú cưng từ `breeds.ts` / `seed.ts` xuống database,
 * KHÔNG xoá dữ liệu như `seed.ts`.
 *
 * Dùng khi chỉ muốn đổi ảnh mà vẫn giữ nguyên đơn hàng, tài khoản, lịch spa:
 *   npm run db:images
 */
import { PrismaClient } from "@prisma/client";
import { BREEDS } from "./breeds";

const prisma = new PrismaClient();

/** Ảnh của từng bé đang bán, lấy theo giống. Khớp `slug` trong bảng Product. */
const PET_IMAGES: Record<string, string[]> = {
  "meo-anh-long-ngan-xanh-khoi": [
    "/breeds/british-shorthair-2.jpg",
    "/breeds/british-shorthair-3.jpg",
    "/breeds/british-shorthair-4.jpg",
  ],
  "meo-ba-tu-long-trang-mat-xanh": [
    "/breeds/persian-2.jpg",
    "/breeds/persian-3.jpg",
    "/breeds/persian-1.jpg",
  ],
  "meo-scottish-fold-tai-cup": [
    "/breeds/scottish-fold-2.jpg",
    "/breeds/scottish-fold-3.jpg",
    "/breeds/scottish-fold-4.jpg",
  ],
  "meo-munchkin-chan-ngan": [
    "/breeds/munchkin-2.jpg",
    "/breeds/munchkin-3.jpg",
    "/breeds/munchkin-4.jpg",
  ],
  "cho-poodle-tiny-nau-do": [
    "/breeds/poodle-2.jpg",
    "/breeds/poodle-3.jpg",
    "/breeds/poodle-4.jpg",
  ],
  "cho-corgi-chan-ngan-duoi-cut": [
    "/breeds/corgi-2.jpg",
    "/breeds/corgi-3.jpg",
    "/breeds/corgi-4.jpg",
  ],
};

/** Ảnh phụ kiện & thức ăn, khớp `slug` trong bảng Product. */
const SUPPLY_IMAGES: Record<string, string[]> = {
  "bat-an-doi-inox-de-chong-truot": [
    "/supplies/bat-an-doi-inox-de-chong-truot-1.jpg",
    "/supplies/bat-an-doi-inox-de-chong-truot-2.jpg",
  ],
  "bong-cao-su-gam-cho-cho-size-m": [
    "/supplies/bong-cao-su-gam-cho-cho-size-m-1.jpg",
    "/supplies/bong-cao-su-gam-cho-cho-size-m-2.jpg",
  ],
  "can-cau-long-vu-cho-meo": [
    "/supplies/can-cau-long-vu-cho-meo-1.jpg",
    "/supplies/can-cau-long-vu-cho-meo-2.jpg",
  ],
  "cat-ve-sinh-meo-bentonite-10kg": [
    "/supplies/cat-ve-sinh-meo-bentonite-10kg-1.jpg",
    "/supplies/cat-ve-sinh-meo-bentonite-10kg-2.jpg",
  ],
  "chuong-sat-son-tinh-dien-cho-cho-size-l": [
    "/supplies/chuong-sat-son-tinh-dien-cho-cho-size-l-1.jpg",
  ],
  "goi-spa-tam-rua-cat-tia-long-co-ban": [
    "/supplies/goi-spa-tam-rua-cat-tia-long-co-ban-1.jpg",
  ],
  "hat-cho-cho-truong-thanh-ga-rau-cu-3kg": [
    "/supplies/hat-cho-cho-truong-thanh-ga-rau-cu-3kg-1.jpg",
    "/supplies/hat-cho-cho-truong-thanh-ga-rau-cu-3kg-2.jpg",
  ],
  "hat-royal-canin-meo-truong-thanh-2kg": [
    "/supplies/hat-royal-canin-meo-truong-thanh-2kg-1.jpg",
  ],
  "long-van-chuyen-thu-cung-size-m": [
    "/supplies/long-van-chuyen-thu-cung-size-m-1.jpg",
  ],
  "nem-ngu-long-cuu-cho-thu-cung-size-m": [
    "/supplies/nem-ngu-long-cuu-cho-thu-cung-size-m-1.jpg",
  ],
  "pate-cho-meo-vi-ca-ngu-loc-12-hop": [
    "/supplies/pate-cho-meo-vi-ca-ngu-loc-12-hop-1.jpg",
  ],
  "sua-tam-duong-long-cho-cho-meo-500ml": [
    "/supplies/sua-tam-duong-long-cho-cho-meo-500ml-1.jpg",
  ],
  "tru-cao-mong-cho-meo-boc-day-thung": [
    "/supplies/tru-cao-mong-cho-meo-boc-day-thung-1.jpg",
    "/supplies/tru-cao-mong-cho-meo-boc-day-thung-2.jpg",
  ],
  "vong-co-da-kem-luc-lac-size-s-m": [
    "/supplies/vong-co-da-kem-luc-lac-size-s-m-1.jpg",
    "/supplies/vong-co-da-kem-luc-lac-size-s-m-2.jpg",
  ],
};

async function main() {
  let breedCount = 0;
  for (const breed of BREEDS) {
    const res = await prisma.breed.updateMany({
      where: { slug: breed.slug },
      data: { image: breed.image, images: breed.images },
    });
    breedCount += res.count;
  }
  console.log(`Giống: cập nhật ảnh cho ${breedCount}/${BREEDS.length} bản ghi.`);

  let petCount = 0;
  for (const [slug, images] of Object.entries(PET_IMAGES)) {
    const res = await prisma.product.updateMany({ where: { slug }, data: { images } });
    if (res.count === 0) console.warn(`  ! không tìm thấy sản phẩm slug "${slug}"`);
    petCount += res.count;
  }
  console.log(`Thú cưng: cập nhật ảnh cho ${petCount} bản ghi.`);

  let supplyCount = 0;
  for (const [slug, images] of Object.entries(SUPPLY_IMAGES)) {
    const res = await prisma.product.updateMany({ where: { slug }, data: { images } });
    if (res.count === 0) console.warn(`  ! không tìm thấy sản phẩm slug "${slug}"`);
    supplyCount += res.count;
  }
  console.log(`Phụ kiện: cập nhật ảnh cho ${supplyCount} bản ghi.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
