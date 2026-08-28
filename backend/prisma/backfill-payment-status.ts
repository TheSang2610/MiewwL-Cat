// Chạy một lần sau khi bỏ MOMO và thêm `paymentStatus`:
//   npx tsx prisma/backfill-payment-status.ts
//
// MongoDB không có schema nên document cũ vẫn giữ nguyên dữ liệu cũ:
//   - đơn tạo trước đây không có field `paymentStatus` -> Prisma đọc lên lỗi;
//   - đơn từng chọn MoMo vẫn mang paymentMethod "MOMO", giá trị không còn
//     trong enum -> `order.findMany()` hỏng cả danh sách.
// Phải sửa bằng lệnh Mongo thô vì Prisma không đọc nổi chính những đơn này.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const res = (await prisma.$runCommandRaw({
    update: "Order",
    updates: [
      // MoMo cũng là chuyển khoản qua QR nên gộp về BANK.
      {
        q: { paymentMethod: "MOMO" },
        u: { $set: { paymentMethod: "BANK" } },
        multi: true,
      },
      // Đơn cũ chưa từng được đối soát -> UNPAID.
      {
        q: { paymentStatus: { $exists: false } },
        u: { $set: { paymentStatus: "UNPAID" } },
        multi: true,
      },
    ],
  })) as { nModified?: number };

  console.log(`Đã cập nhật ${res.nModified ?? 0} đơn.`);

  const total = await prisma.order.count();
  console.log(`Đọc lại được ${total} đơn — không còn giá trị enum lạ.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
