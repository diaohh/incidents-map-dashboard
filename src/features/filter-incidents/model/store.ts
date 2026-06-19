import { create } from "zustand";
import type { IncidentTypeKey, Priority, Status } from "@/entities/incident";

export interface IncidentFilters {
  status: Status | "all";
  priority: Priority | "all";
  categoryKey: IncidentTypeKey | "all";
}

interface FilterState extends IncidentFilters {
  setStatus: (status: IncidentFilters["status"]) => void;
  setPriority: (priority: IncidentFilters["priority"]) => void;
  setCategory: (categoryKey: IncidentFilters["categoryKey"]) => void;
  reset: () => void;
}

const INITIAL_FILTERS: IncidentFilters = {
  status: "all",
  priority: "all",
  categoryKey: "all",
};

export const useFilterStore = create<FilterState>()((set) => ({
  ...INITIAL_FILTERS,
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setCategory: (categoryKey) => set({ categoryKey }),
  reset: () => set(INITIAL_FILTERS),
}));
