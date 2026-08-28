export const metadata = {
  title: "Miu Pet House API",
  description: "Backend API cho cửa hàng thú cưng",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
