import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import { parseForecastRecords, type FthiotidaForecastDay } from "@/helpers/fthiotida/forecastDays";

export const FTHIOTIDA_FORECASTS_CACHE_TAG = CACHE_TAGS.fthiotidaForecasts;

const FTHIOTIDA_FORECASTS_REVALIDATE_SECONDS = 600;

export const getFthiotidaForecasts = cache(
    async (): Promise<FthiotidaForecastDay[]> =>
        parseForecastRecords(
            await new DataService().fetchFthiotidaForecasts({
                revalidate: FTHIOTIDA_FORECASTS_REVALIDATE_SECONDS,
                tags: [FTHIOTIDA_FORECASTS_CACHE_TAG],
            })
        )
);
