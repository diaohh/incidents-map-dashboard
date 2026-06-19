import { BarChart } from "@mantine/charts";
import { useTranslation } from "@/shared/i18n";
import { selectByPriority, PRIORITY_LABEL_KEY, type Incident, type Priority } from "@/entities/incident";
import styles from "./ChartSection.module.scss";

const PRIORITIES: Priority[] = ["high", "medium", "low"];

interface PriorityChartProps {
  incidents: Incident[];
}

export function PriorityChart({ incidents }: PriorityChartProps) {
  const { t } = useTranslation();
  const byPriority = selectByPriority(incidents);

  const data = PRIORITIES.map((priority) => ({
    name: t(PRIORITY_LABEL_KEY[priority]),
    value: byPriority[priority]?.length ?? 0,
  }));

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{t("dashboard.chart.byPriority")}</h3>
      <BarChart
        h={220}
        data={data}
        dataKey="name"
        series={[{ name: "value", color: "orange.6" }]}
        withLegend={false}
      />
    </section>
  );
}
