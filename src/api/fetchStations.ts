import { api } from "./api";

const URLS = {
    stations: "items/weather_stations",
};

export const fetchWeatherStations = () => {
    return api.get(`${URLS.stations}`);
};