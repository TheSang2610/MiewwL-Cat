import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { readSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Hồ sơ của phiên đang đăng nhập.
 *
 * Frontend còn dùng route này để DÒ xem cookie có tới được không: gọi kèm
 * `credentials: "include"` nhưng KHÔNG gửi header `Authorization`. Trả 200 tức
 * là cookie hoạt động → bỏ token khỏi localStorage. Trả 401 tức là hai bên
 * khác site → giữ token làm đường dự phòng.
 */
export const GET = handle(async (req: Request) => {
  const session = await readSession(req);
  if (!session) return fail("Chưa đăng nhập", 401);

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      city: true,
    },
  });
  if (!user) return fail("Không tìm thấy tài khoản", 404);

  return ok(user);
});
