"use client";

import { useTranslation } from "@/shared/i18n";

export default function MapaPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("mapPage.title")}</h1>
      <p>{t("mapPage.body")}</p>
    </section>
  );
}
