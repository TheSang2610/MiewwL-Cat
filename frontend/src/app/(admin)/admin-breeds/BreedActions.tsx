"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Eye, EyeOff, Edit } from "lucide-react";
import { useBreedStore } from "@/store/breed-store";
import { errorMessage } from "@/lib/api";

export default function BreedActions({ breedId }: { breedId: string }) {
  const breed = useBreedStore((s) => s.getBreed(breedId));
  const updateBreed = useBreedStore((s) => s.updateBreed);
  const removeBreed = useBreedStore((s) => s.removeBreed);
  const [busy, setBusy] = useState(false);

  if (!breed) return null;

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
    run(() => updateBreed(breedId, { published: !breed.published }));

  const handleDelete = () => {
    if (!confirm("Xóa giống này? Không ảnh hưởng tới sản phẩm đang bán.")) return;
    return run(() => removeBreed(breedId));
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin-breed-edit?id=${breedId}`}
        title="Chỉnh sửa giống"
        className="rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-blue-600 transition-colors hover:bg-blue-100"
      >
        <Edit className="h-3.5 w-3.5" />
      </Link>

      <button
        onClick={togglePublish}
        disabled={busy}
        title={breed.published ? "Ẩn giống" : "Hiện giống"}
        className={`rounded-lg border p-1.5 transition-colors disabled:opacity-40 ${
          breed.published
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            : "border-brand-deep/15 bg-brand-deep/5 text-brand-deep/50 hover:bg-brand-deep/10"
        }`}
      >
        {breed.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
      </button>

      <button
        onClick={handleDelete}
        disabled={busy}
        title="Xóa giống"
        className="rounded-lg border border-rose-200 bg-rose-50 p-1.5 text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-40"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
