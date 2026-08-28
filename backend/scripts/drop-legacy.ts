/**
 * One-off: drops collections left over from the old baby-clothing schema.
 * Safe to delete this file once the database is clean.
 * Run with: npx tsx scripts/drop-legacy.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const LEGACY_COLLECTIONS = [
  "ProductImage",
  "ProductVariant",
  "Baby_store",
  "Account",
  "Session",
  "VerificationToken",
];

async function main() {
  for (const name of LEGACY_COLLECTIONS) {
    try {
      await prisma.$runCommandRaw({ drop: name });
      console.log(`dropped ${name}`);
    } catch {
      console.log(`skip ${name} (không tồn tại)`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
