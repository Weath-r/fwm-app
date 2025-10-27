import { z } from "zod";

const ClimaMonthSchema = z.object({
    value: z.string().min(1),
    translations: z.object({
        name: z.string().min(1),
        languages_code: z.string().min(1),
    }).array(),
});

export const HistoricalClimaDataSchema = z.object({
    month_id: ClimaMonthSchema,
    max_temperature: z.number(),
    min_temperature: z.number(),
    mean_temperature: z.number(),
    precipitation: z.number().gt(0),
});

export const HistoricalClimaDataResponse = z.array(HistoricalClimaDataSchema);