import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Incident } from "./types";

interface IncidentState {
  createdIncidents: Incident[];
  selectedIncidentId: string | null;
  addIncident: (incident: Incident) => void;
  selectIncident: (id: string | null) => void;
}

export const useIncidentStore = create<IncidentState>()(
  persist(
    (set) => ({
      createdIncidents: [],
      selectedIncidentId: null,
      addIncident: (incident) =>
        set((state) => ({ createdIncidents: [...state.createdIncidents, incident] })),
      selectIncident: (id) => set({ selectedIncidentId: id }),
    }),
    {
      name: "incidents-created",
      partialize: (state) => ({ createdIncidents: state.createdIncidents }),
    },
  ),
);
