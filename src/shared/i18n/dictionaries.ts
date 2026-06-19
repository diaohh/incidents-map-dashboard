export type Locale = "es" | "en";

export type TranslationKey =
  | "nav.mapa"
  | "nav.dashboard"
  | "navbar.brand"
  | "navbar.login"
  | "dashboardPage.title"
  | "dashboardPage.body"
  | "languageSwitcher.label"
  | "languageSwitcher.es"
  | "languageSwitcher.en"
  | "sidebar.expand"
  | "sidebar.collapse"
  | "mapView.tokenMissing.title"
  | "mapView.tokenMissing.body"
  | "incidentCard.close"
  | "incidentCard.owner"
  | "incidentCard.dueDate"
  | "priority.high"
  | "priority.medium"
  | "priority.low"
  | "status.open"
  | "status.on_pause"
  | "status.closed";

export const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  es: {
    "nav.mapa": "Mapa",
    "nav.dashboard": "Dashboard",
    "navbar.brand": "Incidents",
    "navbar.login": "Iniciar sesión",
    "dashboardPage.title": "Dashboard",
    "dashboardPage.body":
      "El resumen de incidencias (KPIs, distribución, tendencias) llega en la Fase 5.",
    "languageSwitcher.label": "Seleccionar idioma",
    "languageSwitcher.es": "Español",
    "languageSwitcher.en": "English",
    "sidebar.expand": "Expandir navegación",
    "sidebar.collapse": "Contraer navegación",
    "mapView.tokenMissing.title": "Falta el token de Mapbox",
    "mapView.tokenMissing.body":
      "Configura NEXT_PUBLIC_MAPBOX_TOKEN en .env.local para ver el mapa.",
    "incidentCard.close": "Cerrar",
    "incidentCard.owner": "Responsable",
    "incidentCard.dueDate": "Vence",
    "priority.high": "Alta",
    "priority.medium": "Media",
    "priority.low": "Baja",
    "status.open": "Abierta",
    "status.on_pause": "En pausa",
    "status.closed": "Cerrada",
  },
  en: {
    "nav.mapa": "Map",
    "nav.dashboard": "Dashboard",
    "navbar.brand": "Incidents",
    "navbar.login": "Sign in",
    "dashboardPage.title": "Dashboard",
    "dashboardPage.body": "The incidents summary (KPIs, breakdowns, trends) is coming in Phase 5.",
    "languageSwitcher.label": "Select language",
    "languageSwitcher.es": "Español",
    "languageSwitcher.en": "English",
    "sidebar.expand": "Expand navigation",
    "sidebar.collapse": "Collapse navigation",
    "mapView.tokenMissing.title": "Mapbox token missing",
    "mapView.tokenMissing.body": "Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to see the map.",
    "incidentCard.close": "Close",
    "incidentCard.owner": "Owner",
    "incidentCard.dueDate": "Due",
    "priority.high": "High",
    "priority.medium": "Medium",
    "priority.low": "Low",
    "status.open": "Open",
    "status.on_pause": "On pause",
    "status.closed": "Closed",
  },
};
