import { useFetchGeneral } from "../useFetchGeneral";
import { useGeneralStore } from "@/stores/settingsStore";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useConfigurationStore } from "@/stores/configurationStore";
import { DataService } from "@/services/DataService";
import { WarningHazard, WarningLevel, Configurations } from "@/types";

// Mock the stores
jest.mock("@/stores/settingsStore");
jest.mock("@/stores/configurationStore");

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
    let mockSetFeatureFlags: jest.Mock;
    let mockSetMenu: jest.Mock;
    let mockFetchWeatherHazards: jest.Mock;
    let mockFetchWarningLevels: jest.Mock;
    let mockFetchConfiguration: jest.Mock;
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

    const mockConfigurations: Configurations[] = [
        {
            id: 1,
            value: "warnings",
            config: { showWarningsMenuItem: "true" } as any,
        },
        {
            id: 2,
            value: "other",
            config: { someKey: "someValue" } as any,
        },
    ];

    const mockMenu = [
        { pathName: "", text: "Weather Map", value: "map" },
        { pathName: "stations", text: "Stations", value: "stationslist" },
        { pathName: "warnings", text: "Warnings", value: "warnings" },
        { pathName: "fthiotida-forecast", text: "Fthiotida Forecast", value: "fthiotidaforecast" },
        { pathName: "about-us", text: "About Us", value: "aboutus" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        consoleSpy.mockClear();

        // Setup mocks
        mockSetHazards = jest.fn();
        mockSetWarningsLevels = jest.fn();
        mockSetFeatureFlags = jest.fn();
        mockSetMenu = jest.fn();

        mockFetchWeatherHazards = jest.fn();
        mockFetchWarningLevels = jest.fn();
        mockFetchConfiguration = jest.fn();

        mockDataServiceInstance = {
            fetchWeatherHazards: mockFetchWeatherHazards,
            fetchWarningLevels: mockFetchWarningLevels,
            fetchConfiguration: mockFetchConfiguration,
        };

        (DataService as jest.Mock).mockImplementation(() => mockDataServiceInstance);

        (useGeneralStore as unknown as jest.Mock).mockImplementation((selector) => {
            const state = {
                setHazards: mockSetHazards,
                setWarningsLevels: mockSetWarningsLevels,
            };
            return selector(state);
        });

        const configState = {
            setFeatureFlags: mockSetFeatureFlags,
            menu: mockMenu,
            setMenu: mockSetMenu,
        };

        const mockUseConfigurationStore = jest.fn((selector?: any) => {
            if (selector) {
                return selector(configState);
            }
            return configState;
        }) as any;

        mockUseConfigurationStore.getState = jest.fn(() => configState);

        (useConfigurationStore as any) = mockUseConfigurationStore;
    });

    afterEach(() => {
        consoleSpy.mockClear();
    });

    describe("Fetching Hazards", () => {
        it("should fetch hazards on hook initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            expect(mockFetchWeatherHazards).toHaveBeenCalled();
        });

        it("should set hazards when fetch succeeds", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(mockSetHazards).toHaveBeenCalledWith(mockHazards);
        });

        it("should set empty hazards array on fetch error", async () => {
            const error = new Error("Fetch failed");
            mockFetchWeatherHazards.mockRejectedValue(error);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(mockSetHazards).toHaveBeenCalledWith([]);
        });

        it("should log error when fetching hazards fails", async () => {
            const error = new Error("Network error");
            mockFetchWeatherHazards.mockRejectedValue(error);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(consoleSpy).toHaveBeenCalledWith(error);
        });

        it("should handle empty hazards response", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(mockSetHazards).toHaveBeenCalledWith([]);
        });
    });

    describe("Fetching Warning Levels", () => {
        it("should fetch warning levels on hook initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            expect(mockFetchWarningLevels).toHaveBeenCalled();
        });

        it("should set warning levels when fetch succeeds", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetWarningsLevels).toHaveBeenCalledWith(mockWarningLevels);
        });

        it("should set empty warning levels array on fetch error", async () => {
            const error = new Error("Fetch failed");
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockRejectedValue(error);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetWarningsLevels).toHaveBeenCalledWith([]);
        });

        it("should log error when fetching warning levels fails", async () => {
            const error = new Error("API error");
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockRejectedValue(error);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(consoleSpy).toHaveBeenCalledWith(error);
        });
    });
    describe("Fetching Configuration", () => {
        it("should fetch configuration on hook initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            expect(mockFetchConfiguration).toHaveBeenCalled();
        });

        it("should transform configuration array to feature flags object", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetFeatureFlags).toHaveBeenCalledWith(
                expect.objectContaining({
                    warnings: { showWarningsMenuItem: "true" },
                    other: { someKey: "someValue" },
                })
            );
        });

        it("should set empty feature flags on fetch error", async () => {
            const error = new Error("Config fetch failed");
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockRejectedValue(error);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetFeatureFlags).toHaveBeenCalledWith({});
        });

        it("should log error when fetching configuration fails", async () => {
            const error = new Error("Configuration error");
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockRejectedValue(error);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(consoleSpy).toHaveBeenCalledWith(error);
        });

        it("should handle empty configuration response", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetFeatureFlags).toHaveBeenCalledWith({});
        });
    });

    describe("Menu Management", () => {
        it("should set full menu when warnings menu item is enabled", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetMenu).toHaveBeenCalledWith(mockMenu);
        });

        it("should remove warnings from menu when showWarningsMenuItem is false", async () => {
            const configWithoutWarnings: Configurations[] = [
                {
                    id: 1,
                    value: "warnings",
                    config: { showWarningsMenuItem: false } as any,
                },
            ];

            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(configWithoutWarnings);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetMenu).toHaveBeenCalledWith(
                expect.not.arrayContaining([expect.objectContaining({ value: "warnings" })])
            );
        });

        it("should filter out warnings and include other menu items", async () => {
            const configWithoutWarnings: Configurations[] = [
                {
                    id: 1,
                    value: "warnings",
                    config: { showWarningsMenuItem: false } as any,
                },
            ];

            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(configWithoutWarnings);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            const callArgs = mockSetMenu.mock.calls[0][0];
            expect(callArgs).toContainEqual(expect.objectContaining({ value: "map" }));
            expect(callArgs).toContainEqual(expect.objectContaining({ value: "stationslist" }));
            expect(callArgs).not.toContainEqual(expect.objectContaining({ value: "warnings" }));
        });
    });

    describe("Concurrent Fetches", () => {
        it("should fetch all data concurrently on initialization", () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            expect(mockFetchWeatherHazards).toHaveBeenCalled();
            expect(mockFetchWarningLevels).toHaveBeenCalled();
            expect(mockFetchConfiguration).toHaveBeenCalled();
        });

        it("should set all data even if one fails", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockRejectedValue(new Error("Failed"));
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalledWith(mockHazards);
            expect(mockSetWarningsLevels).toHaveBeenCalledWith([]);
            expect(mockSetFeatureFlags).toHaveBeenCalled();
        });

        it("should handle all failures gracefully", async () => {
            mockFetchWeatherHazards.mockRejectedValue(new Error("Hazards failed"));
            mockFetchWarningLevels.mockRejectedValue(new Error("Levels failed"));
            mockFetchConfiguration.mockRejectedValue(new Error("Config failed"));

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalledWith([]);
            expect(mockSetWarningsLevels).toHaveBeenCalledWith([]);
            expect(mockSetFeatureFlags).toHaveBeenCalledWith({});
        });
    });

    describe("DataService Initialization", () => {
        it("should create DataService instance", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            expect(DataService).toHaveBeenCalled();
        });

        it("should use DataService methods to fetch data", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockFetchWeatherHazards).toHaveBeenCalled();
            expect(mockFetchWarningLevels).toHaveBeenCalled();
            expect(mockFetchConfiguration).toHaveBeenCalled();
        });
    });

    describe("Store Updates", () => {
        it("should call setHazards from useGeneralStore", async () => {
            mockFetchWeatherHazards.mockResolvedValue(mockHazards);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalled();
        });

        it("should call setWarningsLevels from useGeneralStore", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue(mockWarningLevels);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetWarningsLevels).toHaveBeenCalled();
        });

        it("should call setFeatureFlags from useConfigurationStore", async () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(mockConfigurations);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetFeatureFlags).toHaveBeenCalled();
        });
    });

    describe("Edge Cases", () => {
        it("should handle null values in configuration", async () => {
            const configWithNull: Configurations[] = [
                {
                    id: 1,
                    value: "warnings",
                    config: null as any,
                },
            ];

            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(configWithNull);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetFeatureFlags).toHaveBeenCalled();
        });

        it("should handle configuration with missing warnings key", async () => {
            const configWithoutWarnings: Configurations[] = [
                {
                    id: 1,
                    value: "other",
                    config: { someKey: "someValue" } as any,
                },
            ];

            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue(configWithoutWarnings);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetFeatureFlags).toHaveBeenCalledWith(
                expect.not.objectContaining({
                    warnings: expect.anything(),
                })
            );
        });

        it("should handle multiple calls without issues", () => {
            mockFetchWeatherHazards.mockResolvedValue([]);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();
            useFetchGeneral();
            useFetchGeneral();

            expect(mockFetchWeatherHazards).toHaveBeenCalledTimes(3);
            expect(mockFetchWarningLevels).toHaveBeenCalledTimes(3);
            expect(mockFetchConfiguration).toHaveBeenCalledTimes(3);
        });

        it("should handle large response data", async () => {
            const largeHazardList = Array.from({ length: 1000 }, (_, i) => ({
                id: i,
                label: `Hazard ${i}`,
                asset: `hazard${i}.png`,
                translations: [],
            }));

            mockFetchWeatherHazards.mockResolvedValue(largeHazardList);
            mockFetchWarningLevels.mockResolvedValue([]);
            mockFetchConfiguration.mockResolvedValue([]);

            useFetchGeneral();

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSetHazards).toHaveBeenCalledWith(largeHazardList);
        });
    });
});
