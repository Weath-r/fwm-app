import { StationResponse, WeatherDataResponse } from "@/types";

const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
};

export const formatDateToUSLocale = (inputDate: Date): string => {
    const date: Date = new Date(inputDate);
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate;
};

export const buildWeatherData = (elem: WeatherDataResponse) => {
    return {
        dateCreated: elem.date_created,
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

export const getReversedCoordinates = (coordinates: [number, number]): [number, number] => {
    return [coordinates[1], coordinates[0]];
};

export const buildStation = (elem: StationResponse) => {
    return {
        id: elem.id,
        name: elem.name,
        location: elem.location,
        currentWeatherDescription: elem.accuweather_location.current_weather_description,
        currentWeatherConditionIcon: elem.accuweather_location.weather_condition_icon.asset,
    };
};
