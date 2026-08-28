"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api, errorMessage } from "@/lib/api";
import { useAsync } from "@/lib/use-async";
import { Breed } from "@/lib/types";
import { useBreedStore } from "@/store/breed-store";
import { LoadingMessage, ErrorMessage } from "@/components/storefront/StateMessage";
import BreedFields, { BreedFieldValues, toBreedPayload } from "@/components/admin/BreedFields";

function EditBreedLoader() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const {
    data: breed,
    loading,
    error,
    reload,
  } = useAsync(() => {
    if (!id) throw new Error("Thiếu mã giống trên đường dẫn.");
    return api.breeds.get(id);
  }, [id]);

  if (loading) return <LoadingMessage label="Đang tải thông tin giống..." />;

  if (error || !breed) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <ErrorMessage message={error || "Không tìm thấy giống này"} onRetry={reload} />
        <Link href="/admin-breeds" className="text-sm text-brand-deep underline">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return <EditBreedForm breed={breed} />;
}

function EditBreedForm({ breed }: { breed: Breed }) {
  const router = useRouter();
  const updateBreed = useBreedStore((s) => s.updateBreed);

  const [values, setValues] = useState<BreedFieldValues>(() => ({
    name: breed.name,
    alias: breed.alias || "",
    description: breed.description,
    species: breed.species,
    size: breed.size,
    weightRange: breed.weightRange || "",
    priceMin: String(breed.priceMin),
    priceMax: String(breed.priceMax),
    images: (breed.images.length > 0 ? breed.images : [breed.image].filter(Boolean)).join("\n"),
    tags: breed.tags.join(", "),
    careGuide: breed.careGuide.join("\n"),
    suitability: breed.suitability || "",
    careNotes: breed.careNotes || "",
    aliasEn: breed.aliasEn || "",
    descriptionEn: breed.descriptionEn || "",
    suitabilityEn: breed.suitabilityEn || "",
    careNotesEn: breed.careNotesEn || "",
    warning: breed.warning || "",
    energyLevel: breed.energyLevel != null ? String(breed.energyLevel) : "",
    apartmentFriendly: breed.apartmentFriendly != null ? String(breed.apartmentFriendly) : "",
    kidFriendly: breed.kidFriendly != null ? String(breed.kidFriendly) : "",
    petFriendly: breed.petFriendly != null ? String(breed.petFriendly) : "",
    sheddingLevel: breed.sheddingLevel != null ? String(breed.sheddingLevel) : "",
    groomingNeeds: breed.groomingNeeds != null ? String(breed.groomingNeeds) : "",
    trainability: breed.trainability != null ? String(breed.trainability) : "",
    barkingLevel: breed.barkingLevel != null ? String(breed.barkingLevel) : "",
    position: String(breed.position),
    published: breed.published,
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateBreed(breed.id, toBreedPayload(values));
      router.push("/admin-breeds");
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin-breeds" className="rounded-lg p-2 hover:bg-brand-cream">
          <ArrowLeft className="h-5 w-5 text-brand-deep/60" />
        </Link>
        <h1 className="text-xl font-bold text-brand-deep">Chỉnh sửa giống</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {error}
          </div>
        )}

        <BreedFields values={values} onChange={(patch) => setValues((prev) => ({ ...prev, ...patch }))} />

        <div className="flex items-center justify-between rounded-xl border border-brand-deep/10 bg-brand-cream/50 p-3">
          <div>
            <p className="text-sm font-semibold text-brand-deep">Trạng thái</p>
            <p className="text-xs text-brand-deep/50">
              {values.published ? "Giống này ĐANG HIỆN" : "Giống này đang BỊ ẨN"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setValues((prev) => ({ ...prev, published: !prev.published }))}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
              values.published
                ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                : "border-amber-300 bg-amber-100 text-amber-800"
            }`}
          >
            {values.published ? "Đang Hiện (Bấm để Ẩn)" : "Đã Ẩn (Bấm để Hiện)"}
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-brand-deep/10 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin-breeds")}
            className="rounded-xl border border-brand-deep/15 px-4 py-2.5 text-xs text-brand-deep/70 transition-colors hover:bg-brand-cream"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-deep px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-all hover:bg-brand-deep/90 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditBreedPage() {
  return (
    <Suspense>
      <EditBreedLoader />
    </Suspense>
  );
}
