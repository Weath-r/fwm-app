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
    assetId: string;
    weatherDescription: string;
};

export type WeatherData = {
    date_created: Date;
    temperature: number;
    humidity: number;
    barometer: number;
    percipitation: number;
    rainrate: number;
    windspd: number;
    winddir: number;
    weather_station_id: WeatherStation;
    weather_condition: string;
    weather_condition_icon: string;
};
