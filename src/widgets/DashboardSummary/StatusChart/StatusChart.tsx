import { DonutChart } from "@mantine/charts";
import { useTranslation } from "@/shared/i18n";
import { selectByStatus, STATUS_COLOR, STATUS_LABEL_KEY, type Incident, type Status } from "@/entities/incident";
import styles from "../ChartSection.module.scss";

const STATUSES: Status[] = ["open", "on_pause", "closed"];

interface StatusChartProps {
  incidents: Incident[];
}

export function StatusChart({ incidents }: StatusChartProps) {
  const { t } = useTranslation();
  const byStatus = selectByStatus(incidents);

  const data = STATUSES.map((status) => ({
    name: t(STATUS_LABEL_KEY[status]),
    value: byStatus[status]?.length ?? 0,
    color: STATUS_COLOR[status],
  }));
  const isEmpty = data.every((item) => item.value === 0);

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{t("dashboard.chart.byStatus")}</h3>
      {isEmpty ? (
        <p className={styles.empty}>{t("dashboard.chart.empty")}</p>
      ) : (
        <DonutChart data={data} withLabels withTooltip size={160} />
      )}
    </section>
  );
}
