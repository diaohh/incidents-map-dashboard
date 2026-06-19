import { useMemo, useState } from "react";
import { Badge, Button, Field, Select } from "@/shared/ui";
import { formatDate } from "@/shared/lib/formatDate";
import { useDebouncedValue } from "@/shared/lib";
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

const PAGE_SIZES = [10, 25, 50];

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
  const [searchInput, setSearchInput] = useState("");
  const searchTitle = useDebouncedValue(searchInput, 300);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);

  const filteredIncidents = useMemo(() => {
    const query = searchTitle.trim().toLowerCase();
    if (!query) return incidents;
    return incidents.filter((incident) => incident.title.toLowerCase().includes(query));
  }, [incidents, searchTitle]);

  const sortedIncidents = useMemo(() => {
    const direction = sortDirection === "asc" ? 1 : -1;
    return [...filteredIncidents].sort(
      (a, b) => sortValue(a, sortKey, locale).localeCompare(sortValue(b, sortKey, locale)) * direction,
    );
  }, [filteredIncidents, sortKey, sortDirection, locale]);

  const pageCount = Math.max(1, Math.ceil(sortedIncidents.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedIncidents = sortedIncidents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
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
      <div className={styles.toolbar}>
        <Field
          label={t("dashboard.table.search")}
          type="search"
          value={searchInput}
          onChange={(event) => handleSearchChange(event.target.value)}
        />
      </div>

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
          {pagedIncidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.title}</td>
              <td>{locale === "es" ? incident.type.name : incident.type.name_en}</td>
              <td className={styles.priorityCell}>
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

      {sortedIncidents.length > 0 && (
        <div className={styles.pagination}>
          <Select
            label={t("dashboard.table.pageSize")}
            value={String(pageSize)}
            onChange={(event) => handlePageSizeChange(Number(event.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>

          <div className={styles.pageControls}>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              {t("dashboard.table.prev")}
            </Button>
            <span className={styles.pageIndicator}>
              {t("dashboard.table.page")} {currentPage} {t("dashboard.table.of")} {pageCount}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage >= pageCount}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {t("dashboard.table.next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
