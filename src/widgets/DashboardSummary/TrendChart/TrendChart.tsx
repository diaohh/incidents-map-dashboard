import { AreaChart } from "@mantine/charts";
import { useTranslation } from "@/shared/i18n";
import { selectTrend, type Incident } from "@/entities/incident";
import styles from "../ChartSection.module.scss";

interface TrendChartProps {
  incidents: Incident[];
}

export function TrendChart({ incidents }: TrendChartProps) {
  const { t } = useTranslation();
  const trend = selectTrend(incidents);

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{t("dashboard.chart.trend")}</h3>
      {trend.length === 0 ? (
        <p className={styles.empty}>{t("dashboard.chart.empty")}</p>
      ) : (
        <AreaChart
          h={300}
          data={trend}
          dataKey="month"
          series={[
            { name: "created", label: t("dashboard.chart.created"), color: "teal.6" },
            { name: "closed", label: t("dashboard.chart.closed"), color: "gray.6" },
          ]}
          withLegend
          curveType="monotone"
          xAxisProps={{ angle: -35, textAnchor: "end", height: 60, interval: "preserveStartEnd" }}
        />
      )}
    </section>
  );
}
