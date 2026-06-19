import { groupBy } from "@/shared/lib/groupBy";
import type { Incident, Priority, Status } from "./types";

export function selectByStatus(incidents: Incident[]): Record<Status, Incident[]> {
  return groupBy(incidents, (incident) => incident.status);
}

export function selectByPriority(incidents: Incident[]): Record<Priority, Incident[]> {
  return groupBy(incidents, (incident) => incident.priority);
}

export function getIncidentBounds(incidents: Incident[]): [[number, number], [number, number]] {
  const lats = incidents.map((incident) => incident.coordinates.lat);
  const lngs = incidents.map((incident) => incident.coordinates.lng);

  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}
