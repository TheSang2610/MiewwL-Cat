import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { orderPatch } from "@/lib/schemas";
import { readSession, STAFF_ROLES } from "@/lib/auth";
import { ApiError } from "@/lib/http";

/** Các bước chỉ được đi tiếp khi đơn đã thực sự có tiền. */
const AFTER_PAYMENT = ["PROCESSING", "SHIPPED", "DELIVERED"] as const;

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (_req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) return fail("Không tìm thấy đơn hàng", 404);
  return ok(order);
});

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const body = orderPatch.parse(await req.json());

  // Khách bấm "tôi đã chuyển khoản" ở trang thanh toán có thể là khách vãng
  // lai chưa đăng nhập, nên thao tác đó để mở. Mọi thứ khác — đổi trạng thái
  // giao hàng, và nhất là xác nhận ĐÃ NHẬN TIỀN — bắt buộc phải là nhân viên.
  const onlyReportingTransfer =
    body.paymentStatus === "PENDING_CONFIRM" && body.status === undefined;

  if (!onlyReportingTransfer) {
    const session = await readSession(req);
    if (!session) {
      throw new ApiError("Bạn cần đăng nhập để thực hiện thao tác này.", 401);
    }
    if (!STAFF_ROLES.includes(session.role)) {
      throw new ApiError("Chỉ nhân viên cửa hàng mới được cập nhật đơn hàng.", 403);
    }
  }

  const existing = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!existing) return fail("Không tìm thấy đơn hàng", 404);

  const paymentStatus = body.paymentStatus ?? existing.paymentStatus;

  // Đơn chuyển khoản chỉ được xử lý tiếp khi tiền đã thực sự vào tài khoản.
  // Khách bấm "tôi đã chuyển" (PENDING_CONFIRM) chưa tính là đã nhận tiền.
  if (
    body.status &&
    AFTER_PAYMENT.includes(body.status as (typeof AFTER_PAYMENT)[number]) &&
    existing.paymentMethod === "BANK" &&
    paymentStatus !== "PAID"
  ) {
    return fail(
      "Đơn chuyển khoản chưa nhận được tiền — hãy xác nhận đã nhận tiền trước khi chuyển trạng thái.",
      409
    );
  }

  const data: {
    status?: (typeof body)["status"];
    paymentStatus?: (typeof body)["paymentStatus"];
    paidAt?: Date | null;
  } = {};

  if (body.status) data.status = body.status;

  if (body.paymentStatus) {
    data.paymentStatus = body.paymentStatus;
    // Chỉ đóng dấu thời điểm ở lần chuyển sang PAID đầu tiên, để lưu lại
    // đúng lúc đối soát chứ không phải lần bấm gần nhất.
    if (body.paymentStatus === "PAID") {
      if (existing.paymentStatus !== "PAID") data.paidAt = new Date();
      // Có tiền thì đơn rời hàng chờ luôn, trừ khi admin chỉ định trạng thái khác.
      if (!body.status && existing.status === "PENDING") data.status = "PROCESSING";
    } else {
      data.paidAt = null;
    }
  }

  // Cancelling releases the stock the order was holding.
  const order = await prisma.$transaction(async (tx) => {
    if (data.status === "CANCELLED" && existing.status !== "CANCELLED") {
      for (const item of existing.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }
    return tx.order.update({
      where: { id },
      data,
      include: { items: true },
    });
  });

  return ok(order);
});
