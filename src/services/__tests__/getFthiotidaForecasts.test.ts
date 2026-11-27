const mockFetchFthiotidaForecasts = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchFthiotidaForecasts: mockFetchFthiotidaForecasts,
    })),
}));

describe("getFthiotidaForecasts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("returns the parsed forecast days", async () => {
        mockFetchFthiotidaForecasts.mockResolvedValue([
            {
                id: 7,
                forecast: { dates: { forecast_date: "26/11/2026" }, data: { Lamia: { tmax: 16 } } },
            },
        ]);

        const { getFthiotidaForecasts } = await import("../getFthiotidaForecasts");

        await expect(getFthiotidaForecasts()).resolves.toEqual([
            { id: 7, forecastDate: "2026-11-26", entries: { Lamia: { tmax: 16 } } },
        ]);
    });

    it("requests them with a 10 minute revalidate window and the Fthiotida cache tag", async () => {
        mockFetchFthiotidaForecasts.mockResolvedValue([]);

        const { getFthiotidaForecasts, FTHIOTIDA_FORECASTS_CACHE_TAG } =
            await import("../getFthiotidaForecasts");
        await getFthiotidaForecasts();

        expect(mockFetchFthiotidaForecasts).toHaveBeenCalledWith({
            revalidate: 600,
            tags: [FTHIOTIDA_FORECASTS_CACHE_TAG],
        });
    });
});
