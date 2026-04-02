import { buildWeatherData, getReversedCoordinates, buildStation } from "../weatherDataFormatUtils";
import { StationResponse, WeatherDataResponse } from "@/types";

describe("weatherDataFormatUtils", () => {
    describe("buildWeatherData", () => {
        it("should transform WeatherDataResponse to expected format", () => {
            const input: WeatherDataResponse = {
                date_created: "2024-03-29T12:00:00Z",
                temperature: 22.5,
                humidity: 65,
                barometer: 1013.25,
                percipitation: 0,
                rainrate: 0,
                windspd: 10,
                winddir: 180,
                weather_station_id: 1,
                weather_condition: "Sunny",
                weather_condition_icon: "sunny.png",
            } as unknown as WeatherDataResponse;

            const result = buildWeatherData(input);

            expect(result).toEqual({
                dateCreated: "2024-03-29T12:00:00Z",
                temperature: 22.5,
                humidity: 65,
                barometer: 1013.25,
                percipitation: 0,
                rainrate: 0,
                windspd: 10,
                winddir: 180,
                station: 1,
                weatherDescription: "Sunny",
                assetId: "sunny.png",
                full_forecast: [],
            });
        });

        it("should handle all numeric values correctly", () => {
            const input: WeatherDataResponse = {
                date_created: "2024-01-01T00:00:00Z",
                temperature: -5,
                humidity: 0,
                barometer: 1000,
                percipitation: 2.5,
                rainrate: 5,
                windspd: 25,
                winddir: 0,
                weather_station_id: 42,
                weather_condition: "Rainy",
                weather_condition_icon: "rainy.png",
            } as unknown as WeatherDataResponse;

            const result = buildWeatherData(input);

            expect(result.temperature).toBe(-5);
            expect(result.humidity).toBe(0);
            expect(result.windspd).toBe(25);
            expect(result.station).toBe(42);
        });

        it("should initialize full_forecast as empty array", () => {
            const input: WeatherDataResponse = {
                date_created: "2024-01-01T00:00:00Z",
                temperature: 20,
                humidity: 50,
                barometer: 1010,
                percipitation: 0,
                rainrate: 0,
                windspd: 5,
                winddir: 90,
                weather_station_id: 1,
                weather_condition: "Cloudy",
                weather_condition_icon: "cloudy.png",
            } as unknown as WeatherDataResponse;

            const result = buildWeatherData(input);

            expect(result.full_forecast).toEqual([]);
            expect(Array.isArray(result.full_forecast)).toBe(true);
        });
    });

    describe("getReversedCoordinates", () => {
        it("should reverse latitude and longitude", () => {
            const coordinates: [number, number] = [39.0, 21.0]; // [lat, lon]
            const result = getReversedCoordinates(coordinates);

            expect(result).toEqual([21.0, 39.0]); // [lon, lat]
        });

        it("should handle negative coordinates", () => {
            const coordinates: [number, number] = [-33.5, 151.2]; // Sydney-like coords
            const result = getReversedCoordinates(coordinates);

            expect(result).toEqual([151.2, -33.5]);
        });

        it("should handle zero coordinates", () => {
            const coordinates: [number, number] = [0, 0]; // Null Island
            const result = getReversedCoordinates(coordinates);

            expect(result).toEqual([0, 0]);
        });

        it("should handle decimal coordinates", () => {
            const coordinates: [number, number] = [40.7128, -74.006]; // NYC
            const result = getReversedCoordinates(coordinates);

            expect(result).toEqual([-74.006, 40.7128]);
        });
    });

    describe("buildStation", () => {
        it("should transform StationResponse to expected format", () => {
            const input: StationResponse = {
                id: 1,
                name: "Test Station",
                location: "Test Location",
                elevation: 100,
                accuweather_location: {
                    current_weather_description: "Sunny",
                    weather_condition_icon: {
                        asset: "sunny.png",
                    },
                },
                translations: [
                    {
                        languages_code: "en",
                        name: "Test Station",
                    },
                    {
                        languages_code: "el",
                        name: "Σταθμός Δοκιμής",
                    },
                ],
            } as unknown as StationResponse;

            const result = buildStation(input);

            expect(result).toEqual({
                id: 1,
                name: "Test Station",
                location: "Test Location",
                currentWeatherDescription: "Sunny",
                currentWeatherConditionIcon: "sunny.png",
                elevation: 100,
                translations: expect.arrayContaining([
                    {
                        languages_code: "en",
                        name: "Test Station",
                    },
                    {
                        languages_code: "el",
                        name: "Σταθμός Δοκιμής",
                    },
                ]),
            });
        });

        it("should handle station with no elevation", () => {
            const input: StationResponse = {
                id: 2,
                name: "Sea Level Station",
                location: "Beach",
                elevation: 0,
                accuweather_location: {
                    current_weather_description: "Cloudy",
                    weather_condition_icon: {
                        asset: "cloudy.png",
                    },
                },
                translations: [],
            } as unknown as StationResponse;

            const result = buildStation(input);

            expect(result.elevation).toBe(0);
            expect(result.id).toBe(2);
        });

        it("should preserve translations array", () => {
            const translations = [
                { languages_code: "en", name: "English Name" },
                { languages_code: "fr", name: "French Name" },
                { languages_code: "de", name: "German Name" },
            ];

            const input: StationResponse = {
                id: 3,
                name: "Multi-lang Station",
                location: "Multi Location",
                elevation: 500,
                accuweather_location: {
                    current_weather_description: "Rainy",
                    weather_condition_icon: {
                        asset: "rainy.png",
                    },
                },
                translations,
            } as unknown as StationResponse;

            const result = buildStation(input);

            expect(result.translations).toEqual(translations);
            expect(result.translations.length).toBe(3);
        });
    });
});
