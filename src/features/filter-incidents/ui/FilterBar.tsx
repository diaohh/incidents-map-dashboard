import { Button, Select } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import {
  incidentCategories,
  PRIORITY_LABEL_KEY,
  STATUS_LABEL_KEY,
  type Priority,
  type Status,
} from "@/entities/incident";
import { useFilterStore } from "../model/store";
import styles from "./FilterBar.module.scss";

const STATUSES: Status[] = ["open", "on_pause", "closed"];
const PRIORITIES: Priority[] = ["high", "medium", "low"];

export function FilterBar() {
  const { locale, t } = useTranslation();
  const status = useFilterStore((state) => state.status);
  const priority = useFilterStore((state) => state.priority);
  const categoryKey = useFilterStore((state) => state.categoryKey);
  const setStatus = useFilterStore((state) => state.setStatus);
  const setPriority = useFilterStore((state) => state.setPriority);
  const setCategory = useFilterStore((state) => state.setCategory);
  const reset = useFilterStore((state) => state.reset);

  return (
    <div className={styles.bar}>
      <div className={styles.field}>
        <Select
          label={t("filters.status")}
          value={status}
          onChange={(event) => setStatus(event.target.value as typeof status)}
        >
          <option value="all">{t("filters.all")}</option>
          {STATUSES.map((value) => (
            <option key={value} value={value}>
              {t(STATUS_LABEL_KEY[value])}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.field}>
        <Select
          label={t("filters.priority")}
          value={priority}
          onChange={(event) => setPriority(event.target.value as typeof priority)}
        >
          <option value="all">{t("filters.all")}</option>
          {PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {t(PRIORITY_LABEL_KEY[value])}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.field}>
        <Select
          label={t("filters.category")}
          value={categoryKey}
          onChange={(event) => setCategory(event.target.value as typeof categoryKey)}
        >
          <option value="all">{t("filters.all")}</option>
          {incidentCategories.map((category) => (
            <option key={category.key} value={category.key}>
              {locale === "es" ? category.name : category.name_en}
            </option>
          ))}
        </Select>
      </div>

      <Button className={styles.clear} variant="ghost" onClick={reset}>
        {t("filters.clear")}
      </Button>
    </div>
  );
}
