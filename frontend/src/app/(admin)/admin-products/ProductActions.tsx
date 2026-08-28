"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Eye, EyeOff, Edit } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { errorMessage } from "@/lib/api";

export default function ProductActions({ productId }: { productId: string }) {
  const product = useProductStore((s) => s.getProduct(productId));
  const updateProduct = useProductStore((s) => s.updateProduct);
  const removeProduct = useProductStore((s) => s.removeProduct);
  const [busy, setBusy] = useState(false);

  if (!product) return null;

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const togglePublish = () =>
    run(() => updateProduct(productId, { published: !product.published }));

  const handleDelete = () => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    return run(() => removeProduct(productId));
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin-product-edit?id=${productId}`}
        title="Chỉnh sửa sản phẩm"
        className="rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-blue-600 transition-colors hover:bg-blue-100"
      >
        <Edit className="h-3.5 w-3.5" />
      </Link>

      <button
        onClick={togglePublish}
        disabled={busy}
        title={product.published ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
        className={`rounded-lg border p-1.5 transition-colors disabled:opacity-40 ${
          product.published
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            : "border-brand-deep/15 bg-brand-deep/5 text-brand-deep/50 hover:bg-brand-deep/10"
        }`}
      >
        {product.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
      </button>

      <button
        onClick={handleDelete}
        disabled={busy}
        title="Xóa sản phẩm"
        className="rounded-lg border border-rose-200 bg-rose-50 p-1.5 text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-40"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
