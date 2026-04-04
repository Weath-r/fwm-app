import { FetchLiveWeatherStationData } from "../fetchWeatherData";
import { DataService } from "@/services/DataService";
import * as weatherDataFormatUtils from "@/utils/weatherDataFormatUtils";
import { WeatherData, ForecastData, FrostData } from "@/types";

// Mock DataService
jest.mock("@/services/DataService");

// Mock buildWeatherData
jest.mock("@/utils/weatherDataFormatUtils", () => ({
    buildWeatherData: jest.fn(),
}));

// Test data
const mockWeatherResponse = [
    {
        weather_station_id: {
            id: 1,
            name: "Test Station",
            prefecture_id: {
                id: 1,
                label: "Test Prefecture",
                translations: [
                    {
                        languages_code: "en",
                        name: "Test Prefecture EN",
                    },
                    {
                        languages_code: "el",
                        name: "Test Prefecture GR",
                    },
                ],
            },
            translations: [
                {
                    languages_code: "en",
                    name: "Test Station EN",
                },
                {
                    languages_code: "el",
                    name: "Test Station GR",
                },
            ],
            station_type: "weather",
            website_url: "http://example.com",
            elevation: 100,
            climatology_location_id: 1,
            municipality_id: 1,
        },
        temperature: 20,
        humidity: 65,
        barometer: 1013,
        percipitation: 0,
        rainrate: 0,
        windspd: 5,
        winddir: 180,
        weather_condition: "Clear",
        weather_condition_icon: "sun",
        date_created: "2024-01-01T12:00:00Z",
    },
];

const mockForecastData = [
    {
        full_forecast: [
            {
                time: 100,
                cloudcover: 50,
                temperature: 22,
                precipitation: 0,
                forecastIcon: "sun",
                snow: 0,
                accumulated_rain: 0,
                accumulated_snow: 0,
            },
        ],
    },
];

const mockFrostData = [
    {
        frost_location_id: 1,
        frost_level: 2,
        frost_date: "2024-01-01",
    } as FrostData,
];

const mockBuiltWeatherData = {
    temperature: 20,
    humidity: 65,
    barometer: 1013,
    percipitation: 0,
    rainrate: 0,
    windspd: 5,
    winddir: 180,
    dateCreated: "2024-01-01T12:00:00Z",
    station: {
        id: 1,
        name: "Test Station",
        prefecture_id: { id: 1, label: "Test Prefecture" },
        translations: [],
        station_type: "weather",
        website_url: "http://example.com",
        elevation: 100,
        climatology_location_id: 1,
        municipality_id: 1,
        header_bg: "#ffffff",
    },
    assetId: "test",
    weatherDescription: "Clear",
    full_forecast: [] as ForecastData[],
    frost_data: null as FrostData | null,
} as unknown as WeatherData;

describe("FetchLiveWeatherStationData", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch and return weather data", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData).toBeDefined();
        expect(Array.isArray(result.weatherData)).toBe(true);
        expect(result.weatherData.length).toBeGreaterThan(0);
    });

    it("should translate station name when language is provided", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockImplementation((elem) => ({
            ...mockBuiltWeatherData,
            station: { ...mockBuiltWeatherData.station, name: elem.weather_station_id.name },
        }));

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData[0].station.name).toBe("Test Station EN");
    });

    it("should translate prefecture name when language is provided", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockImplementation((elem) => ({
            ...mockBuiltWeatherData,
            station: {
                ...mockBuiltWeatherData.station,
                prefecture_id: {
                    ...mockBuiltWeatherData.station.prefecture_id,
                    label: elem.weather_station_id.prefecture_id.label,
                },
            },
        }));

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData[0].station.prefecture_id.label).toBe("Test Prefecture EN");
    });

    it("should handle different language codes", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockImplementation((elem) => ({
            ...mockBuiltWeatherData,
            station: {
                ...mockBuiltWeatherData.station,
                name: elem.weather_station_id.name,
                prefecture_id: {
                    ...mockBuiltWeatherData.station.prefecture_id,
                    label: elem.weather_station_id.prefecture_id.label,
                },
            },
        }));

        const result = await FetchLiveWeatherStationData({
            lng: "el",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData[0].station.name).toBe("Test Station GR");
        expect(result.weatherData[0].station.prefecture_id.label).toBe("Test Prefecture GR");
    });

    it("should keep original name when translation not found", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "fr",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData[0].station.name).toBe("Test Station");
    });

    it("should handle empty language parameter", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData).toBeDefined();
        expect(result.weatherData.length).toBeGreaterThan(0);
    });

    it("should fetch forecast data when isForecastEnabled is true", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: true,
        });

        expect(mockDataService.fetchForecastByStation).toHaveBeenCalledWith(1);
        expect(result.weatherData[0].full_forecast).toBeDefined();
    });

    it("should not fetch forecast data when isForecastEnabled is false", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(mockDataService.fetchForecastByStation).not.toHaveBeenCalled();
    });

    it("should set empty forecast array when forecast fetch returns empty", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue([]),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: true,
        });

        expect(result.weatherData[0].full_forecast).toEqual([]);
    });

    it("should fetch frost data by municipality", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(mockDataService.fetchFrostDataByMunicipality).toHaveBeenCalledWith(1);
        expect(result.weatherData[0].frost_data).toBeDefined();
    });

    it("should set frost_data to null when no frost data is available", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue([]),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData[0].frost_data).toBeNull();
    });

    it("should use buildWeatherData utility function", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(weatherDataFormatUtils.buildWeatherData).toHaveBeenCalledWith(
            mockWeatherResponse[0]
        );
    });

    it("should handle multiple weather stations", async () => {
        const multipleStations = [
            mockWeatherResponse[0],
            {
                ...mockWeatherResponse[0],
                weather_station_id: {
                    ...mockWeatherResponse[0].weather_station_id,
                    id: 2,
                    name: "Station 2",
                },
            },
        ];

        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(multipleStations),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData.length).toBe(2);
    });

    it("should handle weather data without translations", async () => {
        const noTranslations = [
            {
                ...mockWeatherResponse[0],
                weather_station_id: {
                    ...mockWeatherResponse[0].weather_station_id,
                    translations: undefined,
                    prefecture_id: {
                        ...mockWeatherResponse[0].weather_station_id.prefecture_id,
                        translations: undefined,
                    },
                },
            },
        ];

        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(noTranslations),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData).toBeDefined();
        expect(result.weatherData.length).toBeGreaterThan(0);
    });

    it("should preserve full_forecast and frost_data initialization", async () => {
        const mockDataService = {
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
        };

        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        (weatherDataFormatUtils.buildWeatherData as jest.Mock).mockReturnValue(
            mockBuiltWeatherData
        );

        const result = await FetchLiveWeatherStationData({
            lng: "en",
            stationId: 1,
            isForecastEnabled: false,
        });

        expect(result.weatherData[0].full_forecast).toBeDefined();
        expect(Array.isArray(result.weatherData[0].full_forecast)).toBe(true);
        expect(result.weatherData[0].frost_data).toBeDefined();
    });
});
