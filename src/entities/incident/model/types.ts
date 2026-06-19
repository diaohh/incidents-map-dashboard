export type IncidentTypeKey =
  | "plumbing"
  | "electrical"
  | "structural"
  | "foundation"
  | "excavation"
  | "masonry"
  | "achitectural"
  | "coordination"
  | "materials"
  | "safety_hazard"
  | "stability"
  | "infrastructure"
  | "urban_planning"
  | "observation";

export interface IncidentType {
  id: string;
  key: IncidentTypeKey;
  name: string;
  name_en: string;
}

export type Priority = "high" | "medium" | "low";

export type Status = "open" | "on_pause" | "closed";

export interface Person {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type MediaType = "image" | "video";

export interface Media {
  id: string;
  name: string;
  type: MediaType;
  format: string;
  size: number;
  status: string;
  url: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Incident {
  id: string;
  sequenceId: string;
  order: number;
  title: string;
  description: string;
  type: IncidentType;
  priority: Priority;
  status: Status;
  approval: boolean;
  project: Project;
  owner: Person;
  whatsappOwner: string | null;
  assignees: Person[];
  observers: Person[];
  coordinates: Coordinates;
  locationDescription: string;
  dueDate: string | null;
  closingDate: string | null;
  media: Media[];
  tags: Tag[];
  deleted: string | null;
  createdAt: string;
  updatedAt: string;
}
