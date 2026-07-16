const mockFetchWarningLevels = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchWarningLevels: mockFetchWarningLevels,
    })),
}));

describe("getWarningLevels", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated warning levels from DataService", async () => {
        const levels = [{ id: 1, label: "Orange", color: "#ff8800" }];
        mockFetchWarningLevels.mockResolvedValue(levels);

        const { getWarningLevels } = await import("../getWarningLevels");

        await expect(getWarningLevels()).resolves.toEqual(levels);
    });

    it("requests them with a 7d revalidate window and the warning-levels cache tag", async () => {
        mockFetchWarningLevels.mockResolvedValue([]);

        const { getWarningLevels, WARNING_LEVELS_CACHE_TAG } = await import("../getWarningLevels");
        await getWarningLevels();

        expect(mockFetchWarningLevels).toHaveBeenCalledWith({
            revalidate: 604_800,
            tags: [WARNING_LEVELS_CACHE_TAG],
        });
    });
});
