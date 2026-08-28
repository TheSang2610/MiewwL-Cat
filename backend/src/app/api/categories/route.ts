import { prisma } from "@/lib/prisma";
import { handle, ok } from "@/lib/http";
import { requireRole } from "@/lib/auth";
import { slugify } from "@/lib/schemas";
import { z } from "zod";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return ok(categories);
});

const input = z.object({ name: z.string().min(1), slug: z.string().min(1).optional() });

export const POST = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const body = input.parse(await req.json());
  const category = await prisma.category.create({
    data: { name: body.name, slug: body.slug || slugify(body.name) },
  });
  return ok(category, 201);
});
