import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { requireRole } from "@/lib/auth";
import { breedPatch, slugify } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** `id` chấp nhận cả ObjectId lẫn slug, để link `?slug=` dùng được luôn. */
async function findBreed(idOrSlug: string) {
  const isObjectId = /^[0-9a-f]{24}$/i.test(idOrSlug);
  return isObjectId
    ? prisma.breed.findUnique({ where: { id: idOrSlug } })
    : prisma.breed.findUnique({ where: { slug: idOrSlug } });
}

export const GET = handle(async (_req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const breed = await findBreed(id);
  if (!breed) return fail("Không tìm thấy giống này", 404);

  // Đếm theo khoá `breedId` và cộng `stock`, giống hệt danh sách ở
  // `api/breeds/route.ts` — hai chỗ lệch cách đếm thì trang danh sách và trang
  // chi tiết sẽ báo hai con số khác nhau cho cùng một giống.
  const rows = await prisma.product.findMany({
    where: { published: true, stock: { gt: 0 }, breedId: breed.id },
    select: { stock: true },
  });
  const available = rows.reduce((sum, r) => sum + r.stock, 0);

  return ok({ ...breed, availableCount: available });
});

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(req, "ADMIN");

  const { id } = await ctx.params;
  const existing = await findBreed(id);
  if (!existing) return fail("Không tìm thấy giống này", 404);

  const body = breedPatch.parse(await req.json());
  const breed = await prisma.breed.update({
    where: { id: existing.id },
    data: {
      ...body,
      // Slug là một phần URL công khai. Chỉ đổi khi người dùng chủ động gửi
      // slug mới, hoặc khi TÊN thật sự thay đổi — trước đây nó bị sinh lại ở
      // mọi lần lưu, nên chỉ sửa tồn kho thôi cũng làm chết link cũ của khách.
      slug:
        body.slug ||
        (body.name && body.name !== existing.name ? slugify(body.name) : undefined),
    },
  });

  return ok(breed);
});

export const PATCH = PUT;

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(req, "ADMIN");

  const { id } = await ctx.params;
  const existing = await findBreed(id);
  if (!existing) return fail("Không tìm thấy giống này", 404);

  await prisma.breed.delete({ where: { id: existing.id } });
  return ok({ deleted: true, id: existing.id });
});
