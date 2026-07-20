/**
 * Central registry of Next.js Data Cache tags.
 *
 * Each cached server getter tags its `fetch` with one of these values; the
 * `/api/revalidate` route validates incoming tags against this set so an
 * unknown tag is rejected rather than silently doing nothing.
 */
export const CACHE_TAGS = {
    configurations: "configurations",
    weatherStations: "weather-stations",
    latestReadings: "latest-readings",
    forecasts: "forecasts",
    climatologyData: "climatology-data",
    weatherHazards: "weather-hazards",
    warningLevels: "warning-levels",
};

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

const CACHE_TAG_VALUES = new Set<string>(Object.values(CACHE_TAGS));

export const isValidCacheTag = (tag: string): tag is CacheTag => CACHE_TAG_VALUES.has(tag);
