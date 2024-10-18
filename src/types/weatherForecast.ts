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

type GfsForecastObject = {
    data: number[],
    header: {
        category: string;
    }
};

export type ForecastGFSData = {
    [k:string]: GfsForecastObject[]
};

export type ForecastLayerData = {
    lat: number;
    lng: number;
    temp: number;
    elevation: number;
};

export type WeatherForecastResponse = {
    station_id: number;
    full_forecast: ForecastData[];
};