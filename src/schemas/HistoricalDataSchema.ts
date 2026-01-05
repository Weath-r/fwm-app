import { z } from "zod";

export const HistoricalDataSchema = z.object({
    weather_station_id: z.number().gt(0),
    year: z.number(),
    month: z.number(),
    avg_temperature: z.number(),
    avg_humidity: z.number(),
    avg_barometer: z.number(),
    total_percipitation: z.number(),
    avg_windspd: z.number(),
    avg_winddir: z.number(),
});

export const HistoricalDataResponse = z.array(HistoricalDataSchema);