import { prisma } from "@/lib/prisma";
import { handle, ok } from "@/lib/http";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Danh sách tài khoản cho trang phân quyền. Không bao giờ trả `passwordHash`.
 * Lọc theo `?role=` khi cần xem riêng một nhóm.
 */
export const GET = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const url = new URL(req.url);
  const role = url.searchParams.get("role");

  const users = await prisma.user.findMany({
    where: role ? { role: role as never } : {},
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      city: true,
      createdAt: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
  });

  return ok(users);
});
