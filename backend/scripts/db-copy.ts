/**
 * Chép toàn bộ dữ liệu từ database cũ sang database mới.
 *
 * MongoDB không có lệnh đổi tên database, nên "đổi tên" thực chất là chép sang
 * tên mới rồi xoá cái cũ. Script này chỉ làm phần CHÉP — cố ý không xoá gì,
 * để còn đối chiếu trước khi bỏ database cũ đi.
 *
 *   npx tsx scripts/db-copy.ts "<url-cu>" "<url-moi>"
 *
 * Giữ nguyên `id` của mọi bản ghi, nên các liên kết (đơn hàng ↔ dòng hàng,
 * sản phẩm ↔ giống ↔ danh mục) vẫn trỏ đúng sau khi chép.
 */
import { PrismaClient } from "@prisma/client";

const [oldUrl, newUrl] = process.argv.slice(2);
if (!oldUrl || !newUrl) {
  console.error('Thieu tham so: npx tsx scripts/db-copy.ts "<url-cu>" "<url-moi>"');
  process.exit(1);
}

const from = new PrismaClient({ datasourceUrl: oldUrl });
const to = new PrismaClient({ datasourceUrl: newUrl });

const dbName = (u: string) => u.split("/").pop()?.split("?")[0] ?? "?";

/**
 * Thứ tự quan trọng: bảng được trỏ tới phải có trước bảng trỏ đến nó, để nếu
 * script dừng giữa chừng thì phần đã chép vẫn là một khối dữ liệu đọc được.
 */
const STEPS = [
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
  console.log(`Chep tu "${dbName(oldUrl)}"  ->  "${dbName(newUrl)}"`);

  // Không ghi đè lên database đang có dữ liệu: nếu người chạy trỏ nhầm vào một
  // database thật thì createMany sẽ nhân đôi mọi thứ, rất khó gỡ.
  let existing = 0;
  for (const m of STEPS) {
    existing += await (to[m] as unknown as { count: () => Promise<number> }).count();
  }
  if (existing > 0) {
    console.error(`Dung lai: "${dbName(newUrl)}" da co ${existing} ban ghi.`);
    console.error("Script nay chi chep vao database rong.");
    process.exitCode = 1;
    return;
  }

  let total = 0;
  for (const m of STEPS) {
    const src = from[m] as unknown as { findMany: () => Promise<unknown[]> };
    const dst = to[m] as unknown as {
      createMany: (a: { data: unknown[] }) => Promise<{ count: number }>;
    };

    const rows = await src.findMany();
    if (rows.length === 0) {
      console.log(`  ${m.padEnd(12)} 0 (bo qua)`);
      continue;
    }
    const { count } = await dst.createMany({ data: rows });
    console.log(`  ${m.padEnd(12)} ${count}`);
    total += count;
  }
  console.log(`  ${"TONG".padEnd(12)} ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await from.$disconnect();
    await to.$disconnect();
  });
