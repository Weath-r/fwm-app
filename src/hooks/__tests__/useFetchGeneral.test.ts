import { useFetchGeneral } from "../useFetchGeneral";
import { useGeneralStore } from "@/stores/settingsStore";
import { DataService } from "@/services/DataService";
import { WarningHazard, WarningLevel } from "@/types";

// Mock the stores
jest.mock("@/stores/settingsStore");

jest.mock("@/services/DataService");

jest.mock("react", () => {
    const originalReact = jest.requireActual("react");
    return {
        ...originalReact,
        useEffect: (fn: () => void, deps?: any[]) => {
            if (!deps || deps.length === 0) {
                fn();
            }
        },
    };
});

const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

describe("useFetchGeneral", () => {
    let mockSetHazards: jest.Mock;
    let mockSetWarningsLevels: jest.Mock;
    let mockFetchWeatherHazards: jest.Mock;
    let mockFetchWarningLevels: jest.Mock;
    let mockDataServiceInstance: any;

    // Mock data
    const mockHazards: WarningHazard[] = [
        { id: 1, label: "Wind", asset: "wind.png", translations: [] },
        { id: 2, label: "Rain", asset: "rain.png", translations: [] },
    ];

    const mockWarningLevels: WarningLevel[] = [
        { id: 1, label: "Green", color: "#00ff00", translations: [] },
        { id: 2, label: "Yellow", color: "#ffff00", translations: [] },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        consoleSpy.mockClear();

        // Setup mocks
        mockSetHazards = jest.fn();
        mockSetWarningsLevels = jest.fn();

        mockFetchWeatherHazards = jest.fn();
        mockFetchWarningLevels = jest.fn();

        mockDataServiceInstance = {
            fetchWeatherHazards: mockFetchWeatherHazards,
            fetchWarningLevels: mockFetchWarningLevels,
        };

        (DataService as jest.Mock).mockImplementation(() => mockDataServiceInstance);

        (useGeneralStore as unknown as jest.Mock).mockImplementation((selector) => {
            const state = {
                setHazards: mockSetHazards,
                setWarningsLevels: mockSetWarningsLevels,
            };
            return selector(state);
        });
    });

    afterEach(() => {
        consoleSpy.mockClear();
    });

    describe("Fetching Hazards", () => {
        it("should fetch hazards on hook initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            expect(mockFetchWeatherHazards).toHaveBeenCalled();
        });

        it("should set hazards when fetch succeeds", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(mockSetHazards).toHaveBeenCalledWith(mockHazards);
        });

        it("should set empty hazards array on fetch error", async () => {
            const error = new Error("Fetch failed");
            mockFetchWeatherHazards.mockRejectedValue(error);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(mockSetHazards).toHaveBeenCalledWith([]);
        });

        it("should log error when fetching hazards fails", async () => {
            const error = new Error("Network error");
            mockFetchWeatherHazards.mockRejectedValue(error);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(consoleSpy).toHaveBeenCalledWith(error);
        });

        it("should handle empty hazards response", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(mockSetHazards).toHaveBeenCalledWith([]);
        });
    });

    describe("Fetching Warning Levels", () => {
        it("should fetch warning levels on hook initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);

            useFetchGeneral();

            expect(mockFetchWarningLevels).toHaveBeenCalled();
        });

        it("should set warning levels when fetch succeeds", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetWarningsLevels).toHaveBeenCalledWith(mockWarningLevels);
        });

        it("should set empty warning levels array on fetch error", async () => {
            const error = new Error("Fetch failed");
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockRejectedValue(error);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetWarningsLevels).toHaveBeenCalledWith([]);
        });

        it("should log error when fetching warning levels fails", async () => {
            const error = new Error("API error");
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockRejectedValue(error);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(consoleSpy).toHaveBeenCalledWith(error);
        });
    });

    describe("Concurrent Fetches", () => {
        it("should fetch all data concurrently on initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);

            useFetchGeneral();

            expect(mockFetchWeatherHazards).toHaveBeenCalled();
            expect(mockFetchWarningLevels).toHaveBeenCalled();
        });

        it("should set all data even if one fails", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockRejectedValue(new Error("Failed"));

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalledWith(mockHazards);
            expect(mockSetWarningsLevels).toHaveBeenCalledWith([]);
        });

        it("should handle all failures gracefully", async () => {
            mockFetchWeatherHazards.mockRejectedValue(new Error("Hazards failed"));
            mockFetchWarningLevels.mockRejectedValue(new Error("Levels failed"));

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalledWith([]);
            expect(mockSetWarningsLevels).toHaveBeenCalledWith([]);
        });
    });

    describe("DataService Initialization", () => {
        it("should create DataService instance", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            expect(DataService).toHaveBeenCalled();
        });

        it("should use DataService methods to fetch data", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockFetchWeatherHazards).toHaveBeenCalled();
            expect(mockFetchWarningLevels).toHaveBeenCalled();
        });
    });

    describe("Store Updates", () => {
        it("should call setHazards from useGeneralStore", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalled();
        });

        it("should call setWarningsLevels from useGeneralStore", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetWarningsLevels).toHaveBeenCalled();
        });
    });

    describe("Edge Cases", () => {
        it("should handle multiple calls without issues", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();
            useFetchGeneral();
            useFetchGeneral();

            expect(mockFetchWeatherHazards).toHaveBeenCalledTimes(3);
            expect(mockFetchWarningLevels).toHaveBeenCalledTimes(3);
        });

        it("should handle large response data", async () => {
            const largeHazardList = Array.from({ length: 1000 }, (_, index) => ({
                id: index,
                label: `Hazard ${index}`,
                asset: `hazard${index}.png`,
                translations: [],
            }));

            mockFetchWeatherHazards.mockResolvedValue(largeHazardList);
            mockFetchWarningLevels.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalledWith(largeHazardList);
        });
    });
});
