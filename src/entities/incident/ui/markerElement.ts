import type { Incident } from "../model/types";
import styles from "./markerElement.module.scss";

const PRIORITY_CLASS: Record<Incident["priority"], string> = {
  high: styles.high,
  medium: styles.medium,
  low: styles.low,
};

export function createMarkerElement(incident: Incident): HTMLDivElement {
  const element = document.createElement("div");
  const classes = [styles.marker, PRIORITY_CLASS[incident.priority]];

  if (incident.status === "closed") classes.push(styles.closed);
  if (incident.status === "on_pause") classes.push(styles.onPause);

  element.className = classes.join(" ");
  element.setAttribute("role", "button");
  element.setAttribute("aria-label", incident.title);

  return element;
}
