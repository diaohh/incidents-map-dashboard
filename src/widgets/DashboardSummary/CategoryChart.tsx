import { BarChart } from "@mantine/charts";
import { useTranslation } from "@/shared/i18n";
import { incidentCategories, selectByCategory, type Incident } from "@/entities/incident";
import styles from "./ChartSection.module.scss";

interface CategoryChartProps {
  incidents: Incident[];
}

export function CategoryChart({ incidents }: CategoryChartProps) {
  const { locale, t } = useTranslation();
  const byCategory = selectByCategory(incidents);

  const data = incidentCategories
    .map((category) => ({
      name: locale === "es" ? category.name : category.name_en,
      value: byCategory[category.key]?.length ?? 0,
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{t("dashboard.chart.byCategory")}</h3>
      {data.length === 0 ? (
        <p className={styles.empty}>{t("dashboard.chart.empty")}</p>
      ) : (
        <BarChart
          h={Math.max(280, data.length * 36)}
          data={data}
          dataKey="name"
          series={[{ name: "value", color: "indigo.6" }]}
          orientation="vertical"
          withLegend={false}
          yAxisProps={{ width: 150, tick: { fontSize: 12 } }}
          gridAxis="x"
        />
      )}
    </section>
  );
}
