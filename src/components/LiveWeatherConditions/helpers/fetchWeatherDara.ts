import { DataService } from "@/services/DataService";
import { buildWeatherData } from "@/utils/weatherDataFormatUtils";
import { ForecastData } from "@/types";

type FetchDataParameters = {
    lng: string;
    stationId: number;
    isForecastEnabled: boolean;
};
export const FetchLiveWeatherStationData = async ({ lng, stationId, isForecastEnabled }: FetchDataParameters) => {
    const dataService = new DataService();

    const currentWeather = (await dataService.fetchWeatherDataByStation(stationId)).map(elem => {
        if (lng && elem.weather_station_id.translations) {
            const translationStationName = elem.weather_station_id.translations.find(t => t.languages_code === lng);
            if (translationStationName) {
                elem.weather_station_id.name = translationStationName.name;
            }
        }

        if (lng && elem.weather_station_id.prefecture_id.translations) {
            const translationPrefectureName = elem.weather_station_id.prefecture_id.translations.find(t => t.languages_code === lng);
            if (translationPrefectureName) {
                elem.weather_station_id.prefecture_id.label = translationPrefectureName.name;
            }
        }
        return {
            ...buildWeatherData(elem),
            full_forecast: [] as ForecastData[],
        };
    });

    if (isForecastEnabled) {
        const stationForecast = await dataService.fetchForecastByStation(stationId);
        if (currentWeather.length > 0) {
            currentWeather[0].full_forecast = stationForecast[0]?.full_forecast || [];
        }
    }

    return {
        weatherData: currentWeather,
    };
};