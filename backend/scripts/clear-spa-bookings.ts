/**
 * Wipes all spa bookings (dev utility for resetting test data).
 * Run with: npx tsx scripts/clear-spa-bookings.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const { count } = await prisma.spaBooking.deleteMany();
  console.log(`Đã xoá ${count} yêu cầu giữ chỗ spa.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
