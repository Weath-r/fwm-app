const mockFetchWeatherStationsWithData = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchWeatherStationsWithData: mockFetchWeatherStationsWithData,
    })),
}));

describe("getLatestReadings", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the latest readings from DataService", async () => {
        const readings = [{ temperature: 21, weather_station_id: { id: 1, name: "Station A" } }];
        mockFetchWeatherStationsWithData.mockResolvedValue(readings);

        const { getLatestReadings } = await import("../getLatestReadings");

        await expect(getLatestReadings()).resolves.toEqual(readings);
    });

    it("requests them with a 60s revalidate window and the latest-readings cache tag", async () => {
        mockFetchWeatherStationsWithData.mockResolvedValue([]);

        const { getLatestReadings, LATEST_READINGS_CACHE_TAG } = await import(
            "../getLatestReadings"
        );
        await getLatestReadings();

        expect(mockFetchWeatherStationsWithData).toHaveBeenCalledWith({
            revalidate: 60,
            tags: [LATEST_READINGS_CACHE_TAG],
        });
    });
});
