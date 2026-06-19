"use client";

import { useState } from "react";
import { Button, Field, Modal, Select } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import {
  incidentCategories,
  seedIncidents,
  useIncidentStore,
  PRIORITY_LABEL_KEY,
  type Coordinates,
  type Priority,
} from "@/entities/incident";
import { buildIncident } from "../model/buildIncident";
import { validateIncidentForm, type IncidentFormValues } from "../model/validate";
import styles from "./CreateIncidentModal.module.scss";

const PRIORITIES: Priority[] = ["high", "medium", "low"];

const INITIAL_VALUES: IncidentFormValues = {
  title: "",
  description: "",
  dueDate: "",
  categoryKey: "",
  priority: "",
};

interface CreateIncidentModalProps {
  isOpen: boolean;
  coordinates: Coordinates | null;
  onClose: () => void;
}

export function CreateIncidentModal({ isOpen, coordinates, onClose }: CreateIncidentModalProps) {
  const { locale, t } = useTranslation();
  const addIncident = useIncidentStore((state) => state.addIncident);
  const selectIncident = useIncidentStore((state) => state.selectIncident);
  const createdCount = useIncidentStore((state) => state.createdIncidents.length);

  const [values, setValues] = useState<IncidentFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ReturnType<typeof validateIncidentForm>>({});

  const handleChange = (field: keyof IncidentFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!coordinates) return;

    const formErrors = validateIncidentForm(values, t("createIncident.requiredError"));
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const category = incidentCategories.find((item) => item.key === values.categoryKey);
    const project = seedIncidents[0]?.project;
    if (!category || !project) return;

    const order = seedIncidents.length + createdCount + 1;
    const incident = buildIncident(values, coordinates, category, project, order);

    addIncident(incident);
    selectIncident(incident.id);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("createIncident.title")}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          label={t("createIncident.fieldTitle")}
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          error={errors.title}
          required
        />
        <Field
          as="textarea"
          label={t("createIncident.fieldDescription")}
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          error={errors.description}
          required
        />
        <Field
          type="date"
          label={t("createIncident.fieldDueDate")}
          value={values.dueDate}
          onChange={(event) => handleChange("dueDate", event.target.value)}
        />
        <Select
          label={t("createIncident.fieldCategory")}
          value={values.categoryKey}
          onChange={(event) => handleChange("categoryKey", event.target.value)}
          error={errors.categoryKey}
          required
        >
          <option value="">{t("createIncident.categoryPlaceholder")}</option>
          {incidentCategories.map((category) => (
            <option key={category.key} value={category.key}>
              {locale === "es" ? category.name : category.name_en}
            </option>
          ))}
        </Select>
        <Select
          label={t("createIncident.fieldPriority")}
          value={values.priority}
          onChange={(event) => handleChange("priority", event.target.value)}
          error={errors.priority}
          required
        >
          <option value="">{t("createIncident.priorityPlaceholder")}</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {t(PRIORITY_LABEL_KEY[priority])}
            </option>
          ))}
        </Select>

        {coordinates && (
          <p className={styles.location}>
            {t("createIncident.location")}: {coordinates.lat.toFixed(5)},{" "}
            {coordinates.lng.toFixed(5)}
          </p>
        )}

        <div className={styles.actions}>
          <Button variant="ghost" onClick={handleClose}>
            {t("createIncident.cancel")}
          </Button>
          <Button type="submit">{t("createIncident.submit")}</Button>
        </div>
      </form>
    </Modal>
  );
}
