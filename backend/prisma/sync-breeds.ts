/**
 * Đồng bộ catalogue giống từ `breeds.ts` xuống database.
 *
 * Khác `seed.ts` ở chỗ KHÔNG xoá gì cả: giống đã có thì cập nhật theo slug,
 * giống mới thì tạo thêm. Đơn hàng, tài khoản và lịch spa giữ nguyên.
 *
 *   npm run db:breeds
 */
import { PrismaClient } from "@prisma/client";
import { BREEDS } from "./breeds";

const prisma = new PrismaClient();

async function main() {
  let created = 0;
  let updated = 0;

  for (const breed of BREEDS) {
    const existing = await prisma.breed.findUnique({ where: { slug: breed.slug } });
    if (existing) {
      await prisma.breed.update({ where: { slug: breed.slug }, data: breed });
      updated += 1;
    } else {
      await prisma.breed.create({ data: { ...breed, published: true } });
      created += 1;
      console.log(`  + ${breed.name}`);
    }
  }

  const total = await prisma.breed.count();
  console.log(`Giống: tạo mới ${created}, cập nhật ${updated}. Tổng trong DB: ${total}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
