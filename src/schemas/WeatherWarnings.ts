import { z } from "zod";

const warningsLevels = z.object({
    id: z.number().min(1),
    label: z.string().min(1),
    color: z.string().min(1).startsWith("#"),
});
const hazardLevels = z.object({
    id: z.number().optional(),
    label: z.string().min(1),
    asset: z.string().min(1),
});

export const WeatherWarnings = z.object({
    id: z.number().min(1),
    date_created: z.string().datetime(),
    meteoalarm_warning_id: z.string().min(1),
    start_date: z.string(),
    end_date: z.string(),
    description_en: z.string(),
    description_el: z.string(),
    instruction_en: z.string(),
    instruction_el: z.string(),
    warning_location_id: z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        geojson: z.string().optional(),
        order: z.number().optional(),
    }),
    level_id: warningsLevels,
    hazard_id: hazardLevels,
});

export const WeatherWarningsCounter = z.object({
    countDistinct: z.object({
        id: z.string().min(1),
    }),
});

export const WarningsResponsesSchema = z.array(WeatherWarnings);
export const HazardLevelsResponsesSchema = z.array(hazardLevels);
export const WarningLevelsResponsesSchema = z.array(warningsLevels);
export const WeatherWarningsCounterSchema = z.array(WeatherWarningsCounter);