"use client";

import { useTranslation } from "@/shared/i18n";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("dashboardPage.title")}</h1>
      <p>{t("dashboardPage.body")}</p>
    </section>
  );
}
