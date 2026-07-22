import { cache } from "react";
import { DataService } from "@/services/DataService";
import { applyStationTranslations, buildWeatherData } from "@/utils/weatherDataFormatUtils";
import { resolveEnvironmentalConditions } from "@/helpers/weatherCalculations";
import { ForecastData, FrostData } from "@/types";

type FetchDataParameters = {
    lng: string;
    stationId: number;
    isForecastEnabled: boolean;
};
export const FetchLiveWeatherStationData = async ({
    lng,
    stationId,
    isForecastEnabled,
}: FetchDataParameters) => {
    const dataService = new DataService();

    const [currentWeatherRaw, stationForecast] = await Promise.all([
        dataService.fetchWeatherDataByStation(stationId),
        isForecastEnabled ? dataService.fetchForecastByStation(stationId) : Promise.resolve([]),
    ]);

    if (currentWeatherRaw.length === 0) {
        return {
            weatherData: null,
            environmentalConditions: null,
        };
    }

    const currentWeather = currentWeatherRaw.map((elem) => {
        applyStationTranslations(elem, lng);
        return {
            ...buildWeatherData(elem),
            full_forecast: [] as ForecastData[],
            frost_data: null as FrostData | null,
        };
    });

    if (isForecastEnabled && currentWeather.length > 0) {
        currentWeather[0].full_forecast = stationForecast[0]?.full_forecast || [];
    }
    const station = currentWeather[0].station;

    const [frostData, environmentalData] = await Promise.all([
        dataService.fetchFrostDataByMunicipality(station.municipality_id),
        dataService.fetchEnvironmentalDataByStation(station.cluster).catch((error) => {
            console.error(
                `Environmental data unavailable for station ${station.id} (cluster ${station.cluster}):`,
                error
            );
            return null;
        }),
    ]);
    currentWeather[0].frost_data = frostData.length > 0 ? frostData[0] : null;

    return {
        weatherData: currentWeather,
        environmentalConditions: resolveEnvironmentalConditions(environmentalData),
    };
};

export const getCachedLiveWeatherStationData = cache(
    (lng: string, stationId: number, isForecastEnabled: boolean) =>
        FetchLiveWeatherStationData({ lng, stationId, isForecastEnabled })
);
