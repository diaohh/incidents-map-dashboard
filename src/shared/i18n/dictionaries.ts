export type Locale = "es" | "en";

export type TranslationKey =
  | "nav.mapa"
  | "nav.dashboard"
  | "navbar.brand"
  | "navbar.login"
  | "mapPage.title"
  | "mapPage.body"
  | "dashboardPage.title"
  | "dashboardPage.body"
  | "languageSwitcher.label"
  | "languageSwitcher.es"
  | "languageSwitcher.en";

export const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  es: {
    "nav.mapa": "Mapa",
    "nav.dashboard": "Dashboard",
    "navbar.brand": "Incidents",
    "navbar.login": "Iniciar sesión",
    "mapPage.title": "Vista de mapa",
    "mapPage.body": "El mapa interactivo con las incidencias llega en la Fase 3.",
    "dashboardPage.title": "Dashboard",
    "dashboardPage.body":
      "El resumen de incidencias (KPIs, distribución, tendencias) llega en la Fase 5.",
    "languageSwitcher.label": "Seleccionar idioma",
    "languageSwitcher.es": "Español",
    "languageSwitcher.en": "English",
  },
  en: {
    "nav.mapa": "Map",
    "nav.dashboard": "Dashboard",
    "navbar.brand": "Incidents",
    "navbar.login": "Sign in",
    "mapPage.title": "Map view",
    "mapPage.body": "The interactive map with incidents is coming in Phase 3.",
    "dashboardPage.title": "Dashboard",
    "dashboardPage.body": "The incidents summary (KPIs, breakdowns, trends) is coming in Phase 5.",
    "languageSwitcher.label": "Select language",
    "languageSwitcher.es": "Español",
    "languageSwitcher.en": "English",
  },
};
