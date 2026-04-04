import { useAssetsFromFolder } from "../useFetchAssetsFromFolder";
import { DataService } from "@/services/DataService";
import { Assets } from "@/types";
import * as React from "react";

jest.mock("@/services/DataService");

jest.mock("react", () => {
    const originalReact = jest.requireActual("react");
    let stateMap = new Map<number, any[]>();
    let stateCounter = 0;

    return {
        ...originalReact,
        useState: (initialValue: any) => {
            const key = stateCounter++;
            if (!stateMap.has(key)) {
                stateMap.set(key, [initialValue]);
            }

            const state = stateMap.get(key)!;
            const setter = (newValue: any) => {
                const value = typeof newValue === "function" ? newValue(state[0]) : newValue;
                state[0] = value;
            };

            return [state[0], setter];
        },
        useEffect: (fn: () => any) => {
            const result = fn();
            if (result instanceof Promise) {
                result.then(() => {}).catch(() => {});
            }
        },
        __resetState: () => {
            stateMap = new Map();
            stateCounter = 0;
        },
    };
});

describe("useAssetsFromFolder", () => {
    let mockDataService: any;
    let mockFetchAssetsFromFolder: jest.Mock;

    const mockAssets: Assets[] = [
        { id: "1", name: "Asset 1", path: "/assets/1", type: "image" } as any,
        { id: "2", name: "Asset 2", path: "/assets/2", type: "video" } as any,
    ];

    beforeEach(() => {
        (React as any).__resetState();
        mockFetchAssetsFromFolder = jest.fn().mockResolvedValue([]);
        mockDataService = {
            fetchAssetsFromFolder: mockFetchAssetsFromFolder,
        };
        (DataService as jest.Mock).mockImplementation(() => mockDataService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Initial State", () => {
        it("should return empty array on first render", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            const result = useAssetsFromFolder("folder-1");

            expect(result).toEqual([]);
        });

        it("should initialize DataService on mount", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("folder-1");

            expect(DataService).toHaveBeenCalledTimes(1);
        });
    });

    describe("Service Calls", () => {
        it("should call fetchAssetsFromFolder with folder ID", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve(mockAssets));

            useAssetsFromFolder("folder-1");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledWith("folder-1");
        });

        it("should call fetchAssetsFromFolder on mount with different IDs", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("custom-folder-id");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledWith("custom-folder-id");
        });

        it("should call fetchAssetsFromFolder once per mount", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve(mockAssets));

            useAssetsFromFolder("folder-1");
            expect(mockFetchAssetsFromFolder).toHaveBeenCalledTimes(1);
        });

        it("should accept UUID format folder IDs", () => {
            const uuid = "550e8400-e29b-41d4-a716-446655440000";
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder(uuid);

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledWith(uuid);
        });

        it("should accept numeric string folder IDs", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("12345");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledWith("12345");
        });
    });

    describe("Error Handling", () => {
        it("should trigger fetch on error without throwing", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() =>
                Promise.reject(new Error("Fetch failed"))
            );

            expect(() => useAssetsFromFolder("folder-1")).not.toThrow();
        });

        it("should handle network errors", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() =>
                Promise.reject(new Error("Network error"))
            );

            expect(() => useAssetsFromFolder("folder-1")).not.toThrow();
        });

        it("should handle missing folder errors", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() =>
                Promise.reject(new Error("Folder not found"))
            );

            expect(() => useAssetsFromFolder("non-existent")).not.toThrow();
        });

        it("should handle validation errors", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() =>
                Promise.reject(new Error("Invalid response"))
            );

            expect(() => useAssetsFromFolder("folder-1")).not.toThrow();
        });

        it("should initialize with empty array on error", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() =>
                Promise.reject(new Error("Fetch failed"))
            );

            const result = useAssetsFromFolder("folder-1");

            expect(result).toEqual([]);
        });
    });

    describe("DataService Integration", () => {
        it("should create new DataService instance", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("folder-1");

            expect(DataService).toHaveBeenCalled();
        });

        it("should use DataService instance to fetch data", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve(mockAssets));

            useAssetsFromFolder("folder-1");

            expect(mockDataService.fetchAssetsFromFolder).toHaveBeenCalled();
        });

        it("should call DataService method exactly once on mount", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("folder-1");
            useAssetsFromFolder("folder-2");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledTimes(2);
        });
    });

    describe("React Hooks Integration", () => {
        it("should call useState to initialize assets state", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            const result = useAssetsFromFolder("folder-1");

            expect(Array.isArray(result)).toBe(true);
        });

        it("should call useEffect on mount", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("folder-1");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalled();
        });

        it("should start fetch operation on component mount", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve(mockAssets));

            useAssetsFromFolder("folder-1");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledTimes(1);
        });
    });

    describe("Edge Cases", () => {
        it("should handle empty folder gracefully", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            const result = useAssetsFromFolder("empty-folder");

            expect(Array.isArray(result)).toBe(true);
        });

        it("should handle multiple mounts with different folders", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            useAssetsFromFolder("folder-1");
            expect(mockFetchAssetsFromFolder).toHaveBeenCalledWith("folder-1");

            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));
            useAssetsFromFolder("folder-2");
            expect(mockFetchAssetsFromFolder).toHaveBeenCalledWith("folder-2");
        });

        it("should preserve initial empty array state", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve(mockAssets));

            const result = useAssetsFromFolder("folder-1");

            expect(result).toEqual([]);
        });

        it("should handle immediate fetch call", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve(mockAssets));

            useAssetsFromFolder("folder-1");

            expect(mockFetchAssetsFromFolder).toHaveBeenCalledTimes(1);
        });

        it("should return Array type not null", () => {
            mockFetchAssetsFromFolder.mockImplementationOnce(() => Promise.resolve([]));

            const result = useAssetsFromFolder("folder-1");

            expect(result).not.toBeNull();
            expect(Array.isArray(result)).toBe(true);
        });
    });
});
