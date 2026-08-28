import { create } from "zustand";
import { api, errorMessage } from "@/lib/api";
import { BookingStatus, SpaBooking } from "@/lib/types";

interface SpaBookingStore {
  bookings: SpaBooking[];
  loading: boolean;
  error: string | null;

  fetchBookings: () => Promise<void>;
  updateStatus: (id: string, status: BookingStatus) => Promise<void>;
  setSchedule: (id: string, confirmedAt: string | null, staffNote?: string | null) => Promise<void>;
}

export const useSpaBookingStore = create<SpaBookingStore>((set, get) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const bookings = await api.spaBookings.list();
      set({ bookings, loading: false });
    } catch (err) {
      set({ error: errorMessage(err), loading: false });
    }
  },

  updateStatus: async (id, status) => {
    const booking = await api.spaBookings.updateStatus(id, status);
    set({ bookings: get().bookings.map((b) => (b.id === id ? booking : b)) });
  },

  setSchedule: async (id, confirmedAt, staffNote) => {
    const booking = await api.spaBookings.setSchedule(id, confirmedAt, staffNote);
    set({ bookings: get().bookings.map((b) => (b.id === id ? booking : b)) });
  },
}));
