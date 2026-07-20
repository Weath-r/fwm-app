# FWM App

A Next.js weather forecasting and monitoring application with interactive maps, weather station data, live conditions, warnings, and multi-language support (English and Greek).

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS 3 with custom theme (primary: #3D5361, secondary: #F5F0ED)
- **UI Components:** Radix UI primitives; TanStack Table for data tables
- **Maps:** Leaflet + react-leaflet, MapLibre GL + react-map-gl
- **Charts:** Highcharts, D3.js (spatial interpolation), Anime.js
- **State:** Zustand stores, React Context providers
- **HTTP:** native `fetch` through `DataService` (single chokepoint); Zod validation at the API boundary; optional Next.js Data Cache options per call
- **i18n:** i18next + react-i18next (en, el)
- **Analytics:** PostHog
- **Package Manager:** pnpm (enforced via `only-allow` — do not use npm or yarn)

## Architecture Docs

`architecture/` (repo root, outside `src/`) holds the living architecture reference — consult it before structural decisions and keep it updated when the shape of the system changes:

- `architecture/current-architecture.md` — as-is system context, frontend layering, caching rules, `weather_data` flow
- `architecture/weather-data-websocket.md` — target design for `weather_data` over Directus Realtime
- `architecture/architecture.html` — self-contained rendered version of both (diagrams also live in its `DIAGRAMS` object; update `.md` and `.html` together)

## Commands

```bash
pnpm dev            # Start dev server (port 3000)
pnpm dev-secure     # Dev server with experimental HTTPS
pnpm build          # Production build
pnpm start          # Start production server
pnpm test           # Run tests once
pnpm test:watch     # Watch mode
pnpm test:coverage  # Coverage report
pnpm lint           # ESLint check
pnpm lint:fix       # Auto-fix lint issues
```

## Project Structure

```
architecture/                               # Architecture reference docs (see above)
src/
├── app/
│   ├── appConfig.ts                        # Centralized app config
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css
│   ├── api/
│   │   ├── [lng]/share-card/route.tsx      # OG share-card image generation
│   │   └── revalidate/route.ts             # Secret-gated on-demand Data Cache invalidation
│   └── [lng]/                              # Dynamic language routing
│       ├── layout.tsx
│       ├── not-found.tsx
│       ├── [...notFound]/page.tsx          # Catch-all 404
│       ├── PostHogPageView.tsx
│       ├── (home)/                         # Home route group
│       │   ├── layout.tsx                  # Mounts StationsProvider
│       │   ├── page.tsx
│       │   └── page.homepage.tsx           # RSC sections wrapped in Suspense + skeletons
│       ├── weather-map/
│       │   ├── layout.tsx                  # Mounts StationsProvider
│       │   ├── page.tsx
│       │   ├── page.weathermap.tsx
│       │   └── @modal/                     # Parallel modal slot
│       │       ├── default.tsx
│       │       ├── error.tsx
│       │       └── (..)live-weather-conditions/[id]/[name]/  # Intercepted route
│       │           ├── page.tsx
│       │           ├── page.client.tsx
│       │           └── loading.tsx
│       ├── stations/
│       │   ├── page.tsx
│       │   └── page.client.tsx
│       ├── station/[id]/[name]/
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   └── opengraph-image.tsx
│       ├── live-weather-conditions/[id]/[name]/
│       │   ├── page.tsx
│       │   ├── page.client.tsx
│       │   └── opengraph-image.tsx
│       ├── fthiotida-forecast/
│       │   ├── page.tsx
│       │   └── page.client.tsx
│       ├── warnings/
│       │   ├── page.tsx
│       │   └── page.client.tsx
│       └── about-us/
│           └── page.tsx
├── components/
│   ├── BaseComponents/                     # Map and UI primitives
│   │   ├── BaseMap.tsx / BaseMapLibre.tsx / BaseMarker.tsx / BaseGeoJSON.tsx
│   │   └── BaseDialog.tsx / BaseToggle.tsx / BaseWeatherIcon.tsx
│   ├── Common/                             # Shared UI components
│   │   ├── CommonButton / CommonDialog / CommonPopover / CommonSelect / CommonSlider
│   │   ├── StationLink / SvgInline / LoadingSpinner / DivIconMarker
│   │   ├── DropdownMenu / DropdownListMenu / CollapsedCard
│   │   ├── Favorite/favoriteStationButton.tsx
│   │   ├── General/StationTypeLabel.tsx
│   │   ├── LibreMap/LibreMapMarker.tsx
│   │   └── Share/                          # Social share popover
│   ├── Home/                               # Homepage sections — each: Section (RSC fetch) + View (client) + Skeleton
│   │   ├── About/HomepageAboutSection.tsx
│   │   ├── MajorCities/                    # CityWeatherCard, MajorCitiesSection, MajorCitiesSkeleton
│   │   ├── Stations/                       # HomepageStationsSection, ...View, ...Skeleton
│   │   └── Warnings/                       # HomepageWarningsSection, ...View, ...Skeleton
│   ├── Seo/                                # JsonLd.tsx, StationStructuredData.tsx
│   ├── NotFound/                           # NotFoundPage, OffGridStationScene, module CSS
│   ├── StationUnavailable/StationUnavailable.tsx
│   ├── ShareableCards/                     # OG / share card templates
│   │   ├── CurrentWeatherShareableCard.tsx
│   │   ├── StationUnavailableShareableCard.tsx
│   │   └── createImageTemplates.ts
│   ├── WeatherMap/                         # Interactive map page components
│   │   ├── StationsMap.tsx / LayersMenu.tsx / ForecastLayer.tsx / MapWarningsGeojsonGroup.tsx
│   │   ├── Layers/                         # ClusterStationsLayer, TemperatureLayer, WindLayer
│   │   ├── Markers/                        # MapMarkerWithLabel, ClusterMarkersContent
│   │   ├── SearchForm/MapSearchForm.tsx
│   │   └── Warnings/WeatherWarningBanner.tsx
│   ├── Stations/
│   │   ├── StationsPage.tsx                # Client component, fetches on mount
│   │   └── components/                     # StationTableColumns, StationsTableData
│   ├── LiveWeatherConditions/
│   │   ├── LiveWeatherConditionsPage.tsx
│   │   ├── StationWeatherForecastDetails.tsx
│   │   ├── buttons/CloseModalButton.tsx
│   │   ├── components/                     # StationModalHeading, StationModalBody, FrostWarning, HeroBackground, forecast/
│   │   ├── loading/LoadingScreenModal.tsx
│   │   └── helpers/fetchWeatherData.ts     # Server-side data loader (React cache())
│   ├── StationPage/
│   │   ├── StationPage.tsx / LastDayGraph.tsx / MonthGraph.tsx
│   │   ├── helpers/fetchStationPageData.ts # Server-side data loader (React cache())
│   │   ├── loading/StationPageLoading.tsx
│   │   └── components/                     # BackButton, StationPageInformation, StationPageMainContent,
│   │                                       # StationPageMapModal, StationPageClimateSummary,
│   │                                       # StationPageHistoricalData, TemperaturePercipitationGraph, WindCombinedGraph
│   ├── FthiotidaForecasts/
│   │   ├── FthiotidaForecastsPage.tsx
│   │   └── components/
│   ├── Warnings/
│   │   ├── WarningsPage.tsx / WarningsPanel.tsx / WarningsInformationModal.tsx
│   │   ├── utils/warningsHelpers.ts
│   │   └── components/                     # WarningsTableData, HazardIcon, legends
│   ├── Header/
│   ├── Graphs/                             # AreaGraphDateTime, LineGraphDateTime
│   └── MapControls/MapControls.tsx
├── stores/                                 # Zustand state
│   ├── mapStore.ts
│   ├── configurationStore.ts               # Feature flags (hydrated from server config)
│   └── forecastLayerStore.ts
├── hooks/
│   ├── useAppStore.ts                      # Favourites (persisted to localStorage)
│   ├── useDialog.ts / useFetchAssetsFromFolder.ts / useAnimeIcon.ts / useRedirectToHomeOnBack.ts
├── services/
│   ├── DataService.ts                      # Single API client: fetch → Zod parse → typed result
│   ├── cacheTags.ts                        # Central registry of Next.js Data Cache tags
│   ├── getWeatherStations.ts               # Cached server getters: fetch + revalidate window + tag
│   ├── getConfiguration.ts                 # Feature flags, shared across requests
│   ├── getLatestReadings.ts                # Shared 60s snapshot of latest weather_data per station
│   ├── getForecastByStation.ts             # Per-station forecast, 6h TTL + forecasts tag
│   ├── getEnvironmentalData.ts             # Per-cluster AQI/UV, 15min TTL (no tag)
│   ├── getClimatologyData.ts / getWeatherHazards.ts / getWarningLevels.ts
├── schemas/                                # Zod schemas for all API responses
│   ├── index.ts
│   ├── WeatherData.ts / WeatherStations.ts / ClimatologyData.ts
│   ├── HistoricalDataSchema.ts / ConfigurationSchemas.ts
│   ├── WeatherWarnings.ts / EnvironmentalData.ts / AssetsDirectus.ts
├── types/                                  # TypeScript types and enums
│   ├── index.ts, general.ts, weatherData.ts, weatherForecast.ts, stations.ts,
│   ├── stationPage.ts, measurements.ts, gisTypes.ts, mapSettings.ts,
│   ├── climateWeatherData.ts, FthiotidaForecasts.ts, warnings.ts, assets.ts,
│   ├── loading_messages.ts, leaflet.velocity.d.ts
│   └── enums/                              # weatherForecastEnums, stationTypesEnum, graphEnums,
│                                           # environmentalCategories, shareableCards
├── helpers/                                # Domain-specific business logic
│   ├── general.tsx, internationalization.tsx, createStationName.tsx,
│   ├── weatherCalculations.ts, graphHelpers.tsx, assetsHandling.tsx,
│   ├── animations.tsx, fthiotidaForecastLocations.tsx
│   ├── liveWeather/                        # heroBackdrop.ts, heroMood.ts
│   ├── seo/structuredData.ts
│   ├── stationPage/getExtremeValues.ts
│   └── forecastSignals/                    # calculateForecastSignalsText + per-signal calculations
├── utils/                                  # Generic utilities (date, math, GIS, units, colors)
│   ├── mathUtils.ts, dateTimeUtils.ts, dateManipulation.ts, localStorage.ts,
│   ├── d3Utils.ts, weatherConvertUnits.ts, weatherDataFormatUtils.ts,
│   └── colorManipulation.ts, gisUtils.ts, transformTranslations.ts
├── providers/                              # React context providers
│   ├── clientProvider.tsx
│   ├── StationsProvider.tsx                # Stations metadata + active warnings (client)
│   ├── ConfigStoreHydrator.tsx             # Server config → configurationStore
│   └── DayjsLocaleProvider.tsx
├── constants/
│   ├── Colors.ts
│   └── navigation.ts
├── i18n/                                   # i18next config + locales
│   └── locales/{en,el}/                    # common, forecasts, pages, station, stationModal,
│                                           # warnings, weather_conditions, weather_icons,
│                                           # homepage, aqi, uv, notFound, shareableCards, stationUnavailable
├── assets/                                 # logos/, styles/spinner.css
├── __MOCKS__/                              # forecastMockResponse.json, serverOnly.ts
└── proxy.ts                                # Language-detection request proxy (Next.js proxy convention)
```

## Code Conventions

### Formatting (Prettier)

- **Indent:** 4 spaces
- **Line width:** 100 characters
- **Quotes:** Double
- **Semicolons:** Required
- **Trailing commas:** ES5 style (objects/arrays: yes, imports/exports: no)

### TypeScript

- Strict mode enabled
- Path alias: `@/*` → `src/*`
- No explicit `any` (rule disabled but avoid it anyway)
- Zod schemas validate all external data; infer types from schemas
- **Variable names:** always use full, descriptive names — avoid one or two-letter variables (e.g. `st`, `c`, `w`, `acc`). The only accepted short names are `t` (i18next translate function), `lng` (language code, established convention throughout the codebase), and `prev` (React setState callback convention)

### ESLint

- 4-space indent enforced
- Semicolons required
- `exhaustive-deps` hook rule is off
- Tailwind CSS plugin applied (class ordering not enforced)

### Architecture Rules

- Server components by default; use `"use client"` only when needed
- All API calls go through `DataService` — no raw fetch/HTTP calls in components
- **Server data layer:** reads that benefit from caching go through `src/services/get*.ts` getters, which pass Next.js Data Cache options (`revalidate` + tag) into `DataService`. Tags are registered centrally in `services/cacheTags.ts`; `/api/revalidate?tag=…` (Bearer-secret-gated, called by Directus Flows) invalidates on demand. Calls without cache options are uncached
- **Cache invalidation rule of thumb:** tag what's written in discrete batches (forecasts, config, stations metadata), TTL what changes on a rolling cadence (`getLatestReadings` 60s, `getEnvironmentalData` 15min), never tag what's written continuously (`weather_data` inserts). Homepage sections and server page loaders consume the shared `getLatestReadings` snapshot instead of querying `weather_data` per station; `/stations` (client) still fetches directly
- **Homepage section pattern:** each section is a server component that fetches (`*Section.tsx`), renders through a presentational client component (`*SectionView.tsx`), and streams behind `Suspense` with a `*Skeleton.tsx` fallback
- Server-side page data loaders (`fetchStationPageData`, `fetchWeatherData`) are wrapped in React `cache()` for per-request dedupe
- Zustand stores for UI/map state; React providers for heavier shared state. `configurationStore` feature flags come from `getConfiguration` via `ConfigStoreHydrator`
- Translations live in `src/i18n/locales/{en,el}/*.json`; namespaces are loaded on-demand by filename — adding a new `*.json` file is sufficient, no config change needed
- **Units:** always use the `Measurements` enum from `src/types/measurements.ts` for unit strings (`°C`, `Bft`, `mm`, `hPa`, `%`, etc.) — never hardcode them inline
- **Weather condition labels** (Wind, Rain, Temperature, etc.): use `useT("weather_conditions")` — translations already exist in both locales

## Testing

- Jest 30 + ts-jest, jsdom environment
- Tests live in `__tests__/` subdirectories alongside the code they test
- File pattern: `*.test.ts(x)` or `*.spec.ts(x)`
- Module alias `@/*` resolved in tests
- D3 sub-packages are explicitly transformed (not excluded)
- Pre-commit hook runs `pnpm lint:fix` and `pnpm test` on staged files

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_APP_BASE_URL=
NEXT_PUBLIC_APP_VERSION=$npm_package_version
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_FORECAST_JSON_FOLDER=
NEXT_PUBLIC_ASSETS_VERSION=
NEXT_PUBLIC_MAPBOX_TOKEN=

CONFIG_REVALIDATE_SECRET=
```

`NEXT_PUBLIC_*` variables are browser-exposed — do not store secrets in them. `CONFIG_REVALIDATE_SECRET` (also read as `REVALIDATE_SECRET`) is server-only and gates `/api/revalidate`.

## Key Patterns

- **API boundary:** `DataService` → native `fetch` → Zod parse → typed result or `DataServiceError`; Directus REST is the only backend (`items/*` collections, `files`, `assets`)
- **Routing:** `src/app/[lng]/` — every page is under a language segment; `src/proxy.ts` handles language detection/redirects
- **Map layers:** Leaflet for standard tiles + velocity (wind), MapLibre for vector tiles; temperature/wind layers render forecast JSON assets (kriging + leaflet-velocity), station markers show metadata from `StationsProvider`
- **SEO:** JSON-LD via `components/Seo/`, per-page `opengraph-image.tsx`, share cards via `/api/[lng]/share-card`
- **Releases:** `pnpm release:patch/minor/major` (standard-version, updates CHANGELOG.md)
- **Docker:** `prod.Dockerfile` for production container builds

## General rules

- Minimize the usage of comments only when is really necessary
