import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/**
 * Trả về chính file ảnh. CÔNG KHAI — ảnh sản phẩm thì ai xem web cũng phải
 * thấy được.
 *
 * Nội dung một id không bao giờ đổi (muốn ảnh khác thì tải file khác, sinh id
 * khác), nên đặt cache vĩnh viễn `immutable`: trình duyệt và CDN chỉ tải một
 * lần duy nhất.
 */
export const GET = handle(async (_req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;

  // ObjectId phải đúng 24 ký tự hex; kiểm trước để Prisma khỏi ném lỗi thô.
  if (!/^[0-9a-f]{24}$/i.test(id)) return fail("Không tìm thấy ảnh", 404);

  const upload = await prisma.upload.findUnique({ where: { id } });
  if (!upload) return fail("Không tìm thấy ảnh", 404);

  return new Response(new Uint8Array(upload.data), {
    headers: {
      "Content-Type": upload.mimeType,
      "Content-Length": String(upload.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});

/** Xoá ảnh khỏi kho. Chỉ quản trị. */
export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(req, "ADMIN");
  const { id } = await ctx.params;

  if (!/^[0-9a-f]{24}$/i.test(id)) return fail("Không tìm thấy ảnh", 404);

  const upload = await prisma.upload.findUnique({ where: { id }, select: { id: true } });
  if (!upload) return fail("Không tìm thấy ảnh", 404);

  // Cố ý KHÔNG kiểm xem sản phẩm nào đang dùng ảnh này: ảnh có thể được dán
  // vào bất kỳ trường nào, và một truy vấn quét toàn bộ chỉ tạo cảm giác an
  // toàn giả. Trang quản trị hỏi xác nhận trước khi gọi.
  await prisma.upload.delete({ where: { id } });
  return ok({ deleted: true, id });
});
