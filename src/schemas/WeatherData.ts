import { z } from "zod";

export const WeatherData = z.object({
    date_created: z.string(),
    temperature: z.number(),
    barometer: z.number().min(1),
    humidity: z.number().min(1),
    percipitation: z.number().gte(0, { message: "Number is not positive" }),
    rainrate: z.number().gte(0, { message: "Number is not positive" }),
    windspd: z.number().gte(0, { message: "Number is not positive" }),
    winddir: z.number().gte(0, { message: "Number is not positive" }),
    weather_condition: z.string().min(1),
    weather_condition_icon: z.string().min(1),
    weather_station_id: z.object({
        name: z.string().min(1),
        id: z.number().min(1),
        website_url: z.string().min(1),
        prefecture_id: z.object({
            label: z.string().min(1),
        }),
    }),
    assetId: z.string(),
});

const ForecastHourlyUnits = z.object({
    time: z.string(),
    temperature_2m: z.string(),
    pressure_msl: z.string(),
    relative_humidity_2m: z.string(),
    wind_speed_10m: z.string(),
    wind_direction_10m: z.string(),
    wind_gusts_10m: z.string(),
    rain: z.string(),
    showers: z.string(),
    snowfall: z.string(),
    dew_point_2m: z.string(),
    cloud_cover: z.string(),
});

const ForecastHourly = z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    forecastIcon: z.array(z.string()),
    pressure_msl: z.array(z.number()),
    relative_humidity_2m: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
    wind_direction_10m: z.array(z.number()),
    wind_gusts_10m: z.array(z.number()),
    rain: z.array(z.number()),
    showers: z.array(z.number()),
    snowfall: z.array(z.number()),
    dew_point_2m: z.array(z.number()),
    cloud_cover: z.array(z.number()),
});

const ForecastDailyUnits = z.object({
    time: z.string(),
    temperature_2m_max: z.string(),
    temperature_2m_min: z.string(),
    rain_sum: z.string(),
    snowfall_sum: z.string(),
    wind_speed_10m_max: z.string(),
    wind_gusts_10m_max: z.string(),
    wind_direction_10m_dominant: z.string(),
    showers_sum: z.string(),
    precipitation_probability_max: z.string(),
});

const ForecastDaily = z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    forecastIcon: z.array(z.string()),
    rain_sum: z.array(z.number()),
    snowfall_sum: z.array(z.number()),
    wind_speed_10m_max: z.array(z.number()),
    wind_gusts_10m_max: z.array(z.number()),
    wind_direction_10m_dominant: z.array(z.number()),
    showers_sum: z.array(z.number()),
    precipitation_probability_max: z.array(z.number()),
});

const ForecastStructure = z.object({
    hourly_units: ForecastHourlyUnits,
    hourly: ForecastHourly,
    daily_units: ForecastDailyUnits,
    daily: ForecastDaily,
});

export const WeatherForecastData = z.object({
    station_id: z.number().positive(),
    full_forecast: ForecastStructure,
});

const FrostData = z.object({
    frost_location_id: z.number().min(1),
    frost_level: z.number().gte(0),
    frost_date: z.string(),
});

export const WeatherDataResponsesSchema = z.array(WeatherData);
export const WeatherForecastDataResponsesSchema = z.array(WeatherForecastData);
export const FrostinDataResponsesSchema = z.array(FrostData);
