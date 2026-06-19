import type { Incident, Media, Person, Tag } from "./types";

interface IncidentRaw extends Omit<Incident, "assignees" | "observers" | "media" | "tags"> {
  assignees?: Person[];
  observers?: Person[];
  media?: Media[];
  tags?: Tag[];
}

export function parseIncidents(raw: unknown): Incident[] {
  const records = raw as IncidentRaw[];

  return records.map((record) => ({
    ...record,
    assignees: record.assignees ?? [],
    observers: record.observers ?? [],
    media: record.media ?? [],
    tags: record.tags ?? [],
  }));
}
