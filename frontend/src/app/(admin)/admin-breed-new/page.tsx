"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBreedStore } from "@/store/breed-store";
import { errorMessage } from "@/lib/api";
import BreedFields, { EMPTY_BREED_FIELDS, toBreedPayload } from "@/components/admin/BreedFields";

export default function NewBreedPage() {
  const router = useRouter();
  const addBreed = useBreedStore((s) => s.addBreed);

  const [values, setValues] = useState(EMPTY_BREED_FIELDS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await addBreed(toBreedPayload(values));
      router.push("/admin-breeds");
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-xl font-bold text-brand-deep">Thêm giống mới</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {error}
          </div>
        )}

        <BreedFields values={values} onChange={(patch) => setValues((prev) => ({ ...prev, ...patch }))} />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-brand-deep py-2.5 text-sm font-medium text-white hover:bg-brand-deep/90 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Thêm giống"}
        </button>
      </form>
    </div>
  );
}
