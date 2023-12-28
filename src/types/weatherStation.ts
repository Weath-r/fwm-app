import { StationPerfecture } from "./stationPerfecture";
import { StationAccuweatherLocation } from "./stationAccuweatherLocation";

export type WeatherStation = {
    date_created: Date;
    date_updated: Date;
    foreign_id: string;
    id: number;
    location: object;
    name: string;
    prefecture_id: StationPerfecture;
    sort: number | null;
    station_type: number;
    status: string;
    user_updated: string;
    website_url: string;
    accuweather_location: StationAccuweatherLocation;
};
