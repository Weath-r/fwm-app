export type StationAccuweatherLocation = {
    id: number;
    city_name: string;
    location_key?: string;
    current_icon?: string;
    current_weather_description: string;
    isDayTime: boolean;
};