import { prisma } from "@/lib/prisma";
import { handle, ok, fail } from "@/lib/http";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Chỉ nhận định dạng ảnh trình duyệt nào cũng hiển thị được. */
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

/** 3 MB — ảnh chụp điện thoại đã nén thường dưới mức này. */
const MAX_BYTES = 3 * 1024 * 1024;

/** Danh sách ảnh đã tải lên (không kèm dữ liệu ảnh). Cho trang quản trị. */
export const GET = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const uploads = await prisma.upload.findMany({
    select: { id: true, filename: true, mimeType: true, size: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return ok(uploads);
});

/**
 * Tải ảnh lên từ trang quản trị.
 *
 * Lưu thẳng bytes trong MongoDB để shop dùng được ngay, không phải đăng ký
 * Vercel Blob / Cloudinary / S3 rồi cắm khoá. Đổi lại thì không phù hợp cho
 * kho ảnh lớn — xem ghi chú ở `model Upload` trong schema.
 *
 * Trả về URL TUYỆT ĐỐI vì frontend nằm ở tên miền khác, cần địa chỉ đầy đủ mới
 * hiển thị được ảnh.
 */
export const POST = handle(async (req: Request) => {
  await requireRole(req, "ADMIN");

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return fail("Thiếu file ảnh (trường `file` trong form-data)", 422);
  }
  if (!ALLOWED.has(file.type)) {
    return fail(
      `Chỉ nhận ảnh JPEG, PNG, WebP hoặc AVIF. File gửi lên là "${file.type || "không rõ"}".`,
      422
    );
  }
  if (file.size > MAX_BYTES) {
    return fail(
      `Ảnh nặng ${(file.size / 1024 / 1024).toFixed(1)} MB, vượt giới hạn ${MAX_BYTES / 1024 / 1024} MB. Hãy nén bớt trước khi tải lên.`,
      422
    );
  }
  if (file.size === 0) {
    return fail("File rỗng", 422);
  }

  const upload = await prisma.upload.create({
    data: {
      filename: file.name || "anh-tai-len",
      mimeType: file.type,
      size: file.size,
      data: Buffer.from(await file.arrayBuffer()),
    },
    select: { id: true, filename: true, size: true },
  });

  const base = new URL(req.url).origin;
  return ok({ ...upload, url: `${base}/api/uploads/${upload.id}` }, 201);
});
