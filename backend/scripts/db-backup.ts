/**
 * Xuất toàn bộ database ra một file JSON để phòng hờ trước khi chép/xoá.
 *
 *   npx tsx scripts/db-backup.ts "<url>" "<duong-dan-file>"
 *
 * Trường Bytes (ảnh trong bảng upload) được đổi sang base64 để JSON chứa được.
 */
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "node:fs";

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error('Thieu tham so: npx tsx scripts/db-backup.ts "<url>" "<file>"');
  process.exit(1);
}

const prisma = new PrismaClient({ datasourceUrl: url });

const MODELS = [
  "category",
  "breed",
  "user",
  "product",
  "order",
  "orderItem",
  "spaBooking",
  "subscriber",
  "upload",
] as const;

async function main() {
  const dump: Record<string, unknown[]> = {};
  let total = 0;
  for (const m of MODELS) {
    const rows = await (prisma[m] as unknown as { findMany: () => Promise<unknown[]> }).findMany();
    dump[m] = rows;
    total += rows.length;
  }

  writeFileSync(
    out,
    JSON.stringify(
      dump,
      (_k, v) => {
        // Buffer (ảnh) -> base64, nếu không JSON.stringify đẻ ra mảng số rất dài.
        if (v && typeof v === "object" && (v as { type?: string }).type === "Buffer") {
          return { $bytes: Buffer.from((v as { data: number[] }).data).toString("base64") };
        }
        return v;
      },
      2
    ),
    "utf8"
  );
  console.log(`Da luu ${total} ban ghi vao ${out}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
