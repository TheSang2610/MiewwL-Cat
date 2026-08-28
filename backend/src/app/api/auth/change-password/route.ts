import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { changePasswordInput } from "@/lib/schemas";
import { createToken, requireAuth, revokeSessions, sessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Đổi mật khẩu cho chính tài khoản đang đăng nhập.
 *
 * Bắt nhập lại mật khẩu hiện tại chứ không chỉ dựa vào token: nếu ai đó mượn
 * được máy lúc khách quên đăng xuất, họ vẫn không đổi được mật khẩu để chiếm
 * luôn tài khoản.
 *
 * Id lấy từ token, không nhận từ body — nếu không thì đổi được mật khẩu người
 * khác chỉ bằng cách gửi id của họ.
 */
export const POST = handle(async (req: Request) => {
  const session = await requireAuth(req);
  const body = changePasswordInput.parse(await req.json());

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return fail("Không tìm thấy tài khoản", 404);

  const valid = await bcrypt.compare(body.currentPassword, user.passwordHash);
  if (!valid) return fail("Mật khẩu hiện tại không đúng", 401);

  if (body.currentPassword === body.newPassword) {
    return fail("Mật khẩu mới phải khác mật khẩu hiện tại", 422);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(body.newPassword, 10) },
  });

  // Đổi mật khẩu phải đá mọi thiết bị khác ra — đó chính là việc người dùng
  // mong đợi khi họ nghi ngờ tài khoản bị lộ.
  const validFrom = await revokeSessions(user.id);

  // Nhưng KHÔNG đá luôn thiết bị đang thao tác: phát token mới, đóng dấu thời
  // gian tại đúng mốc vừa thu hồi để nó không bị chính mốc đó loại bỏ.
  const token = await createToken(
    { id: user.id, email: user.email, role: user.role },
    validFrom
  );
  const res = ok({ changed: true, token });
  res.headers.set("Set-Cookie", sessionCookie(token));
  return res;
});
