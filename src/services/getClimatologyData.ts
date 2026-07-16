import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { ClimateWeatherData } from "@/types";

export const CLIMATOLOGY_CACHE_TAG = CACHE_TAGS.climatologyData;

const CLIMATOLOGY_REVALIDATE_SECONDS = 604_800;

export const getClimatologyData = cache(
    async (climatologyLocationId: number): Promise<ClimateWeatherData[]> =>
        new DataService().fetchStationHistoricalClimateData(climatologyLocationId, {
            revalidate: CLIMATOLOGY_REVALIDATE_SECONDS,
            tags: [CLIMATOLOGY_CACHE_TAG, `${CLIMATOLOGY_CACHE_TAG}-${climatologyLocationId}`],
        })
);
