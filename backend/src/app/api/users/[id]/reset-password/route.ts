import { randomInt } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { requireRole, revokeSessions } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Bỏ các ký tự dễ đọc nhầm qua điện thoại: O/0, I/l/1. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

/** Mật khẩu tạm 12 ký tự, sinh bằng nguồn ngẫu nhiên của hệ điều hành. */
function temporaryPassword(): string {
  let out = "";
  for (let i = 0; i < 12; i += 1) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

/**
 * Quản trị đặt lại mật khẩu giúp khách quên mật khẩu.
 *
 * Website chưa gửi được email nên không thể tự động hoá bằng link đặt lại. Quy
 * trình thực tế: khách gọi hotline → nhân viên xác minh danh tính → quản trị
 * bấm nút này → đọc mật khẩu tạm cho khách → khách đăng nhập rồi tự đổi ở
 * trang tài khoản.
 *
 * Ba chốt chặn:
 *  - chỉ ADMIN được gọi;
 *  - không tự đặt lại mật khẩu của chính mình (dùng đổi mật khẩu thường, vì
 *    cách đó bắt nhập lại mật khẩu cũ nên an toàn hơn);
 *  - mọi phiên cũ của tài khoản đó bị thu hồi ngay.
 *
 * Mật khẩu tạm chỉ trả về ĐÚNG MỘT LẦN trong phản hồi này; server không lưu
 * bản rõ ở đâu cả.
 */
export const POST = handle(async (req: Request, ctx: Ctx) => {
  const actor = await requireRole(req, "ADMIN");
  const { id } = await ctx.params;

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return fail("Không tìm thấy tài khoản", 404);

  if (target.id === actor.id) {
    return fail(
      "Không thể tự đặt lại mật khẩu của chính mình — hãy dùng chức năng đổi mật khẩu.",
      409
    );
  }

  const password = temporaryPassword();
  await prisma.user.update({
    where: { id: target.id },
    data: { passwordHash: await bcrypt.hash(password, 10) },
  });
  await revokeSessions(target.id);

  return ok({ email: target.email, temporaryPassword: password });
});
