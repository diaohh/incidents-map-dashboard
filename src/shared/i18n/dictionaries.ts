export type Locale = "es" | "en";

export type TranslationKey =
  | "nav.mapa"
  | "nav.dashboard"
  | "navbar.brand"
  | "navbar.login"
  | "languageSwitcher.label"
  | "languageSwitcher.es"
  | "languageSwitcher.en"
  | "sidebar.expand"
  | "sidebar.collapse"
  | "mapView.tokenMissing.title"
  | "mapView.tokenMissing.body"
  | "mapView.loadError.title"
  | "mapView.loadError.body"
  | "auth.menuLabel"
  | "auth.signInWithGoogle"
  | "auth.signOut"
  | "auth.notConfigured"
  | "incidentCard.close"
  | "incidentCard.owner"
  | "incidentCard.dueDate"
  | "priority.high"
  | "priority.medium"
  | "priority.low"
  | "status.open"
  | "status.on_pause"
  | "status.closed"
  | "createIncident.trigger"
  | "createIncident.locationPrompt"
  | "createIncident.title"
  | "createIncident.fieldTitle"
  | "createIncident.fieldDescription"
  | "createIncident.fieldDueDate"
  | "createIncident.fieldCategory"
  | "createIncident.fieldPriority"
  | "createIncident.categoryPlaceholder"
  | "createIncident.priorityPlaceholder"
  | "createIncident.location"
  | "createIncident.submit"
  | "createIncident.cancel"
  | "createIncident.requiredError"
  | "filters.status"
  | "filters.priority"
  | "filters.category"
  | "filters.all"
  | "filters.clear"
  | "dashboard.title"
  | "dashboard.kpi.total"
  | "dashboard.kpi.open"
  | "dashboard.kpi.onPause"
  | "dashboard.kpi.closed"
  | "dashboard.kpi.approvalRate"
  | "dashboard.kpi.overdue"
  | "dashboard.chart.byStatus"
  | "dashboard.chart.byPriority"
  | "dashboard.chart.byCategory"
  | "dashboard.chart.trend"
  | "dashboard.chart.created"
  | "dashboard.chart.closed"
  | "dashboard.chart.empty"
  | "dashboard.table.title"
  | "dashboard.table.column.title"
  | "dashboard.table.column.category"
  | "dashboard.table.column.priority"
  | "dashboard.table.column.status"
  | "dashboard.table.column.dueDate"
  | "dashboard.table.empty";

