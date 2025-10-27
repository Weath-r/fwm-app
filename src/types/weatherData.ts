import { ForecastData } from "./weatherForecast";

type CommonWeatherData = {
    temperature: number;
    humidity: number;
    barometer: number;
    percipitation: number;
    rainrate: number;
    windspd: number;
    winddir: number;
    temp_difference?: number;
};

export type WeatherStation = {
    id: number;
    name: string;
    prefecture_id: StationPerfecture;
    station_type: StationType;
    website_url: string;
    elevation: number;
    climatology_location_id: number;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

export type WeatherData = CommonWeatherData & {
    dateCreated: string;
    station: WeatherStation;
    assetId: string;
    weatherDescription: string;
    full_forecast: ForecastData[];
};

type StationPerfecture = {
    id?: number;
    label: string;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

type StationType = {
    label: string;
    value: string;
};

export type WeatherDataResponse = CommonWeatherData & {
    date_created: string;
    weather_station_id: WeatherStation;
    weather_condition: string;
    weather_condition_icon: string;
};
