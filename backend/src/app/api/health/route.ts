import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  try {
    await prisma.category.count();
  } catch {
    return fail("Không kết nối được database", 503);
  }
  return ok({ status: "ok", time: new Date().toISOString() });
});
