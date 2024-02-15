type WeatherConditionIcon = {
    asset: string;
};

type StationPerfecture = {
    id: number;
    label: string;
};

type StationAccuweatherLocation = {
    id: number;
    city_name: string;
    location_key?: string;
    current_icon?: string;
    current_weather_description: string;
    weather_condition_icon: WeatherConditionIcon;
};

export type WeatherStation = {
    date_created: Date;
    date_updated: Date;
    foreign_id: string;
    id: number;
    name: string;
    prefecture_id: StationPerfecture;
    sort?: number;
    station_type: number;
    status: string;
    user_updated: string;
    website_url: string;
    accuweather_location: StationAccuweatherLocation;
};
