# FWM App

A Next.js weather forecasting and monitoring application with interactive maps, weather station data, live conditions, warnings, and multi-language support (English and Greek).

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS 3 with custom theme (primary: #3D5361, secondary: #F5F0ED)
- **UI Components:** Radix UI primitives
- **Maps:** Leaflet + react-leaflet, MapLibre GL + react-map-gl
- **Charts:** Highcharts, D3.js (spatial interpolation), Anime.js
- **State:** Zustand stores, React Context providers
- **HTTP:** Axios with custom instance; Zod validation at API boundary
- **i18n:** i18next + react-i18next (en, el)
- **Analytics:** PostHog
- **Package Manager:** pnpm (enforced — do not use npm or yarn)

## Commands

```bash
pnpm dev            # Start dev server (port 3000)
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
src/
├── app/
│   ├── appConfig.ts                        # Centralized app config
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css
│   ├── api/
│   │   └── [lng]/share-card/
│   │       └── route.tsx                   # OG share-card image generation
│   └── [lng]/                              # Dynamic language routing
│       ├── layout.tsx
│       ├── PostHogPageView.tsx
│       ├── (home)/                         # Home route group
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── page.homepage.tsx
│       ├── weather-map/                    # Interactive map page
│       │   ├── layout.tsx
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
│   │   ├── BaseMap.tsx
│   │   ├── BaseMapLibre.tsx
│   │   ├── BaseMarker.tsx
│   │   ├── BaseGeoJSON.tsx
│   │   ├── BaseDialog.tsx
│   │   ├── BaseToggle.tsx
│   │   └── BaseWeatherIcon.tsx
│   ├── Common/                             # Shared UI components
│   │   ├── CommonButton.tsx
│   │   ├── CommonDialog.tsx
│   │   ├── CommonPopover.tsx
│   │   ├── CommonSelect.tsx
│   │   ├── CommonSlider.tsx
│   │   ├── StationLink.tsx
│   │   ├── SvgInline.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── DivIconMarker.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── DropdownListMenu.tsx
│   │   ├── CollapsedCard.tsx
│   │   ├── Favorite/
│   │   │   └── favoriteStationButton.tsx
│   │   ├── General/
│   │   │   └── StationTypeLabel.tsx
│   │   ├── LibreMap/
│   │   │   └── LibreMapMarker.tsx
│   │   └── Share/                          # Social share popover
│   │       ├── Share.tsx
│   │       ├── ShareController.tsx
│   │       ├── SharePopup.tsx
│   │       └── index.tsx
│   ├── Home/                               # Homepage-only sections
│   │   ├── CityWeatherCard.tsx
│   │   ├── HomepageWarningsSection.tsx
│   │   └── HomepageStationsSection.tsx
│   ├── ShareableCards/                     # OG / share card templates
│   │   ├── CurrentWeatherShareableCard.tsx
│   │   └── createImageTemplates.ts
│   ├── WeatherMap/                         # Interactive map page components
│   │   ├── StationsMap.tsx
│   │   ├── LayersMenu.tsx
│   │   ├── ForecastLayer.tsx
│   │   ├── MapWarningsGeojsonGroup.tsx
│   │   ├── Layers/
│   │   │   ├── ClusterStationsLayer.tsx
│   │   │   ├── TemperatureLayer.tsx
│   │   │   └── WindLayer.tsx
│   │   ├── Markers/
│   │   │   ├── MapMarkerWithLabel.tsx
│   │   │   └── ClusterMarkersContent.tsx
│   │   ├── SearchForm/
│   │   │   └── MapSearchForm.tsx
│   │   └── Warnings/
│   │       └── WeatherWarningBanner.tsx
│   ├── Stations/
│   │   ├── StationsPage.tsx
│   │   └── components/
│   │       ├── StationTableColumns.tsx
│   │       └── StationsTableData.tsx
│   ├── LiveWeatherConditions/
│   │   ├── LiveWeatherConditionsPage.tsx
│   │   ├── StationWeatherForecastDetails.tsx
│   │   ├── buttons/
│   │   │   ├── BackToHomepageButton.tsx
│   │   │   └── CloseModalButton.tsx
│   │   ├── components/
│   │   │   ├── StationModalHeading.tsx
│   │   │   ├── StationModalBody.tsx
│   │   │   ├── FrostWarning.tsx
│   │   │   └── forecast/
│   │   │       ├── ForecastSummary.tsx
│   │   │       ├── ForecastPeriodLabel.tsx
│   │   │       └── ForecastSignalTranslationText.tsx
│   │   ├── loading/
│   │   │   └── LoadingScreenModal.tsx
│   │   └── helpers/
│   │       └── fetchWeatherData.ts
│   ├── StationPage/
│   │   ├── StationPage.tsx
│   │   ├── LastDayGraph.tsx
│   │   ├── MonthGraph.tsx
│   │   ├── loading/
│   │   │   └── StationPageLoading.tsx
│   │   └── components/
│   │       ├── BackButton.tsx
│   │       ├── StationPageInformation.tsx
│   │       ├── StationPageHeader.tsx
│   │       ├── StationPageMainContent.tsx
│   │       ├── StationPageMapModal.tsx
│   │       ├── StationPageClimateSummary.tsx
│   │       ├── StationPageHistoricalData.tsx
│   │       ├── TemperaturePercipitationGraph.tsx
│   │       └── WindCombinedGraph.tsx
│   ├── FthiotidaForecasts/
│   │   ├── FthiotidaForecastsPage.tsx
│   │   └── components/
│   │       ├── FthiotidaForecastsSection.tsx
│   │       ├── FthiotidaForecastsIndividualForecastCard.tsx
│   │       ├── FthiotidaForecastsIndividualWindCard.tsx
│   │       ├── CalendarSection.tsx
│   │       ├── LoadingForecastData.tsx
│   │       └── NoForecastSection.tsx
│   ├── Warnings/
│   │   ├── WarningsPage.tsx
│   │   ├── WarningsPanel.tsx
│   │   ├── WarningsInformationModal.tsx
│   │   ├── utils/
│   │   │   └── warningsHelpers.ts
│   │   └── components/
│   │       ├── WarningsTableData.tsx
│   │       ├── HazardIcon.tsx
│   │       ├── WarningLevelsLegend.tsx
│   │       └── WarningHazardsLegend.tsx
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── HeaderMenu.tsx
│   │   ├── MobileHeaderMenu.tsx
│   │   └── HeaderChangeLanguageMenu.tsx
│   ├── Graphs/
│   │   ├── AreaGraphDateTime.tsx
│   │   └── LineGraphDateTime.tsx
│   └── MapControls/
│       └── MapControls.tsx
├── stores/                                 # Zustand state
│   ├── mapStore.ts
│   ├── settingsStore.ts
│   ├── configurationStore.ts
│   └── forecastLayerStore.ts
├── hooks/                                  # Custom React hooks
│   ├── useAppStore.ts
│   ├── useDialog.ts
│   ├── useFetchGeneral.ts
│   ├── useFetchAssetsFromFolder.ts
│   ├── useAnimeIcon.ts
│   └── useRedirectToHomeOnBack.ts
├── services/
│   └── DataService.ts                      # Single API client with Zod validation
├── schemas/                                # Zod schemas for all API responses
│   ├── index.ts
│   ├── WeatherData.ts
│   ├── WeatherStations.ts
│   ├── ClimatologyData.ts
│   ├── HistoricalDataSchema.ts
│   ├── ConfigurationSchemas.ts
│   ├── WeatherWarnings.ts
│   └── AssetsDirectus.ts
├── types/                                  # TypeScript types and enums
│   ├── index.ts
│   ├── general.ts
│   ├── weatherData.ts
│   ├── weatherForecast.ts
│   ├── stations.ts
│   ├── stationPage.ts
│   ├── measurements.ts
│   ├── gisTypes.ts
│   ├── mapSettings.ts
│   ├── climateWeatherData.ts
│   ├── FthiotidaForecasts.ts
│   ├── warnings.ts
│   ├── assets.ts
│   ├── loading_messages.ts
│   ├── leaflet.velocity.d.ts
│   └── enums/
│       ├── weatherForecastEnums.ts
│       ├── stationTypesEnum.ts
│       └── graphEnums.ts
├── helpers/                                # Domain-specific business logic
│   ├── general.tsx
│   ├── internationalization.tsx
│   ├── createStationName.tsx
│   ├── weatherCalculations.ts
│   ├── graphHelpers.tsx
│   ├── assetsHandling.tsx
│   ├── animations.tsx
│   ├── fthiotidaForecastLocations.tsx
│   ├── stationPage/
│   │   └── getExtremeValues.ts
│   └── forecastSignals/
│       ├── calculateForecastSignalsText.ts
│       ├── generalSignalCalculations.ts
│       ├── temperatureSignalCalculations.ts
│       ├── windSignalCalculations.ts
│       ├── precipSignalCalculations.ts
│       └── cloudinessSignalCalculations.ts
├── utils/                                  # Generic utility functions (date, math, GIS, units)
│   ├── mathUtils.ts
│   ├── dateTimeUtils.ts
│   ├── dateManipulation.ts
│   ├── localStorage.ts
│   ├── d3Utils.ts
│   ├── weatherConvertUnits.ts
│   ├── weatherDataFormatUtils.ts
│   ├── colorManipulation.ts
│   ├── httpClientUtils.ts
│   ├── gisUtils.ts
│   └── transformTranslations.ts
├── providers/                              # React context providers
│   ├── clientProvider.tsx
│   ├── StationsProvider.tsx
│   └── DayjsLocaleProvider.tsx
├── i18n/                                   # i18next config + locales
│   ├── index.ts
│   ├── client.ts
│   ├── i18next.ts
│   ├── settings.ts
│   └── locales/
│       ├── en/
│       │   ├── common.json
│       │   ├── forecasts.json
│       │   ├── pages.json
│       │   ├── station.json
│       │   ├── stationModal.json
│       │   ├── warnings.json
│       │   ├── weather_conditions.json
│       │   └── weather_icons.json
│       └── el/
│           ├── common.json
│           ├── forecasts.json
│           ├── pages.json
│           ├── station.json
│           ├── stationModal.json
│           ├── warnings.json
│           ├── weather_conditions.json
│           └── weather_icons.json
├── constants/
│   └── Colors.ts                           # App-wide color constants
├── assets/
│   ├── logos/
│   │   ├── logo.png
│   │   └── myweathr.png
│   └── styles/
│       └── spinner.css
├── __MOCKS__/
│   └── forecastMockResponse.json           # Mock data for tests
└── proxy.ts                                # HTTP client proxy configuration
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
- All API calls go through `DataService` — do not make raw Axios calls in components
- Zustand stores for UI/map state; React providers for heavier shared state
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
```

All variables are browser-exposed (`NEXT_PUBLIC_*`). Do not store secrets here.

## Key Patterns

- **API boundary:** `DataService` → Axios → Zod parse → typed result or `DataServiceError`
- **Routing:** `src/app/[lng]/` — every page is under a language segment
- **Map layers:** Leaflet for standard tiles + velocity (wind), MapLibre for vector tiles
- **Releases:** `pnpm release:patch/minor/major` (standard-version, updates CHANGELOG.md)
- **Docker:** `prod.Dockerfile` for production container builds
