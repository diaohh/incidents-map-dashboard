import { Button } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import styles from "./CreateIncidentTrigger.module.scss";

interface CreateIncidentTriggerProps {
  isPicking: boolean;
  onStart: () => void;
}

export function CreateIncidentTrigger({ isPicking, onStart }: CreateIncidentTriggerProps) {
  const { t } = useTranslation();

  if (isPicking) {
    return <p className={styles.banner}>{t("createIncident.locationPrompt")}</p>;
  }

  return (
    <Button className={styles.trigger} onClick={onStart}>
      {t("createIncident.trigger")}
    </Button>
  );
}
