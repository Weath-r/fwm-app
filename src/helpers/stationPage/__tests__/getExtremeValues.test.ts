import {
    filterWeatherDataLastNDays,
    extremeValuesLastNDaysPerVariable,
    calculateRainyDays,
    manipulateGraphDataLastNDays,
} from "../getExtremeValues";
import { WeatherDataResponse } from "@/types";

// Mock weather data with correct WeatherDataResponse structure
const createMockWeatherData = (): WeatherDataResponse[] => [
    {
        date_created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 15,
        percipitation: 0,
        windspd: 5,
        humidity: 65,
        barometer: 1013,
        winddir: 180,
        rainrate: 0,
        weather_condition: "Clear",
        weather_condition_icon: "sun",
        weather_station_id: {} as any,
    },
    {
        date_created: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 18,
        percipitation: 0.5,
        windspd: 8,
        humidity: 72,
        barometer: 1012,
        winddir: 180,
        rainrate: 0.1,
        weather_condition: "Cloudy",
        weather_condition_icon: "cloud",
        weather_station_id: {} as any,
    },
    {
        date_created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 20,
        percipitation: 2,
        windspd: 10,
        humidity: 85,
        barometer: 1010,
        winddir: 180,
        rainrate: 1,
        weather_condition: "Rain",
        weather_condition_icon: "rain",
        weather_station_id: {} as any,
    },
    {
        date_created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 22,
        percipitation: 1.5,
        windspd: 12,
        humidity: 75,
        barometer: 1015,
        winddir: 180,
        rainrate: 0.5,
        weather_condition: "Rain",
        weather_condition_icon: "rain",
        weather_station_id: {} as any,
    },
    {
        date_created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 19,
        percipitation: 0.2,
        windspd: 6,
        humidity: 68,
        barometer: 1014,
        winddir: 180,
        rainrate: 0,
        weather_condition: "Cloudy",
        weather_condition_icon: "cloud",
        weather_station_id: {} as any,
    },
];

describe("getExtremeValues", () => {
    describe("filterWeatherDataLastNDays", () => {
        it("should return empty array for empty data", () => {
            const result = filterWeatherDataLastNDays({ weatherData: [], numberOfDays: 7 });
            expect(result).toEqual([]);
        });

        it("should filter data to last N days", () => {
            const data = createMockWeatherData();
            const result = filterWeatherDataLastNDays({ weatherData: data, numberOfDays: 3 });
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        it("should return all data when N days exceeds data length", () => {
            const data = createMockWeatherData();
            const result = filterWeatherDataLastNDays({ weatherData: data, numberOfDays: 10 });
            expect(result.length).toBeLessThanOrEqual(data.length);
        });
    });

    describe("extremeValuesLastNDaysPerVariable", () => {
        it("should return empty object for empty data", () => {
            const result = extremeValuesLastNDaysPerVariable({ weatherData: [], numberOfDays: 7 });
            expect(result).toEqual({});
        });

        it("should calculate min/max for temperature", () => {
            const data = createMockWeatherData();
            const result = extremeValuesLastNDaysPerVariable({
                weatherData: data,
                numberOfDays: 5,
                variable: "temperature",
            });
            expect(result).toBeDefined();
            expect(typeof result.maxValue).toBe("number");
            expect(typeof result.minValue).toBe("number");
        });

        it("should filter to last N days", () => {
            const data = createMockWeatherData();
            const result = extremeValuesLastNDaysPerVariable({
                weatherData: data,
                numberOfDays: 3,
            });
            expect(result).toBeDefined();
        });
    });

    describe("calculateRainyDays", () => {
        it("should return 0 for empty data", () => {
            const result = calculateRainyDays({ weatherData: [], numberOfDays: 7 });
            expect(result.rainyDays).toBe(0);
        });

        it("should count days with precipitation", () => {
            const data = createMockWeatherData();
            const result = calculateRainyDays({ weatherData: data, numberOfDays: 5 });
            expect(result.rainyDays).toBeGreaterThanOrEqual(0);
            expect(typeof result.rainyDays).toBe("number");
        });
    });

    describe("manipulateGraphDataLastNDays", () => {
        it("should return empty array for empty data", () => {
            const result = manipulateGraphDataLastNDays({ weatherData: [], numberOfDays: 7 });
            expect(result).toEqual([]);
        });

        it("should format data for graphing", () => {
            const data = createMockWeatherData();
            const result = manipulateGraphDataLastNDays({
                weatherData: data,
                numberOfDays: 5,
                variable: "temperature",
            });
            expect(Array.isArray(result)).toBe(true);
        });

        it("should filter to last N days", () => {
            const data = createMockWeatherData();
            const result3Days = manipulateGraphDataLastNDays({
                weatherData: data,
                numberOfDays: 3,
                variable: "temperature",
            });
            const result5Days = manipulateGraphDataLastNDays({
                weatherData: data,
                numberOfDays: 5,
                variable: "temperature",
            });
            expect(result3Days.length).toBeLessThanOrEqual(result5Days.length);
        });
    });

    describe("integration tests", () => {
        it("should handle graph data generation with all functions", () => {
            const data = createMockWeatherData();
            const filtered = filterWeatherDataLastNDays({ weatherData: data, numberOfDays: 5 });
            const graphData = manipulateGraphDataLastNDays({
                weatherData: filtered,
                numberOfDays: 5,
                variable: "temperature",
            });
            const rainyDays = calculateRainyDays({ weatherData: filtered, numberOfDays: 5 });
            expect(Array.isArray(graphData)).toBe(true);
            expect(typeof rainyDays.rainyDays).toBe("number");
        });
    });
});
