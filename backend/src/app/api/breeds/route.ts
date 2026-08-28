import { prisma } from "@/lib/prisma";
import { handle, ok, ApiError } from "@/lib/http";
import { requireRole } from "@/lib/auth";
import { breedInput, slugify } from "@/lib/schemas";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * GET /api/breeds?species=DOG&published=true
 *
 * Mỗi giống kèm `availableCount` — tổng số bé đang còn của giống đó.
 *
 * Đếm theo khoá `breedId`, không so khớp theo tên: trước đây sản phẩm ghi
 * "Poodle" trong khi thư viện tên "Poodle Tiny" thì trượt, trang giống báo hết
 * bé dù kho còn 5 con.
 *
 * Cộng `stock` chứ không đếm số dòng hàng — một dòng "Chó Corgi" tồn 2 nghĩa là
 * còn 2 bé, không phải 1.
 */
export const GET = handle(async (req: Request) => {
  const url = new URL(req.url);
  const species = url.searchParams.get("species");
  const publishedParam = url.searchParams.get("published");

  const where: Prisma.BreedWhereInput = {};
  if (publishedParam !== null) where.published = publishedParam !== "false";
  if (species === "DOG" || species === "CAT") where.species = species;

  const [breeds, products] = await Promise.all([
    prisma.breed.findMany({ where, orderBy: [{ position: "asc" }, { name: "asc" }] }),
    prisma.product.findMany({
      where: { published: true, breedId: { not: null }, stock: { gt: 0 } },
      select: { breedId: true, stock: true },
    }),
  ]);

  const inStock = new Map<string, number>();
  for (const p of products) {
    if (!p.breedId) continue;
    inStock.set(p.breedId, (inStock.get(p.breedId) ?? 0) + p.stock);
  }

  return ok(
    breeds.map((b) => ({
      ...b,
      availableCount: inStock.get(b.id) ?? 0,
    }))
  );
});

export const POST = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const body = breedInput.parse(await req.json());

  if (body.priceMax < body.priceMin) {
    throw new ApiError("Giá tối đa phải lớn hơn hoặc bằng giá tối thiểu", 422);
  }

  const breed = await prisma.breed.create({
    data: {
      name: body.name,
      slug: body.slug || slugify(body.name),
      alias: body.alias,
      description: body.description,
      species: body.species,
      size: body.size,
      weightRange: body.weightRange,
      priceMin: body.priceMin,
      priceMax: body.priceMax,
      image: body.image,
      images: body.images,
      tags: body.tags,
      careGuide: body.careGuide,
      suitability: body.suitability,
      careNotes: body.careNotes,
      warning: body.warning,
      energyLevel: body.energyLevel,
      apartmentFriendly: body.apartmentFriendly,
      kidFriendly: body.kidFriendly,
      petFriendly: body.petFriendly,
      sheddingLevel: body.sheddingLevel,
      groomingNeeds: body.groomingNeeds,
      trainability: body.trainability,
      barkingLevel: body.barkingLevel,
      position: body.position,
      published: body.published,
    },
  });

  return ok(breed, 201);
});
