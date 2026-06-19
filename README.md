# Incidents Map & Dashboard

Aplicación de gestión de incidencias para proyectos de construcción: visualización y creación
de incidencias sobre un **mapa interactivo**, más un **dashboard** que resume el estado global
del proyecto.

Prueba técnica para **Spybee**. El foco está en criterio propio, interfaces limpias y código
mantenible — no en replicar el diseño pixel a pixel.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Zustand** (estado de cliente) · **Mapbox GL** (mapa) · **Firebase Auth** (login con Google)
- **SCSS Modules** (estilos) · **pnpm** · **ESLint + Prettier**

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # y rellena tu token de Mapbox + credenciales de Firebase
pnpm dev                     # http://localhost:3000
```

### Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Token público de Mapbox GL. Obtén uno gratis en https://account.mapbox.com/access-tokens/ |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Config de tu proyecto de Firebase (Configuración del proyecto → General → Tus apps). |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Idem. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Idem. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Idem. |

Sin estas 4 variables de Firebase la app funciona igual: el botón de inicio de sesión queda
deshabilitado en vez de romper el resto de la aplicación (ver ADR-006).

## Arquitectura

**Feature-Sliced Design** adaptado al App Router de Next: `app/` solo enruta; la lógica vive en
`src/` por capas (`shared → entities → features → widgets → app`).

```
app/        # rutas Next (delgadas)
src/
  app/      # providers, estilos globales, config
  widgets/  # MapView, Sidebar, Navbar, DashboardLayout, DashboardSummary
  features/ # create-incident, filter-incidents, auth
  entities/ # incident (modelo, store, ui)
  shared/   # ui kit, lib, config, i18n
```

## Decisiones de arquitectura (ADRs)

Registro breve de decisiones y su porqué. Formato: contexto → decisión → consecuencia.

### ADR-001 · SCSS Modules en lugar de Tailwind
El scaffold venía con Tailwind v4, pero el stack pedido es SCSS. **Decisión:** eliminar Tailwind
y usar **SCSS Modules** por componente + tokens globales (variables/mixins). **Por qué:** estilos
encapsulados sin colisiones, CSS legible y estructurado, alineado con el criterio de evaluación
("CSS bien estructurado"). **Consecuencia:** se mantiene un sistema de tokens central; cada
componente posee su `.module.scss`.

### ADR-002 · Feature-Sliced Design adaptado al App Router
Proyecto pequeño/mediano con dos dominios visuales (mapa, dashboard) y features transversales.
**Decisión:** FSD con `app/` reservado para routing y capas en `src/`. **Por qué:** límites
claros entre dominio, features y UI reutilizable; escala sin convertirse en una carpeta
`components/` monolítica; regla de dependencias unidireccional. **Consecuencia:** algo de
boilerplate (barrels/`index.ts`), compensado por mantenibilidad.

### ADR-003 · Zustand + persist (localStorage)
Necesitamos estado compartido (incidencias, filtros, selección en el mapa) sin servidor real.
**Decisión:** **Zustand** con middleware `persist` sobre localStorage. **Por qué:** API mínima,
sin boilerplate de context/reducers, evita prop-drilling y `useEffect` de sincronización; las
incidencias creadas sobreviven a recargas. **Consecuencia:** el estado es de cliente; el mock es
la semilla inicial de solo lectura.

### ADR-004 · `incidents.mock.json` como fuente semilla
**Decisión:** parsear el mock una vez, normalizar y tiparlo en `entities/incident`. **Por qué:**
una única fuente de verdad del dominio; el dashboard y el mapa consumen el mismo modelo.
**Consecuencia:** los tipos del dominio guían toda la app.

### ADR-005 · Política de `useEffect`
**Decisión:** usar `useEffect` **solo** para sincronizar con sistemas externos (Mapbox, `window`,
storage, timers). Derivaciones en render/`useMemo`, eventos en handlers, estado global en Zustand.
**Por qué:** menos bugs de sincronización, render más predecible, código más simple (KISS).

### ADR-006 · Autenticación decorativa con Firebase Auth (Google)
Punto extra del enunciado. **Decisión:** Firebase Auth con proveedor de Google, sin backend
propio ni pantalla de registro; el login es **decorativo** — muestra nombre/foto en el Navbar y
permite cerrar sesión, pero no protege ninguna ruta ni acción (crear incidencias, ver mapa o
dashboard funcionan igual con o sin sesión). **Por qué:** evita construir un flujo de
registro/login falso solo para simular un usuario; Firebase Console habilita el proveedor de
Google sin configurar manualmente credenciales OAuth. **Consecuencia:** requiere un proyecto de
Firebase propio (ver variables de entorno arriba); si no está configurado, el botón de inicio de
sesión se deshabilita en vez de romper la app, igual que el token de Mapbox ausente.

## Estado del proyecto

Todas las fases del roadmap están completas: setup y fundaciones, layout base, modelo de
dominio, vista de mapa con creación de incidencias, dashboard con KPIs/gráficos/tabla filtrable,
una pasada de pulido (estados vacíos, accesibilidad, manejo de errores) y autenticación
decorativa con Google. Pendiente como extra opcional: responsive avanzado para móvil/tablet.

## Scripts

```bash
pnpm dev     # desarrollo
pnpm lint    # linter
pnpm build   # build de producción
```
