import type { Coordinates, Incident, IncidentType, Priority, Project } from "@/entities/incident";
import type { IncidentFormValues } from "./validate";

const PLACEHOLDER_OWNER = {
  id: "current-user",
  name: "Usuario actual",
  email: "",
  avatarUrl: "",
};

export function buildIncident(
  values: IncidentFormValues,
  coordinates: Coordinates,
  category: IncidentType,
  project: Project,
  order: number,
): Incident {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    sequenceId: String(order).padStart(4, "0"),
    order,
    title: values.title.trim(),
    description: values.description.trim(),
    type: category,
    priority: values.priority as Priority,
    status: "open",
    approval: false,
    project,
    owner: PLACEHOLDER_OWNER,
    whatsappOwner: null,
    assignees: [],
    observers: [],
    coordinates,
    locationDescription: "",
    dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
    closingDate: null,
    media: [],
    tags: [],
    deleted: null,
    createdAt: now,
    updatedAt: now,
  };
}
