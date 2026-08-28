import { prisma } from "@/lib/prisma";
import { handle, ok, fail, ApiError } from "@/lib/http";
import { orderInput } from "@/lib/schemas";
import { requireAuth, STAFF_ROLES } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Danh sách đơn.
 *
 * Khách hàng chỉ thấy đơn của CHÍNH MÌNH — `?userId=` từ client bị bỏ qua và
 * thay bằng id trong token, nếu không ai cũng đọc được đơn của người khác chỉ
 * bằng cách đổi tham số trên URL.
 */
export const GET = handle(async (req: Request) => {
  const session = await requireAuth(req);
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const requestedUserId = url.searchParams.get("userId");

  const isStaff = STAFF_ROLES.includes(session.role);
  const userId = isStaff ? requestedUserId : session.id;

  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(userId ? { userId } : {}),
    },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return ok(orders);
});

/**
 * Creates an order, re-pricing from the DB (never trusting client prices)
 * and decrementing stock in one transaction.
 */
export const POST = handle(async (req: Request) => {
  const body = orderInput.parse(await req.json());

  const productIds = body.items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const missing = productIds.filter((id) => !products.some((p) => p.id === id));
  if (missing.length > 0) {
    return fail(`Sản phẩm không tồn tại: ${missing.join(", ")}`, 404);
  }

  const lines = body.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    if (product.stock < item.quantity) {
      throw new ApiError(
        `"${product.name}" chỉ còn ${product.stock} sản phẩm (bạn chọn ${item.quantity}).`,
        409
      );
    }
    return {
      productId: product.id,
      name: product.name,
      image: product.images[0] ?? null,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const totalPrice = subtotal + shippingFee;

  const order = await prisma.$transaction(async (tx) => {
    for (const line of lines) {
      await tx.product.update({
        where: { id: line.productId },
        data: { stock: { decrement: line.quantity } },
      });
    }

    return tx.order.create({
      data: {
        customerName: body.customer.name,
        phone: body.customer.phone,
        address: body.customer.address,
        city: body.customer.city,
        note: body.customer.note,
        paymentMethod: body.paymentMethod,
        userId: body.userId,
        totalPrice,
        items: { create: lines },
      },
      include: { items: true },
    });
  });

  return ok(order, 201);
});
