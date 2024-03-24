import { WeatherData } from "@/types";

export const formatDate = (inputDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };
    const date: Date = new Date(inputDate);
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate;
};

export const buildExportedWeatherDataObject = (elem: WeatherData) => {
    return {
        date_created: elem.date_created,
        temperature: elem.temperature,
        humidity: elem.humidity,
        barometer: elem.barometer,
        percipitation: elem.percipitation,
        rainrate: elem.rainrate,
        windspd: elem.windspd,
        winddir: elem.winddir,
        station: elem.weather_station_id,
        weatherDescription: elem.weather_condition,
        assetId: elem.weather_condition_icon,
    };
};
