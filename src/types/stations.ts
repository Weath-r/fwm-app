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
    elevation: number;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

export type Station = {
    id: number;
    name: string;
    location: Location;
    currentWeatherDescription: string;
    currentWeatherConditionIcon: string;
    elevation: number;
};
