import type { Incident } from "@/entities/incident";
import type { IncidentFilters } from "./store";

export function applyFilters(incidents: Incident[], filters: IncidentFilters): Incident[] {
  return incidents.filter((incident) => {
    if (filters.status !== "all" && incident.status !== filters.status) return false;
    if (filters.priority !== "all" && incident.priority !== filters.priority) return false;
    if (filters.categoryKey !== "all" && incident.type.key !== filters.categoryKey) return false;
    return true;
  });
}
