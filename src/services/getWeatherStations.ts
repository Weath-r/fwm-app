import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { StationResponse } from "@/types";

export const STATIONS_CACHE_TAG = CACHE_TAGS.weatherStations;

const STATIONS_REVALIDATE_SECONDS = 86_400;

export const getWeatherStations = cache(
    async (): Promise<StationResponse[]> =>
        new DataService().fetchWeatherStations({
            revalidate: STATIONS_REVALIDATE_SECONDS,
            tags: [STATIONS_CACHE_TAG],
        })
);
