const mockFetchWeatherHazards = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchWeatherHazards: mockFetchWeatherHazards,
    })),
}));

describe("getWeatherHazards", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated hazards from DataService", async () => {
        const hazards = [{ id: 1, label: "Wind" }];
        mockFetchWeatherHazards.mockResolvedValue(hazards);

        const { getWeatherHazards } = await import("../getWeatherHazards");

        await expect(getWeatherHazards()).resolves.toEqual(hazards);
    });

    it("requests them with a 7d revalidate window and the hazards cache tag", async () => {
        mockFetchWeatherHazards.mockResolvedValue([]);

        const { getWeatherHazards, HAZARDS_CACHE_TAG } = await import("../getWeatherHazards");
        await getWeatherHazards();

        expect(mockFetchWeatherHazards).toHaveBeenCalledWith({
            revalidate: 604_800,
            tags: [HAZARDS_CACHE_TAG],
        });
    });
});
