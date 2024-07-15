export type ForecastData = {
    temperature: number;
    dewpoint: number;
    windspd: number;
    winddir: number;
    windgust: number;
    barometer: number;
    percipitation: number;
    accumulated_rain: number;
    snow: number;
    cloudcover: number;
    time: number;
    forecastIcon: string;
};

export type WeatherForecastResponse = {
    station_id: number;
    full_forecast: ForecastData[];
};
