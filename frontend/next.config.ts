import type { NextConfig } from "next";

/**
 * Ảnh của site nằm trong `public/` nên không cần mở cửa cho domain ngoài.
 *
 * Trước đây chỗ này để `hostname: "**"`, tức là BẤT KỲ ai cũng có thể nhờ
 * server của mình tải và tối ưu ảnh từ website của họ — vừa tốn băng thông
 * vừa là lỗ hổng proxy ảnh. Giờ chỉ còn hai ngoại lệ:
 *
 *  1. `img.vietqr.io` — mã QR ngân hàng sinh theo từng đơn (`lib/payment-config.ts`).
 *  2. Chính backend của dự án — nơi phục vụ ảnh shop tải lên ở `/api/uploads/...`.
 *
 * Thêm ảnh từ CDN khác thì khai thêm một mục vào `remotePatterns`, đừng quay
 * lại dùng dấu sao.
 */

/** Rút host của backend từ `NEXT_PUBLIC_API_URL` để cho phép ảnh tải lên. */
function apiImagePattern() {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  if (!raw) return [];
  try {
    const url = new URL(raw);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/api/uploads/**",
      },
    ];
  } catch {
    // Biến môi trường sai định dạng thì bỏ qua, đừng làm hỏng cả bản build.
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.vietqr.io",
        pathname: "/image/**",
      },
      ...apiImagePattern(),
    ],
    // Ảnh giống/phụ kiện đều đã nén sẵn ở 1200px, không cần bộ kích thước lớn hơn.
    imageSizes: [64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],

    /**
     * Next 16 chặn tối ưu ảnh khi tên miền nguồn phân giải ra IP nội bộ, để
     * chống SSRF — kẻ xấu không mượn được server của mình đi đọc dịch vụ trong
     * mạng riêng.
     *
     * Nhưng khi chạy ở máy, backend CHÍNH LÀ `localhost:3001`, tức `127.0.0.1`.
     * Nên ảnh shop tải lên hiện bình thường trong trang quản trị (chỗ đó dùng
     * thẻ `<img>` thường) mà biến mất ở trang khách (chỗ đó dùng `next/image`).
     * Triệu chứng khó đoán vì Next trả về đúng câu lỗi của trường hợp sai
     * `remotePatterns`, dù `remotePatterns` không liên quan.
     *
     * Chỉ mở ở chế độ dev. Trên Vercel backend là tên miền công khai nên không
     * dính, và để `false` giữ nguyên lớp chống SSRF cho bản chạy thật.
     */
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  // Tắt header "X-Powered-By: Next.js" — không cần khoe stack cho người lạ.
  poweredByHeader: false,
};

export default nextConfig;
