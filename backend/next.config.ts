import type { NextConfig } from "next";

/**
 * Dịch vụ chỉ có API — không render trang, không tối ưu ảnh.
 *
 * CORS được xử lý ở `src/proxy.ts` chứ không phải ở đây: header khai báo tĩnh
 * trong `headers()` chỉ trả về được đúng một origin cố định, không đủ cho các
 * bản preview trên Vercel (mỗi bản một tên miền).
 *
 * `@prisma/client` đã nằm sẵn trong danh sách package Next tự tách khỏi bundle
 * nên không cần khai `serverExternalPackages`.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
