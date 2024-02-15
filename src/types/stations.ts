type Location = {
    type: string;
    coordinates: [number, number];
};
type WeatherConditionIcon = {
    asset: string;
};

type AccuWeatherLocation = {
    current_weather_description: string;
    weather_condition_icon: WeatherConditionIcon;
};

export type StationResponse = {
    id: number;
    name: string;
    location: Location;
    website_url: string;
    accuweather_location: AccuWeatherLocation;
};

export type Station = {
    id: number;
    name: string;
    location: Location;
    currentWeatherDescription: string;
    currentWeatherConditionIcon: string;
};
