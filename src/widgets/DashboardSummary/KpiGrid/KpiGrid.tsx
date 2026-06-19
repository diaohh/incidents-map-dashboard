import { useTranslation } from "@/shared/i18n";
import type { TranslationKey } from "@/shared/i18n";
import { selectKpis, type Incident } from "@/entities/incident";
import styles from "./KpiGrid.module.scss";

interface KpiGridProps {
  incidents: Incident[];
}

export function KpiGrid({ incidents }: KpiGridProps) {
  const { t } = useTranslation();
  const kpis = selectKpis(incidents);

  const items: { labelKey: TranslationKey; value: string }[] = [
    { labelKey: "dashboard.kpi.total", value: String(kpis.total) },
    { labelKey: "dashboard.kpi.open", value: String(kpis.open) },
    { labelKey: "dashboard.kpi.onPause", value: String(kpis.onPause) },
    { labelKey: "dashboard.kpi.closed", value: String(kpis.closed) },
    { labelKey: "dashboard.kpi.approvalRate", value: `${Math.round(kpis.approvalRate * 100)}%` },
    { labelKey: "dashboard.kpi.overdue", value: String(kpis.overdue) },
  ];

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.labelKey} className={styles.card}>
          <p className={styles.value}>{item.value}</p>
          <p className={styles.label}>{t(item.labelKey)}</p>
        </div>
      ))}
    </div>
  );
}
