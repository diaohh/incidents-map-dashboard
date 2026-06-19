import { useMemo, useState } from "react";
import { Badge } from "@/shared/ui";
import { formatDate } from "@/shared/lib/formatDate";
import { useTranslation } from "@/shared/i18n";
import {
  PRIORITY_COLOR,
  PRIORITY_LABEL_KEY,
  STATUS_LABEL_KEY,
  type Incident,
} from "@/entities/incident";
import styles from "./IncidentsTable.module.scss";

type SortKey = "title" | "category" | "priority" | "status" | "dueDate";
type SortDirection = "asc" | "desc";

interface IncidentsTableProps {
  incidents: Incident[];
}

function sortValue(incident: Incident, key: SortKey, locale: string): string {
  switch (key) {
    case "title":
      return incident.title;
    case "category":
      return locale === "es" ? incident.type.name : incident.type.name_en;
    case "priority":
      return incident.priority;
    case "status":
      return incident.status;
    case "dueDate":
      return incident.dueDate ?? "";
  }
}

export function IncidentsTable({ incidents }: IncidentsTableProps) {
  const { locale, t } = useTranslation();
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedIncidents = useMemo(() => {
    const direction = sortDirection === "asc" ? 1 : -1;
    return [...incidents].sort(
      (a, b) => sortValue(a, sortKey, locale).localeCompare(sortValue(b, sortKey, locale)) * direction,
    );
  }, [incidents, sortKey, sortDirection, locale]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const columns: { key: SortKey; labelKey: Parameters<typeof t>[0] }[] = [
    { key: "title", labelKey: "dashboard.table.column.title" },
    { key: "category", labelKey: "dashboard.table.column.category" },
    { key: "priority", labelKey: "dashboard.table.column.priority" },
    { key: "status", labelKey: "dashboard.table.column.status" },
    { key: "dueDate", labelKey: "dashboard.table.column.dueDate" },
  ];

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>{t("dashboard.table.title")}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={styles.sortable}
                aria-sort={sortKey === column.key ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
              >
                <button type="button" onClick={() => handleSort(column.key)}>
                  {t(column.labelKey)} {sortKey === column.key ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedIncidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.title}</td>
              <td>{locale === "es" ? incident.type.name : incident.type.name_en}</td>
              <td>
                <Badge color="#ffffff" background={PRIORITY_COLOR[incident.priority]}>
                  {t(PRIORITY_LABEL_KEY[incident.priority])}
                </Badge>
              </td>
              <td>{t(STATUS_LABEL_KEY[incident.status])}</td>
              <td>{incident.dueDate ? formatDate(incident.dueDate, locale) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedIncidents.length === 0 && <p className={styles.empty}>{t("dashboard.table.empty")}</p>}
    </div>
  );
}
