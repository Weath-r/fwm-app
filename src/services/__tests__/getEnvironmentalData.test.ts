const mockFetchEnvironmentalDataByStation = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchEnvironmentalDataByStation: mockFetchEnvironmentalDataByStation,
    })),
}));

describe("getEnvironmentalData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the cluster environmental data from DataService", async () => {
        const environmentalData = [{ cluster: 5, current: {}, hourly: {}, units: {} }];
        mockFetchEnvironmentalDataByStation.mockResolvedValue(environmentalData);

        const { getEnvironmentalData } = await import("../getEnvironmentalData");

        await expect(getEnvironmentalData(5)).resolves.toEqual(environmentalData);
    });

    it("requests it with a 15min revalidate window and no cache tag", async () => {
        mockFetchEnvironmentalDataByStation.mockResolvedValue([]);

        const { getEnvironmentalData } = await import("../getEnvironmentalData");
        await getEnvironmentalData(5);

        expect(mockFetchEnvironmentalDataByStation).toHaveBeenCalledWith(5, {
            revalidate: 900,
        });
    });
});
