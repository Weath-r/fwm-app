import { cache } from "react";
import { DataService } from "@/services/DataService";
import { getClimatologyData } from "@/services/getClimatologyData";
import { applyStationTranslations } from "@/utils/weatherDataFormatUtils";
import { resolveEnvironmentalConditions } from "@/helpers/weatherCalculations";

type FetchStationPageDataParameters = {
    lng: string;
    stationId: number;
};

export const fetchStationPageData = async ({ lng, stationId }: FetchStationPageDataParameters) => {
    const dataService = new DataService();
    const startDate = "$NOW(-1 month)";
    const endDate = "$NOW";

    const [monthlyWeatherDataRaw, currentWeatherRaw, stationForecast, stationHistoricalData] =
        await Promise.all([
            dataService.fetchWeatherDataByStationPaginated({
                station_id: stationId,
                start_date: startDate,
                end_date: endDate,
                page: 1,
                limit: -1,
            }),
            dataService.fetchWeatherDataByStation(stationId),
            dataService.fetchForecastByStation(stationId),
            dataService.fetchStationHistoricalData(stationId),
        ]);

    const currentWeather = currentWeatherRaw.map((elem) => applyStationTranslations(elem, lng));
    const monthlyWeatherData = monthlyWeatherDataRaw.map((elem) =>
        applyStationTranslations(elem, lng)
    );

    if (currentWeather.length === 0) {
        return {
            weatherData: [],
            currentWeather: null,
            climateData: [],
            forecast: null,
            historicalData: [],
            frostData: null,
            environmentalConditions: resolveEnvironmentalConditions(null),
        };
    }

    const station = currentWeather[0].weather_station_id;

    const [historicalClimateData, frostData, environmentalData] = await Promise.all([
        getClimatologyData(station.climatology_location_id),
        dataService.fetchFrostDataByMunicipality(station.municipality_id),
        dataService.fetchEnvironmentalDataByStation(station.cluster).catch((error) => {
            console.error(
                `Environmental data unavailable for station ${stationId} (cluster ${station.cluster}):`,
                error
            );
            return null;
        }),
    ]);

    return {
        weatherData: monthlyWeatherData,
        currentWeather: currentWeather[0],
        climateData: historicalClimateData,
        forecast: stationForecast[0],
        historicalData: stationHistoricalData,
        frostData: frostData.length > 0 ? frostData[0] : null,
        environmentalConditions: resolveEnvironmentalConditions(environmentalData),
    };
};

export const getCachedStationPageData = cache((lng: string, stationId: number) =>
    fetchStationPageData({ lng, stationId })
);
