const mockFetchForecastByStation = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchForecastByStation: mockFetchForecastByStation,
    })),
}));

describe("getForecastByStation", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the station forecast from DataService", async () => {
        const forecast = [{ station_id: 7, full_forecast: [] }];
        mockFetchForecastByStation.mockResolvedValue(forecast);

        const { getForecastByStation } = await import("../getForecastByStation");

        await expect(getForecastByStation(7)).resolves.toEqual(forecast);
    });

    it("requests it with a 6h revalidate window and the forecasts cache tag", async () => {
        mockFetchForecastByStation.mockResolvedValue([]);

        const { getForecastByStation, FORECASTS_CACHE_TAG } = await import(
            "../getForecastByStation"
        );
        await getForecastByStation(7);

        expect(mockFetchForecastByStation).toHaveBeenCalledWith(7, {
            revalidate: 21_600,
            tags: [FORECASTS_CACHE_TAG],
        });
    });
});
