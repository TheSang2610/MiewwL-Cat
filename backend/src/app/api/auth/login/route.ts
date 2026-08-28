import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { loginInput } from "@/lib/schemas";
import { createToken, sessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Kiểm tra mật khẩu rồi phát token cho phiên đăng nhập.
 *
 * Client phải giữ `token` và gửi kèm `Authorization: Bearer <token>` ở mọi
 * request cần quyền. Token hết hạn sau 7 ngày.
 */
export const POST = handle(async (req: Request) => {
  const body = loginInput.parse(await req.json());

  const email = body.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return fail("Email hoặc mật khẩu không chính xác", 401);

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) return fail("Email hoặc mật khẩu không chính xác", 401);

  // Mốc thu hồi phiên có thể nằm ở tương lai gần (đăng xuất xong đăng nhập lại
  // ngay). Đóng dấu token tại mốc đó để nó không bị chính mốc đó loại bỏ —
  // đăng nhập thì luôn phải ra được một phiên dùng được.
  // `iat` mặc định của JWT được LÀM TRÒN XUỐNG tới giây, nên nó có thể rơi vào
  // trước mốc thu hồi dù đồng hồ thật đã qua mốc. So với chính con số làm tròn
  // đó, không so với `Date.now()`.
  const validFrom = user.sessionsValidFrom;
  const defaultIatMs = Math.floor(Date.now() / 1000) * 1000;
  const issuedAt =
    validFrom && validFrom.getTime() > defaultIatMs ? validFrom : undefined;

  const token = await createToken(
    { id: user.id, email: user.email, role: user.role },
    issuedAt
  );

  const res = ok({
    token,
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    city: user.city,
  });

  // Cookie HttpOnly là đường chính; `token` trong body chỉ để dự phòng khi
  // web và API nằm khác site nên cookie không tới được.
  res.headers.set("Set-Cookie", sessionCookie(token));
  return res;
});
