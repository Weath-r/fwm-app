type CommonWeatherData = {
    temperature: number;
    humidity: number;
    barometer: number;
    percipitation: number;
    rainrate: number;
    windspd: number;
    winddir: number;
    temp_difference?: number;
};

type WeatherStation = {
    id: number;
    name: string;
    prefecture_id: StationPerfecture;
    website_url: string;
};

export type WeatherData = CommonWeatherData & {
    dateCreated: Date;
    station: WeatherStation;
    assetId: string;
    weatherDescription: string;
};

type StationPerfecture = {
    id: number;
    label: string;
};

export type WeatherDataResponse = CommonWeatherData & {
    date_created: Date;
    weather_station_id: WeatherStation;
    weather_condition: string;
    weather_condition_icon: string;
};
