# FWM App — Current Architecture

> Reference document. Reflects the codebase as of 2026-07-20 (branch `development`, v1.18.x).
> Companion HTML version (rendered diagrams, offline): [`architecture.html`](./architecture.html)
> Target realtime design: [`weather-data-websocket.md`](./weather-data-websocket.md)

## 1. System context

The Next.js app is a **read-only consumer of Directus REST**. All writes happen upstream
(crawlers, GRIB processing); the app never mutates data.

```mermaid
flowchart LR
    subgraph upstream["Upstream services"]
        crawlers["fwm-crawlers<br/>Node/Express<br/>station scraping, AccuWeather,<br/>Meteoalarm warnings"]
        pyservice["fwm-python-service<br/>Flask<br/>GFS GRIB → forecast JSON"]
    end

    subgraph platform["Data platform"]
        directus["Directus<br/>REST API + Files/Assets"]
        pg[("PostgreSQL")]
        directus --- pg
    end

    subgraph fwmapp["fwm-app (Next.js 16)"]
        server["Next.js server<br/>RSC + Data Cache<br/>/api/revalidate, /api/share-card"]
        browser["Browser<br/>client components, stores,<br/>Leaflet / MapLibre maps"]
        server -->|"HTML + RSC payload"| browser
    end

    posthog["PostHog analytics"]

    crawlers -->|"writes weather_data,<br/>warnings, stations"| directus
    pyservice -->|"uploads forecast JSON assets"| directus
    server -->|"REST (uncached or Data Cache)"| directus
    browser -->|"REST (direct, public role)"| directus
    browser -.-> posthog
```

Key property: **the browser talks to Directus directly** (base URL is `NEXT_PUBLIC_APP_BASE_URL`,
public/anonymous role). The Next.js server is not a proxy for client-side calls — client and
server both go straight to Directus through the same `DataService`.

## 2. Frontend layering

```mermaid
flowchart TB
    subgraph routes["Routes — src/app/[lng]/"]
        home["(home) homepage"]
        wmap["weather-map<br/>+ @modal intercepted route"]
        stationsR["stations"]
        stationR["station/[id]/[name]"]
        liveR["live-weather-conditions/[id]/[name]"]
        fthR["fthiotida-forecast"]
        warnR["warnings"]
    end

    subgraph state["Client state"]
        stationsProv["StationsProvider (Context)<br/>stations metadata + active warnings<br/>mounted twice: (home) layout & weather-map layout"]
        mapStore["mapStore (zustand)"]
        confStore["configurationStore (zustand)<br/>feature flags"]
        fcStore["forecastLayerStore (zustand)<br/>forecast grid data"]
        appStore["useAppStore (zustand)<br/>favourites → localStorage"]
    end

    subgraph serverData["Server data layer"]
        getters["Cached getters — src/services/get*.ts<br/>getWeatherStations · getConfiguration<br/>getClimatologyData · getWeatherHazards · getWarningLevels<br/>fetch + revalidate + cache tags"]
        revalidate["/api/revalidate?tag=…<br/>secret-gated on-demand invalidation<br/>tags registry: services/cacheTags.ts"]
        revalidate --> getters
    end

    ds["DataService — src/services/DataService.ts<br/>single transport chokepoint: fetch → Zod parse → typed result | DataServiceError"]

    directus["Directus REST<br/>items/weather_stations · items/weather_data<br/>items/weather_data_aggregated_monthly · items/historical_climatological_data<br/>items/weather_warnings · items/hazard_types · items/warning_levels<br/>items/weather_forecasts · items/fthiotida_forecasts<br/>items/frost_data · items/environmental_data · files · assets"]

    routes --> state
    routes --> serverData
    state --> ds
    serverData --> ds
    ds --> directus
```

Caching rules today:

| Path | Cache | Invalidation |
|---|---|---|
| `get*.ts` getters (stations metadata, config/flags, climatology, hazards, warning levels) | Next.js Data Cache, `revalidate` window + tag | time-based or `/api/revalidate` |
| `getLatestReadings` (last-1h all-stations `weather_data` snapshot) | Data Cache, 60s window | time-based only — **never** wire a per-insert Flow to this tag |
| `getForecastByStation` (per-station latest forecast) | Data Cache, 6h window + `forecasts` tag | Directus Flow on `weather_forecasts` POSTs `/api/revalidate?tag=forecasts` after each generation run |
| `getEnvironmentalData` (per-cluster AQI/UV) | Data Cache, 15min window | time-based only |
| Everything else through `DataService` (incl. **per-station `weather_data` reads** and history) | **uncached** — hits Directus on every render/mount | n/a |

