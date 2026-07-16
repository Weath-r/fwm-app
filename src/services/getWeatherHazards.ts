import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { WarningHazard } from "@/types";

export const HAZARDS_CACHE_TAG = CACHE_TAGS.weatherHazards;

const HAZARDS_REVALIDATE_SECONDS = 604_800;

export const getWeatherHazards = cache(
    async (): Promise<WarningHazard[]> =>
        new DataService().fetchWeatherHazards({
            revalidate: HAZARDS_REVALIDATE_SECONDS,
            tags: [HAZARDS_CACHE_TAG],
        })
);
