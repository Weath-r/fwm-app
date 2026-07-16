const mockFetchWeatherStations = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchWeatherStations: mockFetchWeatherStations,
    })),
}));

describe("getWeatherStations", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated stations from DataService", async () => {
        const stations = [{ id: 1, name: "Station A" }];
        mockFetchWeatherStations.mockResolvedValue(stations);

        const { getWeatherStations } = await import("../getWeatherStations");

        await expect(getWeatherStations()).resolves.toEqual(stations);
    });

    it("requests them with a 24h revalidate window and the stations cache tag", async () => {
        mockFetchWeatherStations.mockResolvedValue([]);

        const { getWeatherStations, STATIONS_CACHE_TAG } = await import("../getWeatherStations");
        await getWeatherStations();

        expect(mockFetchWeatherStations).toHaveBeenCalledWith({
            revalidate: 86_400,
            tags: [STATIONS_CACHE_TAG],
        });
    });
});
