/**
 * Đối chiếu sâu hai database sau khi chép.
 *
 * Đếm bằng nhau chưa chứng minh được gì: nếu `id` bị sinh lại thì số lượng vẫn
 * khớp nhưng mọi liên kết đứt hết — đơn hàng mất dòng hàng, sản phẩm mất giống.
 * Script này kiểm tra đúng chỗ đó.
 *
 *   npx tsx scripts/db-verify-copy.ts "<url-cu>" "<url-moi>"
 */
import { PrismaClient } from "@prisma/client";

const [oldUrl, newUrl] = process.argv.slice(2);
const from = new PrismaClient({ datasourceUrl: oldUrl });
const to = new PrismaClient({ datasourceUrl: newUrl });

const out: string[] = [];
const check = (label: string, ok: boolean, extra = "") =>
  out.push(`${ok ? "PASS" : "FAIL"}  ${label}${extra ? "  -- " + extra : ""}`);

async function main() {
  // 1. Bộ id có trùng khít không — chứng minh id được giữ nguyên, không sinh lại
  for (const m of ["product", "order", "breed", "user"] as const) {
    const a = (await (from[m] as unknown as { findMany: (x: unknown) => Promise<{ id: string }[]> })
      .findMany({ select: { id: true } })).map((r) => r.id).sort();
    const b = (await (to[m] as unknown as { findMany: (x: unknown) => Promise<{ id: string }[]> })
      .findMany({ select: { id: true } })).map((r) => r.id).sort();
    check(`${m}: id giu nguyen`, JSON.stringify(a) === JSON.stringify(b), `${a.length} id`);
  }

  // 2. Mọi dòng hàng phải trỏ tới một đơn có thật
  const items = await to.orderItem.findMany({ select: { orderId: true } });
  const orderIds = new Set((await to.orderItem.findMany({ select: { orderId: true } })).map((i) => i.orderId));
  const realOrders = new Set((await to.order.findMany({ select: { id: true } })).map((o) => o.id));
  const orphanItems = [...orderIds].filter((id) => !realOrders.has(id));
  check("moi dong hang tro toi don co that", orphanItems.length === 0,
    `${items.length} dong, ${orphanItems.length} mo coi`);

  // 3. Đơn hàng đọc kèm dòng hàng vẫn ra đủ
  const withItems = await to.order.findMany({ include: { items: true } });
  const totalItems = withItems.reduce((s, o) => s + o.items.length, 0);
  check("doc don kem dong hang", totalItems === items.length, `${totalItems}/${items.length}`);

  // 4. Sản phẩm còn nối đúng danh mục (breed chỉ là chuỗi tên, không phải quan hệ)
  const prods = await to.product.findMany({ include: { category: true } });
  const badCat = prods.filter((p) => !p.category);
  check("san pham con noi dung danh muc", badCat.length === 0,
    `${prods.length} san pham, ${badCat.length} hong`);

  // Tên giống ghi trong sản phẩm vẫn phải khớp từng ký tự với bên cũ
  const oldProds = await from.product.findMany({ select: { id: true, breed: true, slug: true } });
  const newById = new Map(prods.map((p) => [p.id, p]));
  const breedDrift = oldProds.filter((o) => newById.get(o.id)?.breed !== o.breed);
  check("ten giong trong san pham khong doi", breedDrift.length === 0,
    breedDrift.map((p) => p.slug).slice(0, 3).join(", "));

  // 5. Ảnh trong bảng upload còn nguyên từng byte
  const upOld = await from.upload.findMany();
  const upNew = await to.upload.findMany();
  const sameBytes = upOld.every((o) => {
    const n = upNew.find((x) => x.id === o.id);
    return n && Buffer.from(o.data).equals(Buffer.from(n.data));
  });
  check("anh upload nguyen ven tung byte", sameBytes,
    `${upOld.length} anh, ${upOld.reduce((s, u) => s + u.size, 0)} bytes`);

  // 6. Mật khẩu admin chép sang vẫn là chuỗi băm cũ
  const aOld = await from.user.findFirst({ where: { role: "ADMIN" } });
  const aNew = await to.user.findFirst({ where: { role: "ADMIN" } });
  check("tai khoan admin va mat khau con nguyen",
    !!aOld && !!aNew && aOld.email === aNew.email && aOld.passwordHash === aNew.passwordHash,
    aNew?.email);

  console.log(out.join("\n"));
  const failed = out.filter((l) => l.startsWith("FAIL"));
  console.log(`\n${out.length - failed.length}/${out.length} PASS` +
    (failed.length ? "  => CO LOI" : "  => TAT CA PASS"));
  if (failed.length) process.exitCode = 1;
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
