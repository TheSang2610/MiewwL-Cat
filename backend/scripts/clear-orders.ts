/**
 * Wipes all orders (dev utility for resetting test data).
 * Run with: npx tsx scripts/clear-orders.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  const { count } = await prisma.order.deleteMany();
  console.log(`Đã xoá ${count} đơn hàng.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
