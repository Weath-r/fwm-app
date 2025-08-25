type WeatherConditionObject = {
    icon: string;
    label: string;
    value: string;
};

export type FthiotidaForecastObject = {
    weatherConditions?: WeatherConditionObject;
    tmax?: number;
    tmin?: number;
    wmax?: number;
    wmin?: number;
    windDirection?: number;
    snow?: number | null;
    location: [number, number];
};

export type FthiotidaForecast = {
    forecast: {
        data: {
            [key: string]: FthiotidaForecastObject;
        };
        dates: FthiotidaForecastDates
    }
};

export type FthiotidaForecastDates = {
    created: number;
    forecast_date: number;
    forecast_end_hour: number;
    forecast_start_hour: number;
};