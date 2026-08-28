import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { registerInput } from "@/lib/schemas";
import { createToken, sessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Đăng ký tài khoản khách hàng. Luôn tạo với role CUSTOMER — không cho
 * client tự chọn role, tránh tự nâng quyền thành ADMIN.
 */
export const POST = handle(async (req: Request) => {
  const body = registerInput.parse(await req.json());
  const email = body.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return fail("Email này đã được đăng ký", 409);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email,
      phone: body.phone,
      passwordHash: await bcrypt.hash(body.password, 10),
      // role mặc định CUSTOMER trong schema — cố ý không nhận từ body.
    },
  });

  // Phát token luôn để khách đăng ký xong là dùng được ngay, không phải
  // quay lại màn đăng nhập.
  const token = await createToken({ id: user.id, email: user.email, role: user.role });

  const res = ok(
    {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
    },
    201
  );

  res.headers.set("Set-Cookie", sessionCookie(token));
  return res;
});
