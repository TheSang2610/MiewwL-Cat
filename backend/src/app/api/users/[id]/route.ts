import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { userRolePatch } from "@/lib/schemas";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const PUBLIC_FIELDS = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  address: true,
  city: true,
  createdAt: true,
} as const;

/**
 * Đổi vai trò một tài khoản.
 *
 * Ba chốt chặn:
 *  - người thực hiện phải là ADMIN (đọc từ token, không từ body);
 *  - không tự đổi vai trò của chính mình (tránh tự khoá mình ra ngoài);
 *  - không hạ quyền ADMIN cuối cùng, nếu không sẽ không còn ai phân quyền được.
 */
export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const body = userRolePatch.parse(await req.json());

  // Danh tính người thực hiện lấy từ token đã ký, KHÔNG lấy từ body —
  // `actorId` do client gửi lên thì ai cũng khai mình là admin được.
  const actor = await requireRole(req, "ADMIN");

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return fail("Không tìm thấy tài khoản", 404);

  if (target.id === actor.id) {
    return fail("Không thể tự đổi vai trò của chính mình.", 409);
  }

  if (target.role === "ADMIN" && body.role !== "ADMIN") {
    const admins = await prisma.user.count({ where: { role: "ADMIN" } });
    if (admins <= 1) {
      return fail("Phải còn ít nhất một tài khoản quản trị.", 409);
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role: body.role },
    select: PUBLIC_FIELDS,
  });

  return ok(user);
});
