import { fetchStationPageData } from "../fetchStationPageData";
import { DataService } from "@/services/DataService";
import { getClimatologyData } from "@/services/getClimatologyData";

jest.mock("@/services/DataService");
jest.mock("@/services/getClimatologyData");

const mockWeatherResponse = [
    {
        weather_station_id: {
            id: 1,
            name: "Test Station",
            prefecture_id: {
                id: 1,
                label: "Test Prefecture",
                translations: [],
            },
            translations: [],
            station_type: "weather",
            website_url: "http://example.com",
            elevation: 100,
            climatology_location_id: 1,
            municipality_id: 1,
            cluster: 1,
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

const mockClimateData = [{ month: 1 }];
const mockForecastData = [{ full_forecast: [] }];
const mockHistoricalData = [{ weather_station_id: 1, year: 2024, month: 1 }];
const mockFrostData = [{ frost_location_id: 1, frost_level: 2, frost_date: "2024-01-01" }];
const mockEnvironmentalData = [
    {
        cluster: 1,
        date_updated: "2024-01-01T12:00:00Z",
        current: {},
        hourly: { time: ["2024-01-01T12:00:00Z"], uv_index: [3], european_aqi: [25] },
        units: {},
    },
];

describe("fetchStationPageData", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch and return all station page data when the station has readings", async () => {
        const mockDataService = {
            fetchWeatherDataByStationPaginated: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchWeatherDataByStation: jest.fn().mockResolvedValue(mockWeatherResponse),
            fetchForecastByStation: jest.fn().mockResolvedValue(mockForecastData),
            fetchStationHistoricalData: jest.fn().mockResolvedValue(mockHistoricalData),
            fetchFrostDataByMunicipality: jest.fn().mockResolvedValue(mockFrostData),
            fetchEnvironmentalDataByStation: jest.fn().mockResolvedValue(mockEnvironmentalData),
        };
        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );
        (getClimatologyData as jest.Mock).mockResolvedValue(mockClimateData);

        const result = await fetchStationPageData({ lng: "en", stationId: 1 });

        expect(result.currentWeather).toEqual(mockWeatherResponse[0]);
        expect(result.weatherData).toEqual(mockWeatherResponse);
        expect(result.climateData).toEqual(mockClimateData);
        expect(result.forecast).toEqual(mockForecastData[0]);
        expect(result.historicalData).toEqual(mockHistoricalData);
        expect(result.frostData).toEqual(mockFrostData[0]);
        expect(result.environmentalConditions).toEqual({ uvIndex: 3, airQualityIndex: 25 });
    });

    it("should return a null currentWeather and empty fallbacks when the station has no readings", async () => {
        const mockDataService = {
            fetchWeatherDataByStationPaginated: jest.fn().mockResolvedValue([]),
            fetchWeatherDataByStation: jest.fn().mockResolvedValue([]),
            fetchForecastByStation: jest.fn().mockResolvedValue([]),
            fetchStationHistoricalData: jest.fn().mockResolvedValue([]),
            fetchFrostDataByMunicipality: jest.fn(),
            fetchEnvironmentalDataByStation: jest.fn(),
        };
        (DataService as jest.MockedClass<typeof DataService>).mockImplementation(
            () => mockDataService as any
        );

        const result = await fetchStationPageData({ lng: "en", stationId: 1 });

        expect(result).toEqual({
            weatherData: [],
            currentWeather: null,
            climateData: [],
            forecast: null,
            historicalData: [],
            frostData: null,
            environmentalConditions: { uvIndex: null, airQualityIndex: null },
        });
        expect(getClimatologyData).not.toHaveBeenCalled();
        expect(mockDataService.fetchFrostDataByMunicipality).not.toHaveBeenCalled();
        expect(mockDataService.fetchEnvironmentalDataByStation).not.toHaveBeenCalled();
    });
});
