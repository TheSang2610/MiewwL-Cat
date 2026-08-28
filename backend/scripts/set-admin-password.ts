/**
 * Đổi mật khẩu của một tài khoản, chạy thẳng từ dòng lệnh.
 *
 * Dùng khi chính quản trị viên quên mật khẩu — lúc đó không vào được khu quản
 * trị nên không bấm được nút "Đặt lại mật khẩu" ở trang phân quyền, mà cũng
 * không chạy `db:seed` được vì seed xoá sạch đơn hàng và sản phẩm.
 *
 * Cách chạy (trong thư mục `backend`):
 *   npm run admin:password -- "mat-khau-moi"
 *   npm run admin:password -- "mat-khau-moi" email@khac.com
 *
 * Bỏ trống email thì lấy ADMIN_EMAIL trong `.env`.
 *
 * Script này đọc DATABASE_URL trong `.env`, nên nó sửa đúng database mà biến
 * đó đang trỏ tới. Muốn đổi mật khẩu trên database thật thì trỏ DATABASE_URL
 * vào đó trước — và nhớ trỏ lại sau khi xong.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.argv[2];
  const email = process.argv[3] || process.env.ADMIN_EMAIL;

  if (!password || password.length < 8) {
    console.error("Thiếu mật khẩu mới, hoặc ngắn hơn 8 ký tự.");
    console.error('  npm run admin:password -- "mat-khau-moi"');
    process.exitCode = 1;
    return;
  }
  if (!email) {
    console.error("Không biết đổi cho ai: thiếu tham số email và thiếu ADMIN_EMAIL trong .env.");
    process.exitCode = 1;
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`Không có tài khoản nào dùng email ${email}.`);
    process.exitCode = 1;
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
      // Đá mọi phiên đang đăng nhập của tài khoản này. Nếu lý do đổi mật khẩu
      // là nghi bị lộ thì để token cũ sống tiếp coi như chưa đổi gì.
      sessionsValidFrom: new Date(Date.now() + 1000),
    },
  });

  console.log(`Đã đổi mật khẩu cho ${email} (vai trò ${user.role}).`);
  console.log("Mọi thiết bị đang đăng nhập tài khoản này đã bị đăng xuất.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
