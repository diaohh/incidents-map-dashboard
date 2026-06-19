# Incidents Map & Dashboard

Aplicación de gestión de incidencias para proyectos de construcción: visualización y creación
de incidencias sobre un **mapa interactivo**, más un **dashboard** que resume el estado global
del proyecto.

Prueba técnica para **Spybee**. El foco está en criterio propio, interfaces limpias y código
mantenible — no en replicar el diseño pixel a pixel.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Zustand** (estado de cliente) · **Mapbox GL** (mapa) · **SCSS Modules** (estilos)
- **pnpm** · **ESLint + Prettier**

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # y rellena tu token de Mapbox
pnpm dev                     # http://localhost:3000
```

### Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Token público de Mapbox GL. Obtén uno gratis en https://account.mapbox.com/access-tokens/ |

## Arquitectura

**Feature-Sliced Design** adaptado al App Router de Next: `app/` solo enruta; la lógica vive en
`src/` por capas (`shared → entities → features → widgets → app`). Detalle en
[`CLAUDE.md`](./CLAUDE.md).

```
app/        # rutas Next (delgadas)
src/
  app/      # providers, estilos globales, config
  widgets/  # MapView, Sidebar, Navbar, DashboardLayout
  features/ # create-incident, filter-incidents, (auth)
  entities/ # incident (modelo, store, ui)
  shared/   # ui kit, lib, config, hooks
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

## Roadmap

Plan por fases con checklist en [`docs/CHECKLIST.md`](./docs/CHECKLIST.md).

## Scripts

```bash
pnpm dev     # desarrollo
pnpm lint    # linter
pnpm build   # build de producción
```
