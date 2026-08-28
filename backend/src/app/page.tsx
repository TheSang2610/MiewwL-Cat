const ENDPOINTS: [string, string][] = [
  ["GET    /api/health", "Kiểm tra kết nối database"],
  ["GET    /api/categories", "Danh sách danh mục"],
  ["POST   /api/categories", "Tạo danh mục"],
  ["GET    /api/products", "Danh sách sản phẩm (?category= &q= &published=)"],
  ["POST   /api/products", "Tạo sản phẩm"],
  ["GET    /api/products/:id", "Chi tiết sản phẩm"],
  ["PUT    /api/products/:id", "Cập nhật sản phẩm"],
  ["DELETE /api/products/:id", "Xoá (hoặc ẩn nếu đã có đơn)"],
  ["GET    /api/orders", "Danh sách đơn hàng (?status=)"],
  ["POST   /api/orders", "Tạo đơn hàng, trừ tồn kho"],
  ["GET    /api/orders/:id", "Chi tiết đơn hàng"],
  ["PATCH  /api/orders/:id", "Đổi trạng thái đơn"],
  ["POST   /api/auth/login", "Đăng nhập admin"],
];

export default function ApiIndexPage() {
  return (
    <main style={{ fontFamily: "ui-monospace, monospace", padding: "2rem", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>Miu Pet House API</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Backend chạy ở cổng 3001. Frontend hiện dùng mock data, chưa gọi API này.
      </p>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {ENDPOINTS.map(([route, desc]) => (
            <tr key={route}>
              <td style={{ paddingRight: "2rem", whiteSpace: "pre" }}>{route}</td>
              <td style={{ color: "#666" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
