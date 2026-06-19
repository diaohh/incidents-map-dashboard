import { Badge, IconButton } from "@/shared/ui";
import { formatDate } from "@/shared/lib/formatDate";
import { useTranslation } from "@/shared/i18n";
import type { TranslationKey } from "@/shared/i18n";
import type { Incident, Priority, Status } from "../model/types";
import styles from "./IncidentCard.module.scss";

const PRIORITY_COLOR: Record<Priority, string> = {
  high: "#d64545",
  medium: "#e0a526",
  low: "#2f9e63",
};

const STATUS_LABEL_KEY: Record<Status, TranslationKey> = {
  open: "status.open",
  on_pause: "status.on_pause",
  closed: "status.closed",
};

const PRIORITY_LABEL_KEY: Record<Priority, TranslationKey> = {
  high: "priority.high",
  medium: "priority.medium",
  low: "priority.low",
};

interface IncidentCardProps {
  incident: Incident;
  onClose: () => void;
}

export function IncidentCard({ incident, onClose }: IncidentCardProps) {
  const { locale, t } = useTranslation();
  const categoryName = locale === "es" ? incident.type.name : incident.type.name_en;

  return (
    <aside className={styles.card} aria-label={incident.title}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>{incident.title}</p>
          <p className={styles.category}>{categoryName}</p>
        </div>
        <IconButton aria-label={t("incidentCard.close")} onClick={onClose}>
          ×
        </IconButton>
      </div>

      <div className={styles.badges}>
        <Badge color="#ffffff" background={PRIORITY_COLOR[incident.priority]}>
          {t(PRIORITY_LABEL_KEY[incident.priority])}
        </Badge>
        <Badge>{t(STATUS_LABEL_KEY[incident.status])}</Badge>
      </div>

      <div className={styles.meta}>
        <span>{incident.locationDescription}</span>
        <span>
          {t("incidentCard.owner")}: {incident.owner.name}
        </span>
        {incident.dueDate && (
          <span>
            {t("incidentCard.dueDate")}: {formatDate(incident.dueDate, locale)}
          </span>
        )}
      </div>
    </aside>
  );
}
