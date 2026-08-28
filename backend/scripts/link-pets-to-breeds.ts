/**
 * Nối các bé đang bán với thư viện giống, dựa trên chuỗi `breed` gõ tay cũ.
 *
 * Chạy một lần khi chuyển từ so khớp theo tên sang khoá `breedId`. Sau đó trang
 * quản trị chọn giống từ danh sách nên không sinh thêm bản lệch nữa.
 *
 *   npx tsx scripts/link-pets-to-breeds.ts          # chỉ xem, không ghi
 *   npx tsx scripts/link-pets-to-breeds.ts --apply  # ghi thật
 *
 * So khớp theo thứ tự ưu tiên, dừng ở bước đầu tiên tìm được đúng MỘT kết quả:
 *   1. tên trùng khít
 *   2. tên hoặc alias của giống chứa trọn chuỗi đã gõ ("Poodle" -> "Poodle Tiny")
 *   3. chuỗi đã gõ chứa trọn tên giống ("Corgi có đuôi" -> "Corgi")
 *
 * Ra nhiều hơn một kết quả thì bỏ qua và in ra để người thật quyết định — đoán
 * bừa ở đây nghĩa là gắn bé vào nhầm giống, sai âm thầm và rất khó phát hiện.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

/** Bỏ dấu tiếng Việt và gom khoảng trắng để so khớp không bị lệch vì dấu. */
function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const [pets, breeds] = await Promise.all([
    prisma.product.findMany({
      where: { breed: { not: null } },
      select: { id: true, name: true, breed: true, breedId: true },
    }),
    prisma.breed.findMany({ select: { id: true, name: true, alias: true } }),
  ]);

  console.log(`${pets.length} bé có ghi giống, ${breeds.length} giống trong thư viện`);
  if (!APPLY) console.log("(chạy thử — thêm --apply để ghi thật)\n");

  let linked = 0;
  const unresolved: string[] = [];

  for (const pet of pets) {
    const typed = norm(pet.breed ?? "");
    const cands = breeds.map((b) => ({ b, n: norm(b.name), a: norm(b.alias ?? "") }));

    const exact = cands.filter((c) => c.n === typed || c.a === typed);
    const contains = cands.filter((c) => c.n.includes(typed) || c.a.includes(typed));
    const contained = cands.filter((c) => typed.includes(c.n));

    const hit =
      exact.length === 1 ? exact[0]
      : contains.length === 1 ? contains[0]
      : contained.length === 1 ? contained[0]
      : null;

    if (!hit) {
      const why = exact.length > 1 || contains.length > 1 || contained.length > 1
        ? `mơ hồ: ${[...new Set([...exact, ...contains, ...contained].map((c) => c.b.name))].join(", ")}`
        : "không tìm thấy giống nào khớp";
      unresolved.push(`  "${pet.breed}" (${pet.name}) -> ${why}`);
      continue;
    }

    console.log(`  "${pet.breed}"  ->  ${hit.b.name}`);
    if (APPLY) {
      await prisma.product.update({
        where: { id: pet.id },
        // Đồng bộ luôn tên hiển thị theo thư viện, để trang khách không còn
        // chỗ ghi "Poodle" chỗ ghi "Poodle Tiny" cho cùng một giống.
        data: { breedId: hit.b.id, breed: hit.b.name },
      });
    }
    linked++;
  }

  console.log(`\nnối được ${linked}/${pets.length}`);
  if (unresolved.length) {
    console.log("cần người xử lý tay:");
    console.log(unresolved.join("\n"));
  }
  if (!APPLY && linked > 0) console.log("\nChạy lại với --apply để ghi.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
