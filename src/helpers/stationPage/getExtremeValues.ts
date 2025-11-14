import { WeatherDataResponse } from "@/types";
import { isWithinPastNDays, dateValueOf } from "@/utils/dateManipulation";
import dayjs from "@/utils/dateTimeUtils";

type filterWeatherDataLastNDaysParams = {
    weatherData: WeatherDataResponse[];
    numberOfDays: number;
    variable?: Exclude<keyof WeatherDataResponse, "weather_condition" | "date_created" | "weather_station_id" | "weather_condition_icon">;
};

export const filterWeatherDataLastNDays = ({
    weatherData,
    numberOfDays = 2,
}: filterWeatherDataLastNDaysParams) => {
    const result = weatherData
        .filter(data => isWithinPastNDays({ inputDate: data.date_created, numberOfDays }));
    return result;
};

export const extremeValuesLastNDaysPerVariable = ({
    weatherData,
    numberOfDays = 2,
    variable = "temperature",
}: filterWeatherDataLastNDaysParams) => {
    const filteredData = filterWeatherDataLastNDays({ weatherData, numberOfDays });
    const values = filteredData.map(data => Number((data as any)[variable]));
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const meanValue = Math.floor((values.reduce((a, b) => a + b, 0) / values.length)*10)/10;
    return {
        maxValue,
        minValue,
        meanValue,
    };
};

export const calculateRainyDays = ({
    weatherData,
    numberOfDays = 2,
}: filterWeatherDataLastNDaysParams) => {
    const filteredData = filterWeatherDataLastNDays({ weatherData, numberOfDays });
    const rainyDays = new Set<string>();
    const values = filteredData.map(data => {
        return {
            date: data.date_created,
            precipitation: data.percipitation,
        };
    }).filter(value => value.precipitation > 0);
    
    values.forEach(value => {
        const date = dayjs.utc(value.date);
        rainyDays.add(date.format("YYYY-MM-DD"));
    });
    
    return {
        rainyDays: rainyDays.size,
    };
};

export const manipulateGraphDataLastNDays = ({
    weatherData,
    numberOfDays = 2,
    variable,
}: filterWeatherDataLastNDaysParams) => {
    const filteredData = filterWeatherDataLastNDays({ weatherData, numberOfDays });
    const graphData = filteredData
        .map(data => {
            if (variable) {
                return [dateValueOf(data.date_created), data[variable] as number];
            }
        })
        .reverse();
    return graphData;
};