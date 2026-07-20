import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { WeatherDataResponse } from "@/types";

export const LATEST_READINGS_CACHE_TAG = CACHE_TAGS.latestReadings;

const LATEST_READINGS_REVALIDATE_SECONDS = 60;

export const getLatestReadings = cache(
    async (): Promise<WeatherDataResponse[]> =>
        new DataService().fetchWeatherStationsWithData({
            revalidate: LATEST_READINGS_REVALIDATE_SECONDS,
            tags: [LATEST_READINGS_CACHE_TAG],
        })
);
