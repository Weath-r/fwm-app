import { z } from "zod";

export const EnvironmentalDataSchema = z.array(
    z.object({
        cluster: z.number().min(1),
        current: z.object({
            time: z.string(),
            interval: z.number(),
            uv_index: z.number(),
            european_aqi: z.number(),
        }),
        hourly: z.object({
            time: z.array(z.string()),
            uv_index: z.array(z.number()),
            european_aqi: z.array(z.number()),
        }),
        units: z.object({
            time: z.string(),
            uv_index: z.string(),
            european_aqi: z.string(),
        }),
    })
);
