import { cache } from "react";
import { getLatestReadings } from "@/services/getLatestReadings";
import type { StationSearchItem, WeatherDataResponse } from "@/types";

export const fetchSearchStationsData = async (): Promise<StationSearchItem[]> => {
    const latestReadings = await getLatestReadings().catch(() => [] as WeatherDataResponse[]);

    return latestReadings.map((reading) => {
        const translations = reading.weather_station_id.translations;
        const prefectureTranslations = reading.weather_station_id.prefecture_id.translations;

        return {
            id: reading.weather_station_id.id,
            temperature: reading.temperature,
            windSpeed: reading.windspd,
            windDirection: reading.winddir,
            weatherConditionIcon: reading.weather_condition_icon,
            name_el:
                translations.find((translation) => translation.languages_code === "el")?.name ?? "",
            name_en:
                translations.find((translation) => translation.languages_code === "en")?.name ?? "",
            prefecture_el:
                prefectureTranslations.find((translation) => translation.languages_code === "el")
                    ?.name ?? "",
            prefecture_en:
                prefectureTranslations.find((translation) => translation.languages_code === "en")
                    ?.name ?? "",
        };
    });
};

export const getCachedSearchStationsData = cache(fetchSearchStationsData);
