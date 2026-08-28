import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { handle, ok } from "@/lib/http";
import { requireRole } from "@/lib/auth";
import { subscriberInput } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/** Danh sách email đã đăng ký, mới nhất trước. Dùng cho trang quản trị. */
export const GET = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  return ok(subscribers);
});

/**
 * Đăng ký nhận tin ở chân trang.
 *
 * Email trùng KHÔNG bị coi là lỗi: người dùng bấm lại lần nữa vẫn thấy báo
 * thành công, vì với họ kết quả là như nhau — đã nằm trong danh sách. Trả 409
 * ở đây chỉ tổ tiết lộ ai đã đăng ký rồi.
 */
export const POST = handle(async (req: Request) => {
  const body = subscriberInput.parse(await req.json());
  const email = body.email.trim().toLowerCase();

  try {
    const subscriber = await prisma.subscriber.create({
      data: { email, source: body.source ?? "footer" },
    });
    return ok({ email: subscriber.email, created: true }, 201);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return ok({ email, created: false });
    }
    throw err;
  }
});
