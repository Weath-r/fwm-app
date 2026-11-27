import dayjs from "@/utils/dateTimeUtils";
import {
    FthiotidaForecastEntrySchema,
    FthiotidaForecastRecordSchema,
    type FthiotidaForecastEntry,
} from "@/schemas/FthiotidaForecasts";

export const ATHENS_TIMEZONE = "Europe/Athens";

export type FthiotidaForecastDay = {
    id: number;
    forecastDate: string;
    entries: Record<string, FthiotidaForecastEntry>;
};

export type FthiotidaForecastSelection = {
    today: FthiotidaForecastDay | null;
    tomorrow: FthiotidaForecastDay | null;
};

const toIsoDate = (date: string): string | null => {
    const parsed = dayjs(date, "DD/MM/YYYY", true);
    return parsed.isValid() ? parsed.format("YYYY-MM-DD") : null;
};

const parseEntries = (data: Record<string, unknown>): Record<string, FthiotidaForecastEntry> =>
    Object.fromEntries(
        Object.entries(data).flatMap(([key, value]) => {
            const result = FthiotidaForecastEntrySchema.safeParse(value);
            return result.success ? [[key, result.data]] : [];
        })
    );

export const parseForecastRecords = (records: unknown[]): FthiotidaForecastDay[] => {
    const newestByDate = new Map<string, FthiotidaForecastDay>();
    records.forEach((record) => {
        const result = FthiotidaForecastRecordSchema.safeParse(record);
        if (!result.success) {
            console.warn("Skipping invalid Fthiotida forecast record", result.error.issues);
            return;
        }
        const forecastDate = toIsoDate(result.data.forecast.dates.forecast_date);
        if (!forecastDate) {
            return;
        }
        const existing = newestByDate.get(forecastDate);
        if (!existing || existing.id < result.data.id) {
            newestByDate.set(forecastDate, {
                id: result.data.id,
                forecastDate,
                entries: parseEntries(result.data.forecast.data),
            });
        }
    });
    return Array.from(newestByDate.values()).sort((first, second) =>
        second.forecastDate.localeCompare(first.forecastDate)
    );
};

export const selectForecastDays = (
    days: FthiotidaForecastDay[],
    now: Date = new Date()
): FthiotidaForecastSelection => {
    const today = dayjs(now).tz(ATHENS_TIMEZONE);
    const findDay = (date: string) => days.find((day) => day.forecastDate === date) ?? null;
    return {
        today: findDay(today.format("YYYY-MM-DD")),
        tomorrow: findDay(today.add(1, "day").format("YYYY-MM-DD")),
    };
};
