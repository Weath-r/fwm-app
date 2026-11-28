import { z } from "zod";

const optionalNumber = z.preprocess((value) => {
    if (value === null || value === undefined || value === "") {
        return undefined;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
}, z.number().optional());

const WeatherConditionSchema = z.looseObject({
    icon: z.string().optional(),
    label: z.string().optional(),
    value: z.string(),
});

export const FthiotidaForecastEntrySchema = z.looseObject({
    location: z.tuple([z.number(), z.number()]).optional().catch(undefined),
    tmax: optionalNumber,
    tmin: optionalNumber,
    weatherConditions: WeatherConditionSchema.optional().catch(undefined),
    precipProbability: optionalNumber,
    snow: optionalNumber,
    wmin: optionalNumber,
    wmax: optionalNumber,
    windDirection: optionalNumber,
});

export const FthiotidaForecastRecordSchema = z.object({
    id: z.number(),
    forecast: z.object({
        dates: z.looseObject({
            forecast_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
        }),
        data: z.record(z.string(), z.unknown()),
    }),
});

export type FthiotidaForecastEntry = z.infer<typeof FthiotidaForecastEntrySchema>;
