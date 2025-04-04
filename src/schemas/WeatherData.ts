import { z } from "zod";

export const WeatherData = z.object({
    date_created: z.string().datetime(),
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
});

export const WeatherForecastData = z.object({
    id: z.number().min(1),
    date_created: z.string().datetime(),
    station_id: z.number().positive(),
    full_forecast: z.array(z.object({
        time: z.number(),
        temperature: z.optional(z.number()),
        accumulated_rain: z.optional(z.number()),
        windspd: z.optional(z.number()),
        winddir: z.optional(z.number()),
        snow: z.optional(z.number()),
        cloudcover: z.optional(z.number()),
        percipitation: z.optional(z.number()),
        forecastIcon: z.string().min(1),
    })),
});

export const WeatherDataResponsesSchema = z.array(WeatherData);
export const WeatherForecastDataResponsesSchema = z.array(WeatherForecastData);