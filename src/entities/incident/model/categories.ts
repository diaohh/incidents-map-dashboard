import { seedIncidents } from "./useIncidents";
import type { IncidentType } from "./types";

function dedupeByKey(types: IncidentType[]): IncidentType[] {
  const seen = new Map<string, IncidentType>();
  for (const type of types) {
    if (!seen.has(type.key)) seen.set(type.key, type);
  }
  return [...seen.values()];
}

export const incidentCategories: IncidentType[] = dedupeByKey(
  seedIncidents.map((incident) => incident.type),
).sort((a, b) => a.name.localeCompare(b.name));
