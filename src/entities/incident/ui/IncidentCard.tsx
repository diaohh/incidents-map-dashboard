import { Badge, IconButton } from "@/shared/ui";
import { formatDate } from "@/shared/lib/formatDate";
import { useTranslation } from "@/shared/i18n";
import { PRIORITY_COLOR, PRIORITY_LABEL_KEY, STATUS_LABEL_KEY } from "../model/labels";
import type { Incident } from "../model/types";
import styles from "./IncidentCard.module.scss";

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
