"use client";

import { useTranslation } from "@/shared/i18n";
import { useIncidents } from "@/entities/incident";
import { applyFilters, FilterBar, useFilterStore } from "@/features/filter-incidents";
import { KpiGrid } from "./KpiGrid";
import { StatusChart } from "./StatusChart";
import { PriorityChart } from "./PriorityChart";
import { CategoryChart } from "./CategoryChart";
import { TrendChart } from "./TrendChart";
import { IncidentsTable } from "./IncidentsTable";
import styles from "./DashboardSummary.module.scss";

export function DashboardSummary() {
  const { t } = useTranslation();
  const incidents = useIncidents();
  const filters = useFilterStore((state) => state);
  const filteredIncidents = applyFilters(incidents, filters);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("dashboard.title")}</h1>

      <FilterBar />

      <KpiGrid incidents={filteredIncidents} />

      <div className={styles.charts}>
        <div className={styles.smallCharts}>
          <div className={styles.chartCard}>
            <StatusChart incidents={filteredIncidents} />
          </div>
          <div className={styles.chartCard}>
            <PriorityChart incidents={filteredIncidents} />
          </div>
        </div>
        <div className={styles.chartCard}>
          <CategoryChart incidents={filteredIncidents} />
        </div>
        <div className={styles.chartCard}>
          <TrendChart incidents={filteredIncidents} />
        </div>
      </div>

      <IncidentsTable incidents={filteredIncidents} />
    </div>
  );
}
