import { api } from "./api";

const URLS = {
    stations: "items/weather_stations",
};

export const fetchWeatherStations = () => {
    return api.get(`${URLS.stations}?fields=id,name,location,website_url&fields=accuweather_location.current_weather_description,accuweather_location.isDayTime`);
};