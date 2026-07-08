import { z } from "zod";

export const EnvironmentalDataSchema = z.array(
    z.object({
        cluster: z.number().min(1),
        current: z.object({
            time: z.string(),
            interval: z.number(),
            uv_index: z.number(),
            pm10: z.number(),
            pm2_5: z.number(),
        }),
        hourly: z.object({
            time: z.array(z.string()),
            uv_index: z.array(z.number()),
            pm10: z.array(z.number()),
            pm2_5: z.array(z.number()),
        }),
        units: z.object({
            time: z.string(),
            uv_index: z.string(),
            pm10: z.string(),
            pm2_5: z.string(),
        }),
    })
);
