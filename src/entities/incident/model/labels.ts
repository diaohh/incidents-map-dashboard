import type { TranslationKey } from "@/shared/i18n";
import type { Priority, Status } from "./types";

export const STATUS_LABEL_KEY: Record<Status, TranslationKey> = {
  open: "status.open",
  on_pause: "status.on_pause",
  closed: "status.closed",
};

export const PRIORITY_LABEL_KEY: Record<Priority, TranslationKey> = {
  high: "priority.high",
  medium: "priority.medium",
  low: "priority.low",
};

export const STATUS_COLOR: Record<Status, string> = {
  open: "#2f9e63",
  on_pause: "#e0a526",
  closed: "#6b7280",
};

export const PRIORITY_COLOR: Record<Priority, string> = {
  high: "#d64545",
  medium: "#e0a526",
  low: "#2f9e63",
};
