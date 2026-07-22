import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import type { WeatherDataResponse } from "@/types";

export const getLatestReadings = cache(
    (): Promise<WeatherDataResponse[]> => new DataService().fetchWeatherStationsWithData()
);
