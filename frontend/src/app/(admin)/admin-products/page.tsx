"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Đường dẫn cũ hồi còn gộp chung một bảng. Giữ lại để link đã lưu không chết,
 * đưa thẳng sang mục "Bé đang bán".
 */
export default function AdminProductsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin-pets");
  }, [router]);
  return null;
}
