import { create } from "zustand";

export interface FilterOptions {
  approved: boolean;
  pending: boolean;
  denied: boolean;
  setFilter: (key: keyof FilterOptions, value: boolean) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterOptions>()((set) => ({
  approved: false,
  pending: false,
  denied: false,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set({ approved: false, pending: false, denied: false }),
}));
