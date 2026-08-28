/**
 * Read-only: reports what collections/documents the connected database holds.
 * Run with: npx tsx scripts/inspect-db.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const listing = (await prisma.$runCommandRaw({ listCollections: 1 })) as {
    cursor?: { firstBatch?: { name: string }[] };
  };
  const names = (listing.cursor?.firstBatch ?? []).map((c) => c.name).sort();

  console.log(`Database has ${names.length} collection(s):\n`);
  for (const name of names) {
    const res = (await prisma.$runCommandRaw({ count: name })) as { n?: number };
    const sample = (await prisma.$runCommandRaw({
      find: name,
      limit: 1,
    })) as { cursor?: { firstBatch?: Record<string, unknown>[] } };
    const doc = sample.cursor?.firstBatch?.[0];
    console.log(`  ${name}: ${res.n ?? 0} document(s)`);
    if (doc) console.log(`    fields: ${Object.keys(doc).join(", ")}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
