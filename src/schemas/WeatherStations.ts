import { z } from "zod";

export const WeatherLocationSchema = z.object({
    type: z.string().min(1),
    coordinates: z.tuple([z.number(), z.number()]),
});

export const AccuweatherLocation = z.object({
    current_weather_description	: z.string().min(1),
    weather_condition_icon: z.object({
        asset: z.string().min(1),
    }),
});

export const WeatherStationSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    website_url: z.string().min(1),
    location: WeatherLocationSchema,
    accuweather_location: AccuweatherLocation,
});

export const StationResponsesSchema = z.array(WeatherStationSchema);