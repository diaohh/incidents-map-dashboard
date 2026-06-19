import { groupBy, toMonthKey } from "@/shared/lib";
import type { Incident, IncidentTypeKey, Priority, Status } from "./types";

export function selectByStatus(incidents: Incident[]): Record<Status, Incident[]> {
  return groupBy(incidents, (incident) => incident.status);
}

export function selectByPriority(incidents: Incident[]): Record<Priority, Incident[]> {
  return groupBy(incidents, (incident) => incident.priority);
}

export function selectByCategory(incidents: Incident[]): Record<IncidentTypeKey, Incident[]> {
  return groupBy(incidents, (incident) => incident.type.key);
}

export function getIncidentBounds(incidents: Incident[]): [[number, number], [number, number]] {
  const lats = incidents.map((incident) => incident.coordinates.lat);
  const lngs = incidents.map((incident) => incident.coordinates.lng);

  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

export interface IncidentKpis {
  total: number;
  open: number;
  onPause: number;
  closed: number;
  approvalRate: number;
  overdue: number;
}

export function selectKpis(incidents: Incident[]): IncidentKpis {
  const now = Date.now();
  const total = incidents.length;
  const open = incidents.filter((incident) => incident.status === "open").length;
  const onPause = incidents.filter((incident) => incident.status === "on_pause").length;
  const closed = incidents.filter((incident) => incident.status === "closed").length;
  const approved = incidents.filter((incident) => incident.approval).length;
  const overdue = incidents.filter(
    (incident) =>
      incident.status !== "closed" &&
      incident.dueDate !== null &&
      new Date(incident.dueDate).getTime() < now,
  ).length;

  return {
    total,
    open,
    onPause,
    closed,
    approvalRate: total === 0 ? 0 : approved / total,
    overdue,
  };
}

export interface TrendPoint {
  month: string;
  created: number;
  closed: number;
}

export function selectTrend(incidents: Incident[]): TrendPoint[] {
  const createdByMonth = groupBy(incidents, (incident) => toMonthKey(incident.createdAt));
  const closedByMonth = groupBy(
    incidents.filter((incident) => incident.closingDate !== null),
    (incident) => toMonthKey(incident.closingDate as string),
  );

  const months = [...new Set([...Object.keys(createdByMonth), ...Object.keys(closedByMonth)])].sort();

  return months.map((month) => ({
    month,
    created: createdByMonth[month]?.length ?? 0,
    closed: closedByMonth[month]?.length ?? 0,
  }));
}
