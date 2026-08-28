import { prisma } from "@/lib/prisma";
import { handle, ok } from "@/lib/http";
import { requireRole } from "@/lib/auth";
import { productInput, slugify } from "@/lib/schemas";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * GET /api/products?category=meo&q=persian&published=true
 */
export const GET = handle(async (req: Request) => {
  const url = new URL(req.url);
  const categorySlug = url.searchParams.get("category");
  const q = url.searchParams.get("q");
  const publishedParam = url.searchParams.get("published");

  const where: Prisma.ProductWhereInput = {};
  if (publishedParam !== null) where.published = publishedParam !== "false";
  if (categorySlug) where.category = { slug: categorySlug };
  if (q) where.name = { contains: q, mode: "insensitive" };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return ok(products);
});

export const POST = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const body = productInput.parse(await req.json());

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug || slugify(body.name),
      categoryId: body.categoryId,
      price: body.price,
      description: body.description,
      images: body.images,
      breed: body.breed,
      age: body.age,
      stock: body.stock,
      published: body.published,
      subCategory: body.subCategory,
      gender: body.gender ?? null,
      tags: body.tags,
      vaccineDoses: body.vaccineDoses ?? null,
      warranty: body.warranty,
      birthDate: body.birthDate,
      weight: body.weight,
      color: body.color,
      suitability: body.suitability,
    },
    include: { category: true },
  });

  return ok(product, 201);
});