export const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  es: {
    "nav.mapa": "Mapa",
    "nav.dashboard": "Dashboard",
    "navbar.brand": "Incidents",
    "navbar.login": "Iniciar sesión",
    "languageSwitcher.label": "Seleccionar idioma",
    "languageSwitcher.es": "Español",
    "languageSwitcher.en": "English",
    "sidebar.expand": "Expandir navegación",
    "sidebar.collapse": "Contraer navegación",
    "mapView.tokenMissing.title": "Falta el token de Mapbox",
    "mapView.tokenMissing.body":
      "Configura NEXT_PUBLIC_MAPBOX_TOKEN en .env.local para ver el mapa.",
    "mapView.loadError.title": "No se pudo cargar el mapa",
    "mapView.loadError.body": "Revisa que el token de Mapbox sea válido e intenta de nuevo.",
    "auth.menuLabel": "Menú de cuenta",
    "auth.signInWithGoogle": "Iniciar sesión con Google",
    "auth.signOut": "Cerrar sesión",
    "auth.notConfigured": "Falta configurar Firebase para iniciar sesión",
    "incidentCard.close": "Cerrar",
    "incidentCard.owner": "Responsable",
    "incidentCard.dueDate": "Vence",
    "priority.high": "Alta",
    "priority.medium": "Media",
    "priority.low": "Baja",
    "status.open": "Abierta",
    "status.on_pause": "En pausa",
    "status.closed": "Cerrada",
    "createIncident.trigger": "Crear incidencia",
    "createIncident.locationPrompt": "Haz click en el mapa para ubicar la incidencia",
    "createIncident.title": "Crear incidencia",
    "createIncident.fieldTitle": "Título",
    "createIncident.fieldDescription": "Descripción",
    "createIncident.fieldDueDate": "Fecha de vencimiento",
    "createIncident.fieldCategory": "Categoría",
    "createIncident.fieldPriority": "Prioridad",
    "createIncident.categoryPlaceholder": "Selecciona una categoría",
    "createIncident.priorityPlaceholder": "Selecciona una prioridad",
    "createIncident.location": "Ubicación seleccionada",
    "createIncident.submit": "Crear",
    "createIncident.cancel": "Cancelar",
    "createIncident.requiredError": "Este campo es obligatorio",
    "filters.status": "Estado",
    "filters.priority": "Prioridad",
    "filters.category": "Categoría",
    "filters.all": "Todas",
    "filters.clear": "Limpiar filtros",
    "dashboard.title": "Dashboard de incidencias",
    "dashboard.kpi.total": "Total",
    "dashboard.kpi.open": "Abiertas",
    "dashboard.kpi.onPause": "En pausa",
    "dashboard.kpi.closed": "Cerradas",
    "dashboard.kpi.approvalRate": "% aprobación",
    "dashboard.kpi.overdue": "Vencidas",
    "dashboard.chart.byStatus": "Distribución por estado",
    "dashboard.chart.byPriority": "Distribución por prioridad",
    "dashboard.chart.byCategory": "Distribución por categoría",
    "dashboard.chart.trend": "Tendencia mensual",
    "dashboard.chart.created": "Creadas",
    "dashboard.chart.closed": "Cerradas",
    "dashboard.chart.empty": "No hay datos para mostrar con estos filtros.",
    "dashboard.table.title": "Incidencias",
    "dashboard.table.column.title": "Título",
    "dashboard.table.column.category": "Categoría",
    "dashboard.table.column.priority": "Prioridad",
    "dashboard.table.column.status": "Estado",
    "dashboard.table.column.dueDate": "Vence",
    "dashboard.table.empty": "No hay incidencias con estos filtros.",
  },
  en: {
    "nav.mapa": "Map",
    "nav.dashboard": "Dashboard",
    "navbar.brand": "Incidents",
    "navbar.login": "Sign in",
    "languageSwitcher.label": "Select language",
    "languageSwitcher.es": "Español",
    "languageSwitcher.en": "English",
    "sidebar.expand": "Expand navigation",
    "sidebar.collapse": "Collapse navigation",
    "mapView.tokenMissing.title": "Mapbox token missing",
    "mapView.tokenMissing.body": "Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to see the map.",
    "mapView.loadError.title": "Couldn't load the map",
    "mapView.loadError.body": "Check that your Mapbox token is valid and try again.",
    "auth.menuLabel": "Account menu",
    "auth.signInWithGoogle": "Sign in with Google",
    "auth.signOut": "Sign out",
    "auth.notConfigured": "Firebase isn't configured for sign-in",
    "incidentCard.close": "Close",
    "incidentCard.owner": "Owner",
    "incidentCard.dueDate": "Due",
    "priority.high": "High",
    "priority.medium": "Medium",
    "priority.low": "Low",
    "status.open": "Open",
    "status.on_pause": "On pause",
    "status.closed": "Closed",
    "createIncident.trigger": "Create incident",
    "createIncident.locationPrompt": "Click on the map to place the incident",
    "createIncident.title": "Create incident",
    "createIncident.fieldTitle": "Title",
    "createIncident.fieldDescription": "Description",
    "createIncident.fieldDueDate": "Due date",
    "createIncident.fieldCategory": "Category",
    "createIncident.fieldPriority": "Priority",
    "createIncident.categoryPlaceholder": "Select a category",
    "createIncident.priorityPlaceholder": "Select a priority",
    "createIncident.location": "Selected location",
    "createIncident.submit": "Create",
    "createIncident.cancel": "Cancel",
    "createIncident.requiredError": "This field is required",
    "filters.status": "Status",
    "filters.priority": "Priority",
    "filters.category": "Category",
    "filters.all": "All",
    "filters.clear": "Clear filters",
    "dashboard.title": "Incidents dashboard",
    "dashboard.kpi.total": "Total",
    "dashboard.kpi.open": "Open",
    "dashboard.kpi.onPause": "On pause",
    "dashboard.kpi.closed": "Closed",
    "dashboard.kpi.approvalRate": "% approved",
    "dashboard.kpi.overdue": "Overdue",
    "dashboard.chart.byStatus": "Distribution by status",
    "dashboard.chart.byPriority": "Distribution by priority",
    "dashboard.chart.byCategory": "Distribution by category",
    "dashboard.chart.trend": "Monthly trend",
    "dashboard.chart.created": "Created",
    "dashboard.chart.closed": "Closed",
    "dashboard.chart.empty": "No data to show with these filters.",
    "dashboard.table.title": "Incidents",
    "dashboard.table.column.title": "Title",
    "dashboard.table.column.category": "Category",
    "dashboard.table.column.priority": "Priority",
    "dashboard.table.column.status": "Status",
    "dashboard.table.column.dueDate": "Due",
    "dashboard.table.empty": "No incidents match these filters.",
  },
};
