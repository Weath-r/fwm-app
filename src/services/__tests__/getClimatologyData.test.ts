const mockFetchStationHistoricalClimateData = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchStationHistoricalClimateData: mockFetchStationHistoricalClimateData,
    })),
}));

describe("getClimatologyData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated climatology data from DataService", async () => {
        const climate = [{ month_id: { value: 1 }, mean_temperature: 12 }];
        mockFetchStationHistoricalClimateData.mockResolvedValue(climate);

        const { getClimatologyData } = await import("../getClimatologyData");

        await expect(getClimatologyData(42)).resolves.toEqual(climate);
    });

    it("requests it with a 7d revalidate window and a location-scoped tag", async () => {
        mockFetchStationHistoricalClimateData.mockResolvedValue([]);

        const { getClimatologyData, CLIMATOLOGY_CACHE_TAG } = await import("../getClimatologyData");
        await getClimatologyData(42);

        expect(mockFetchStationHistoricalClimateData).toHaveBeenCalledWith(42, {
            revalidate: 604_800,
            tags: [CLIMATOLOGY_CACHE_TAG, `${CLIMATOLOGY_CACHE_TAG}-42`],
        });
    });
});
