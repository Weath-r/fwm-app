import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { WeatherForecastResponse } from "@/types";

export const FORECASTS_CACHE_TAG = CACHE_TAGS.forecasts;

const FORECASTS_REVALIDATE_SECONDS = 21_600;

export const getForecastByStation = cache(
    async (stationId: number): Promise<WeatherForecastResponse[]> =>
        new DataService().fetchForecastByStation(stationId, {
            revalidate: FORECASTS_REVALIDATE_SECONDS,
            tags: [FORECASTS_CACHE_TAG],
        })
);
