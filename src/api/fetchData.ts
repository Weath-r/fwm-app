import { api } from "./api";

const URLS = {
    weatherData: "items/weather_data",
};

export const fetchWeatherData = (station_id: number) => {
    return api.get(`${URLS.weatherData}?filter[_and][0][weather_station_id][id][_eq]=${station_id}&sort=-date_created&limit=1&fields=*.*`);
};