Invalidation rule of thumb: **tag** what's written in discrete batches (forecasts, config,
stations metadata), **TTL** what changes on a rolling cadence (readings snapshot, environmental),
never tag what's written continuously (`weather_data` inserts — that's the websocket's job).

## 3. `weather_data` flow — the detail that matters for the websocket decision

Five surfaces consume `items/weather_data`. None of them poll; freshness is bound to
page load / navigation.

```mermaid
flowchart TB
    wd[("Directus<br/>items/weather_data")]

    subgraph serverSide["Server-rendered (per request / navigation)"]
        homeStations["Homepage · HomepageStationsSection (RSC)<br/>getLatestReadings — shared snapshot,<br/>Data Cache 60s"]
        majorCities["Homepage · MajorCitiesSection (RSC)<br/>same snapshot filtered by stationIds<br/>+ cached forecast getter × N (6h + tag)<br/>+ cached environmental getter × N (15min)"]
        liveCond["live-weather-conditions page + map @modal<br/>FetchLiveWeatherStationData<br/>latest reading (limit 1) + forecast + frost + environmental"]
        stationPage["station/[id] page<br/>fetchStationPageData<br/>latest reading + 1 month of readings (paginated)<br/>+ monthly aggregates + climatology + frost + environmental"]
    end

    subgraph clientSide["Client-rendered (fetch on mount)"]
        stationsList["stations page · StationsPage (client)<br/>fetchWeatherStationsWithData<br/>same last-1h ALL-stations query as homepage"]
    end

    subgraph notWD["Weather map — does NOT read weather_data today"]
        mapMarkers["Station markers ← StationsProvider<br/>weather_stations metadata + AccuWeather condition/icon"]
        fcLayers["Temperature/Wind layers ← forecast JSON assets<br/>(kriging + leaflet-velocity), not station readings"]
    end

    wd --> homeStations
    wd --> majorCities
    wd --> liveCond
    wd --> stationPage
    wd --> stationsList
```

### Consumer matrix

| Surface | Component | Runs | Query against `weather_data` | Refresh |
|---|---|---|---|---|
| Homepage — stations grid | `HomepageStationsSection` (RSC) | server, cached 60s | `getLatestReadings` shared snapshot | page load (≤60s stale) |
| Homepage — major cities | `MajorCitiesSection` (RSC) | server, cached | same snapshot filtered by `stationIds`; forecast/environmental via cached getters | page load (≤60s stale) |
| `/stations` list | `StationsPage` (client) | browser, on mount | last 1h, all stations — still a direct uncached client fetch | mount only |
| Live conditions page + map modal | `FetchLiveWeatherStationData` (server) | server, per navigation | latest reading, `limit=1` | navigation |
| `/station/[id]` | `fetchStationPageData` (server) | server, per navigation | latest + 1 month history | navigation |
| Weather map markers | `StationsProvider` → `ClusterStationsLayer` | browser, on mount | **none** — AccuWeather condition from `weather_stations` | mount only |

## 4. Observed inefficiencies (the "bloat")

Addressed 2026-07-20 by the cached-getter layer (`getLatestReadings`, `getForecastByStation`,
`getEnvironmentalData`):

- ~~Homepage fan-out~~ — steady-state, most homepage renders now hit Directus **zero** times for
  these sections: one shared 60s snapshot feeds both the stations grid and major cities, and
  forecast/environmental come from cadence-matched cached getters shared with the station page
  and live-conditions loaders.
- Behavioral note: major-city cards now inherit the snapshot's last-1h window — a stalled station
  drops its card instead of showing stale data (previously the per-station query had no window).

Still open — these are the pressure points the Directus WebSocket design addresses, see
[`weather-data-websocket.md`](./weather-data-websocket.md):

1. **`/stations` still fetches the last-1h scan client-side** on every mount, uncached — the
   browser cannot read the server Data Cache; the shared client store arrives with the realtime
   work.
2. **`StationsProvider` is mounted per layout** (home and weather-map), so navigating between them
   re-fetches stations metadata and warnings.
3. **Staleness:** a user sitting on the map or stations list sees data frozen at mount time, while
   crawlers write new readings continuously.
4. **`DataService` instantiated per component** — harmless but signals no shared data layer on the
   client.
