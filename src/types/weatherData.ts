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

type WeatherStation = {
    id: number;
    name: string;
    prefecture_id: StationPerfecture;
    website_url: string;
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
};

export type WeatherDataResponse = CommonWeatherData & {
    date_created: string;
    weather_station_id: WeatherStation;
    weather_condition: string;
    weather_condition_icon: string;
};
