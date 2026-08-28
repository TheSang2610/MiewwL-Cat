import type { Metadata } from "next";
import AccountPageContent from "./AccountPageContent";

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Xem thông tin tài khoản và đổi mật khẩu.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountPageContent />;
}
