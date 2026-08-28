import { prisma } from "@/lib/prisma";
import { handle, ok } from "@/lib/http";
import { requireRole, STAFF_ROLES } from "@/lib/auth";
import { spaBookingInput } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export const GET = handle(async (req: Request) => {
  await requireRole(req, ...STAFF_ROLES);

  const bookings = await prisma.spaBooking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return ok(bookings);
});

/**
 * Ghi nhận yêu cầu giữ chỗ từ máy tính giá spa. Đây là lead để nhân viên gọi
 * lại xác nhận khung giờ — chưa có lịch/nhân sự thật đứng sau route này.
 */
export const POST = handle(async (req: Request) => {
  const body = spaBookingInput.parse(await req.json());

  const booking = await prisma.spaBooking.create({
    data: {
      phone: body.phone,
      petName: body.petName,
      species: body.species,
      weightTier: body.weightTier,
      serviceName: body.serviceName,
      estimatedPrice: body.estimatedPrice,
      desiredDate: body.desiredDate,
    },
  });

  return ok(booking, 201);
});
