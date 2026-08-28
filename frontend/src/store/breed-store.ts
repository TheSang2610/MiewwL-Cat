import { create } from "zustand";
import { api, errorMessage } from "@/lib/api";
import { Breed, BreedInput, Species } from "@/lib/types";

interface BreedStore {
  breeds: Breed[];
  loading: boolean;
  error: string | null;

  fetchBreeds: (params?: { species?: Species; published?: boolean }) => Promise<void>;
  getBreed: (id: string) => Breed | undefined;
  addBreed: (input: BreedInput) => Promise<Breed>;
  updateBreed: (id: string, input: Partial<BreedInput>) => Promise<Breed>;
  removeBreed: (id: string) => Promise<void>;
}

export const useBreedStore = create<BreedStore>((set, get) => ({
  breeds: [],
  loading: false,
  error: null,

  fetchBreeds: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const breeds = await api.breeds.list(params);
      set({ breeds, loading: false });
    } catch (err) {
      set({ error: errorMessage(err), loading: false });
    }
  },

  getBreed: (id) => get().breeds.find((b) => b.id === id),

  addBreed: async (input) => {
    const breed = await api.breeds.create(input);
    set({ breeds: [breed, ...get().breeds] });
    return breed;
  },

  updateBreed: async (id, input) => {
    const breed = await api.breeds.update(id, input);
    set({ breeds: get().breeds.map((b) => (b.id === id ? breed : b)) });
    return breed;
  },

  removeBreed: async (id) => {
    await api.breeds.remove(id);
    set({ breeds: get().breeds.filter((b) => b.id !== id) });
  },
}));
