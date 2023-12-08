import { WeatherStation } from "./weatherStation";

export type ExportedWeatherData = {
    date_created: Date;
    temperature: number;
    humidity: number;
    barometer: number;
    percipitation: number;
    rainrate: number;
    windspd: number;
    winddir: number;
    station: WeatherStation;
};

export type WeatherData = {
    id: number;
    sort: number | null;
    date_created: Date;
    temperature: number;
    humidity: number;
    barometer: number;
    percipitation: number;
    rainrate: number;
    windspd: number;
    winddir: number;
    weather_condition_id: object;
    weather_station_id: WeatherStation;
};
