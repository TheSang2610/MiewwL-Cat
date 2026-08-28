import { prisma } from "@/lib/prisma";
import { breedLinkData } from "@/lib/breed-link";
import { handle, ok, fail } from "@/lib/http";
import { requireRole } from "@/lib/auth";
import { productPatch, slugify } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (_req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product) return fail("Không tìm thấy sản phẩm", 404);
  return ok(product);
});

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(req, "ADMIN");

  const { id } = await ctx.params;
  const body = productPatch.parse(await req.json());

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return fail("Không tìm thấy sản phẩm", 404);

  const breedFields = await breedLinkData(body.breedId);

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...body,
      // Slug là một phần URL công khai. Chỉ đổi khi người dùng chủ động gửi
      // slug mới, hoặc khi TÊN thật sự thay đổi — trước đây nó bị sinh lại ở
      // mọi lần lưu, nên chỉ sửa tồn kho thôi cũng làm chết link cũ của khách.
      slug:
        body.slug ||
        (body.name && body.name !== existing.name ? slugify(body.name) : undefined),
      // Sau `...body` để tên giống hiển thị luôn được dựng lại từ giống đã
      // chọn, chứ không nhận chuỗi client tự gửi.
      ...breedFields,
    },
    include: { category: true },
  });

  return ok(product);
});

export const PATCH = PUT;

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(req, "ADMIN");

  const { id } = await ctx.params;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return fail("Không tìm thấy sản phẩm", 404);

  const orderedCount = await prisma.orderItem.count({ where: { productId: id } });
  if (orderedCount > 0) {
    // Keep order history intact: hide it from the storefront instead of deleting.
    const product = await prisma.product.update({
      where: { id },
      data: { published: false },
    });
    return ok({ archived: true, product });
  }

  await prisma.product.delete({ where: { id } });
  return ok({ deleted: true, id });
});
