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
    municipality_id: number;
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
    header_bg: string;
};

export type WeatherData = CommonWeatherData & {
    dateCreated: string;
    station: WeatherStation;
    assetId: string;
    weatherDescription: string;
    full_forecast: ForecastData[];
    frost_data?: FrostData | null;
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

export type FrostData = {
    frost_location_id: number;
    frost_level: number;
    frost_date: string;
};

export type WeatherHistoricalData = {
    weather_station_id: number;
    year: number;
    month: number;
    avg_temperature: number;
    avg_humidity: number;
    avg_barometer: number;
    total_percipitation: number;
    avg_windspd: number;
    avg_winddir: number;
};
