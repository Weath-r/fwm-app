import { DataService, DataServiceError } from "../DataService";
import { createAxiosInstance } from "@/utils/httpClientUtils";
import { AxiosError } from "axios";

// Mock the httpClientUtils
jest.mock("@/utils/httpClientUtils");

// Mock schemas
jest.mock("@/schemas", () => ({
    StationResponsesSchema: {
        parse: jest.fn((data) => data),
    },
    WarningsResponsesSchema: {
        parse: jest.fn((data) => data),
    },
    HazardLevelsResponsesSchema: {
        parse: jest.fn((data) => data),
    },
    WarningLevelsResponsesSchema: {
        parse: jest.fn((data) => data),
    },
    ConfigurationSchema: {
        parse: jest.fn((data) => data),
    },
    WeatherForecastDataResponsesSchema: {
        parse: jest.fn((data) => data),
    },
    AssetsSchema: {
        parse: jest.fn((data) => data),
    },
    HistoricalClimaDataResponse: {
        parse: jest.fn((data) => data),
    },
    FrostinDataResponsesSchema: {
        parse: jest.fn((data) => data),
    },
    HistoricalDataResponse: {
        parse: jest.fn((data) => data),
    },
}));

describe("DataService", () => {
    let dataService: DataService;
    let mockAxiosInstance: any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockAxiosInstance = {
            get: jest.fn(),
        };

        (createAxiosInstance as jest.Mock).mockReturnValue(mockAxiosInstance);

        dataService = new DataService();
    });
    describe("Weather Stations", () => {
        describe("fetchWeatherStations", () => {
            it("should fetch weather stations successfully", async () => {
                const mockStations = [
                    {
                        id: 1,
                        name: "Station 1",
                        location: { type: "Point", coordinates: [0, 0] },
                    },
                    {
                        id: 2,
                        name: "Station 2",
                        location: { type: "Point", coordinates: [1, 1] },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockStations },
                });

                const result = await dataService.fetchWeatherStations();

                expect(result).toEqual(mockStations);
                expect(mockAxiosInstance.get).toHaveBeenCalled();
            });

            it("should throw DataServiceError on network failure", async () => {
                const error = new AxiosError("Network Error");
                mockAxiosInstance.get.mockRejectedValue(error);

                try {
                    await dataService.fetchWeatherStations();
                    fail("Should have thrown an error");
                } catch (err) {
                    expect(err).toEqual(expect.any(Error));
                    expect((err as Error).message).toContain("Network Error");
                }
            });

            it("should include correct fields in filter", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                await dataService.fetchWeatherStations();

                const callArg = mockAxiosInstance.get.mock.calls[0][0];
                expect(callArg).toContain("items/weather_stations");
                expect(callArg).toContain("fields=");
            });
        });

        describe("fetchWeatherStationsWithData", () => {
            it("should fetch weather stations with current data", async () => {
                const mockData = [
                    {
                        date_created: new Date().toISOString(),
                        temperature: 20,
                        weather_station_id: { id: 1, name: "Station A" },
                    },
                    {
                        date_created: new Date().toISOString(),
                        temperature: 18,
                        weather_station_id: { id: 2, name: "Station B" },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchWeatherStationsWithData();

                expect(Array.isArray(result)).toBe(true);
                expect(mockAxiosInstance.get).toHaveBeenCalled();
            });

            it("should calculate temperature difference for same station", async () => {
                const mockData = [
                    {
                        date_created: "2024-01-01T10:00:00Z",
                        temperature: 20,
                        weather_station_id: { id: 1, name: "Station A" },
                    },
                    {
                        date_created: "2024-01-01T11:00:00Z",
                        temperature: 22,
                        weather_station_id: { id: 1, name: "Station A" },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchWeatherStationsWithData();

                expect(result[0].temp_difference).toBe(2);
                expect(result[0].date_created).toBe("2024-01-01T11:00:00Z");
            });

            it("should sort results by station name", async () => {
                const mockData = [
                    {
                        date_created: new Date().toISOString(),
                        temperature: 20,
                        weather_station_id: { id: 2, name: "Station A" },
                    },
                    {
                        date_created: new Date().toISOString(),
                        temperature: 18,
                        weather_station_id: { id: 1, name: "Station B" },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchWeatherStationsWithData();

                expect(result[0].weather_station_id.name).toBe("Station A");
                expect(result[1].weather_station_id.name).toBe("Station B");
            });
        });
    });

    describe("Weather Data", () => {
        describe("fetchWeatherDataByStation", () => {
            it("should fetch weather data for a specific station", async () => {
                const stationId = 123;
                const mockData = [
                    {
                        date_created: new Date().toISOString(),
                        temperature: 20,
                        humidity: 65,
                        weather_station_id: { id: stationId },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchWeatherDataByStation(stationId);

                expect(result).toEqual(mockData);
                expect(mockAxiosInstance.get).toHaveBeenCalledWith(
                    expect.stringContaining(String(stationId))
                );
            });

            it("should handle empty response", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                const result = await dataService.fetchWeatherDataByStation(123);

                expect(result).toEqual([]);
            });

            it("should throw error on API failure", async () => {
                const error = new AxiosError("API Error");
                mockAxiosInstance.get.mockRejectedValue(error);

                try {
                    await dataService.fetchWeatherDataByStation(123);
                    fail("Should have thrown an error");
                } catch (err) {
                    expect(err).toEqual(expect.any(Error));
                    expect((err as Error).message).toContain("API Error");
                }
            });
        });

        describe("fetchWeatherDataByStationPaginated", () => {
            it("should fetch paginated weather data", async () => {
                const mockData = [{ date_created: "2024-01-01T10:00Z", temperature: 20 }];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchWeatherDataByStationPaginated({
                    station_id: 123,
                    start_date: "2024-01-01",
                    end_date: "2024-01-31",
                    page: 1,
                    limit: 64,
                });

                expect(result).toEqual(mockData);
                expect(mockAxiosInstance.get).toHaveBeenCalled();
            });

            it("should use default pagination values", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                await dataService.fetchWeatherDataByStationPaginated({
                    station_id: 123,
                    start_date: "2024-01-01",
                    end_date: "2024-01-31",
                });

                const callArg = mockAxiosInstance.get.mock.calls[0][0];
                expect(callArg).toContain("page=1");
                expect(callArg).toContain("limit=64");
            });
        });
    });

    describe("Historical Data", () => {
        describe("fetchStationHistoricalData", () => {
            it("should fetch historical weather data", async () => {
                const mockData = [
                    {
                        weather_station_id: 123,
                        year: 2023,
                        month: 1,
                        avg_temperature: 15.5,
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchStationHistoricalData(123);

                expect(result).toEqual(mockData);
            });

            it("should include station ID in filter", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                await dataService.fetchStationHistoricalData(456);

                const callArg = mockAxiosInstance.get.mock.calls[0][0];
                expect(callArg).toContain("456");
                expect(callArg).toContain("weather_data_aggregated_monthly");
            });
        });

        describe("fetchStationHistoricalClimateData", () => {
            it("should fetch historical climate data", async () => {
                const mockData = [
                    {
                        month_id: "01",
                        max_temperature: 25,
                        min_temperature: 10,
                        precipitation: 50,
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchStationHistoricalClimateData(789);

                expect(result).toEqual(mockData);
            });
        });

        describe("fetchFrostDataByMunicipality", () => {
            it("should fetch frost data for municipality", async () => {
                const mockData = [
                    {
                        frost_level: 2,
                        frost_date: "2024-01-15",
                        frost_location_id: 1,
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockData },
                });

                const result = await dataService.fetchFrostDataByMunicipality(100);

                expect(result).toEqual(mockData);
            });
        });
    });

    describe("Weather Warnings", () => {
        describe("fetchWeatherWarningsByCreatedDate", () => {
            it("should fetch active weather warnings", async () => {
                const mockWarnings = [
                    {
                        id: 1,
                        start_date: new Date().toISOString(),
                        end_date: new Date(Date.now() + 86400000).toISOString(),
                        hazard_id: { label: "Wind" },
                        level_id: { label: "Orange" },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockWarnings },
                });

                const result = await dataService.fetchWeatherWarningsByCreatedDate(
                    new Date().toISOString()
                );

                expect(result).toEqual(mockWarnings);
            });

            it("should handle empty warnings list", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                const result = await dataService.fetchWeatherWarningsByCreatedDate(
                    new Date().toISOString()
                );

                expect(result).toEqual([]);
            });
        });

        describe("fetchAllWeatherWarnings", () => {
            it("should fetch paginated warnings with total pages", async () => {
                const mockWarnings = [
                    {
                        id: 1,
                        start_date: new Date().toISOString(),
                        end_date: new Date(Date.now() + 86400000).toISOString(),
                    },
                ];

                mockAxiosInstance.get
                    .mockResolvedValueOnce({
                        data: { data: mockWarnings },
                    })
                    .mockResolvedValueOnce({
                        data: { data: [{ countDistinct: { id: 150 } }] },
                    });

                const result = await dataService.fetchAllWeatherWarnings(1);

                expect(result.warnings).toEqual(mockWarnings);
                expect(result.totalPages).toBe(3); // 150 items / 50 per page = 3 pages
            });

            it("should handle pagination correctly", async () => {
                mockAxiosInstance.get
                    .mockResolvedValueOnce({
                        data: { data: [] },
                    })
                    .mockResolvedValueOnce({
                        data: { data: [{ countDistinct: { id: 200 } }] },
                    });

                const result = await dataService.fetchAllWeatherWarnings(2);

                expect(result.totalPages).toBe(4);
            });

            it("should reject on error in either request", async () => {
                mockAxiosInstance.get.mockRejectedValue(new AxiosError("API Error"));

                try {
                    await dataService.fetchAllWeatherWarnings(1);
                    fail("Should have thrown an error");
                } catch (err) {
                    expect(err).toEqual(expect.any(Error));
                    expect((err as Error).message).toContain("API Error");
                }
            });
        });

        describe("fetchWeatherHazards", () => {
            it("should fetch all hazard types", async () => {
                const mockHazards = [
                    { id: 1, label: "Wind", asset: "wind.png" },
                    { id: 2, label: "Rain", asset: "rain.png" },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockHazards },
                });

                const result = await dataService.fetchWeatherHazards();

                expect(result).toEqual(mockHazards);
            });
        });

        describe("fetchWarningLevels", () => {
            it("should fetch all warning levels", async () => {
                const mockLevels = [
                    { id: 1, label: "Green", color: "#00ff00" },
                    { id: 2, label: "Yellow", color: "#ffff00" },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockLevels },
                });

                const result = await dataService.fetchWarningLevels();

                expect(result).toEqual(mockLevels);
            });
        });
    });

    describe("Forecasts", () => {
        describe("fetchForecastByStation", () => {
            it("should fetch forecast for station", async () => {
                const mockForecast = [
                    {
                        id: 1,
                        station_id: 123,
                        date_created: new Date().toISOString(),
                        forecast_data: [],
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockForecast },
                });

                const result = await dataService.fetchForecastByStation(123);

                expect(result).toEqual(mockForecast);
            });

            it("should handle empty forecast", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                const result = await dataService.fetchForecastByStation(123);

                expect(result).toEqual([]);
            });
        });

        describe("fetchFthiotidaForecasts", () => {
            it("should fetch Fthiotida forecasts", async () => {
                const mockForecasts = [{ id: 1, forecast: "Forecast data 1" }];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockForecasts },
                });

                const result = await dataService.fetchFthiotidaForecasts();

                expect(result).toEqual(mockForecasts);
            });
        });
    });

    describe("Configuration", () => {
        describe("fetchConfiguration", () => {
            it("should fetch frontend configurations", async () => {
                const mockConfig = [
                    {
                        id: 1,
                        value: "some_value",
                        config: { key: "setting" },
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockConfig },
                });

                const result = await dataService.fetchConfiguration();

                expect(result).toEqual(mockConfig);
            });

            it("should filter for frontend configurations only", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                await dataService.fetchConfiguration();

                const callArg = mockAxiosInstance.get.mock.calls[0][0];
                expect(callArg).toContain("frontend");
                expect(callArg).toContain("_eq");
                expect(callArg).toContain("true");
            });
        });
    });

    describe("Assets", () => {
        describe("fetchAssetsFromFolder", () => {
            it("should fetch assets from folder", async () => {
                const mockAssets = [
                    {
                        id: "asset1",
                        title: "Asset 1",
                        filename_download: "file1.png",
                    },
                ];

                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: mockAssets },
                });

                const result = await dataService.fetchAssetsFromFolder("folder123");

                expect(result).toEqual(mockAssets);
            });

            it("should include folder ID in filter", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { data: [] },
                });

                await dataService.fetchAssetsFromFolder("folder456");

                const callArg = mockAxiosInstance.get.mock.calls[0][0];
                expect(callArg).toContain("folder456");
            });
        });

        describe("fetchAsset", () => {
            it("should fetch single asset by ID", async () => {
                const mockResponse = {
                    data: { id: "asset1", title: "Asset 1" },
                };

                mockAxiosInstance.get.mockResolvedValue(mockResponse);

                const result = await dataService.fetchAsset("asset1");

                expect(result).toEqual(mockResponse);
            });

            it("should format asset endpoint correctly", async () => {
                mockAxiosInstance.get.mockResolvedValue({
                    data: { id: "asset1" },
                });

                await dataService.fetchAsset("asset123");

                const callArg = mockAxiosInstance.get.mock.calls[0][0];
                expect(callArg).toContain("assets");
                expect(callArg).toContain("asset123");
            });
        });
    });

    describe("Error Handling", () => {
        describe("DataServiceError", () => {
            it("should create error with message only", () => {
                const error = new DataServiceError("Test error");

                expect(error.message).toBe("Test error");
                expect(error.status).toBeUndefined();
            });

            it("should create error with message and status", () => {
                const error = new DataServiceError("Not found", 404);

                expect(error.message).toBe("Not found");
                expect(error.status).toBe(404);
            });

            it("should be an instance of Error", () => {
                const error = new DataServiceError("Test");

                expect(error instanceof Error).toBe(true);
            });
        });

        describe("Error scenarios", () => {
            it("should handle 404 responses", async () => {
                const error: any = new AxiosError("Not Found");
                error.response = { status: 404 };

                mockAxiosInstance.get.mockRejectedValue(error);

                try {
                    await dataService.fetchWeatherStations();
                    fail("Should have thrown an error");
                } catch (err) {
                    expect(err).toEqual(expect.any(Error));
                    expect((err as any).status).toBe(404);
                }
            });

            it("should handle 500 responses", async () => {
                const error: any = new AxiosError("Server Error");
                error.response = { status: 500 };

                mockAxiosInstance.get.mockRejectedValue(error);

                try {
                    await dataService.fetchWeatherStations();
                    fail("Should have thrown an error");
                } catch (err) {
                    expect(err).toEqual(expect.any(Error));
                    expect((err as any).status).toBe(500);
                }
            });

            it("should handle network errors without response", async () => {
                const error = new AxiosError("Network Error");

                mockAxiosInstance.get.mockRejectedValue(error);

                try {
                    await dataService.fetchWeatherStations();
                    fail("Should have thrown an error");
                } catch (err) {
                    expect(err).toEqual(expect.any(Error));
                    expect((err as Error).message).toContain("Network Error");
                }
            });
        });
    });

    describe("Integration Tests", () => {
        it("should initialize axios instance on construction", () => {
            expect(createAxiosInstance).toHaveBeenCalled();
        });

        it("should use same axios instance for all requests", () => {
            mockAxiosInstance.get.mockResolvedValue({
                data: { data: [] },
            });

            dataService.fetchWeatherStations();
            dataService.fetchConfiguration();

            expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2);
        });
    });
});
