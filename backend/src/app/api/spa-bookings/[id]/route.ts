import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { requireRole, STAFF_ROLES } from "@/lib/auth";
import { spaBookingStatusPatch } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(req, ...STAFF_ROLES);

  const { id } = await ctx.params;
  const body = spaBookingStatusPatch.parse(await req.json());

  const existing = await prisma.spaBooking.findUnique({ where: { id } });
  if (!existing) return fail("Không tìm thấy yêu cầu giữ chỗ", 404);

  const booking = await prisma.spaBooking.update({
    where: { id },
    data: { status: body.status },
  });

  return ok(booking);
});
