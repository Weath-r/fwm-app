import dayjs from "@/utils/dateTimeUtils";
import { ForecastStructure } from "@/types";

// The BE always returns forecast timestamps as the station's local time
// (currently always Europe/Athens, since all stations are Greek), regardless
// of the offset/"Z" suffix on the wire.

const FORECAST_TIMEZONE = "Europe/Athens";

export type NormalizedHourlyForecast = {
    time: number;
    temperature: number;
    dewpoint: number;
    windspd: number;
    winddir: number;
    windgust: number;
    percipitation: number;
    snow: number;
    cloudcover: number;
    forecastIcon: string;
};

export type DailyForecastExtremes = {
    maxT: number;
    minT: number;
};

export const greekDayKey = (input: string | number): string =>
    dayjs.tz(input, FORECAST_TIMEZONE).format("DD/MM/YYYY");

export const normalizeForecastHourly = (
    forecast: ForecastStructure | null | undefined
): NormalizedHourlyForecast[] => {
    if (!forecast?.hourly.time.length) return [];

    const { hourly } = forecast;
    return hourly.time.map((time, index) => ({
        time: dayjs.tz(time, FORECAST_TIMEZONE).valueOf(),
        temperature: hourly.temperature_2m[index],
        dewpoint: hourly.dew_point_2m[index],
        windspd: hourly.wind_speed_10m[index],
        winddir: hourly.wind_direction_10m[index],
        windgust: hourly.wind_gusts_10m[index],
        percipitation: hourly.rain[index] + hourly.showers[index],
        snow: hourly.snowfall[index],
        cloudcover: hourly.cloud_cover[index],
        forecastIcon: hourly.forecastIcon[index],
    }));
};

export const getDailyForecastExtremes = (
    forecast: ForecastStructure | null | undefined,
    dayKey: string
): DailyForecastExtremes | null => {
    if (!forecast?.daily.time.length) return null;

    const index = forecast.daily.time.findIndex((date) => greekDayKey(date) === dayKey);
    if (index === -1) return null;

    return {
        maxT: forecast.daily.temperature_2m_max[index],
        minT: forecast.daily.temperature_2m_min[index],
    };
};
