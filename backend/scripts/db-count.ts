/** Đếm số bản ghi trong database mà DATABASE_URL đang trỏ tới. */
import { PrismaClient } from "@prisma/client";

const url = process.argv[2] || process.env.DATABASE_URL;
const prisma = new PrismaClient({ datasourceUrl: url });

async function main() {
  const dbName = (url || "").split("/").pop()?.split("?")[0];
  console.log(`database: ${dbName}`);
  const counts = {
    category: await prisma.category.count(),
    breed: await prisma.breed.count(),
    user: await prisma.user.count(),
    product: await prisma.product.count(),
    order: await prisma.order.count(),
    orderItem: await prisma.orderItem.count(),
    spaBooking: await prisma.spaBooking.count(),
    subscriber: await prisma.subscriber.count(),
    upload: await prisma.upload.count(),
  };
  let total = 0;
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k.padEnd(12)} ${v}`);
    total += v;
  }
  console.log(`  ${"TONG".padEnd(12)} ${total}`);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
