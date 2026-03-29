import {
    FAVOURITES_STATION_LOCAL_STORAGE_KEY,
    SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY,
    getFavouritesStationList,
    storeFavouriteStationsList,
    getShowFavouriteStations,
    storeShowFavouriteStations,
} from "../localStorage";

describe("localStorage", () => {
    // Mock localStorage
    const localStorageMock = (() => {
        let store: Record<string, string> = {};

        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => {
                store[key] = value.toString();
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            },
        };
    })();

    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: localStorageMock,
        });
        localStorageMock.clear();
    });

    describe("Constants", () => {
        it("should have correct localStorage keys", () => {
            expect(FAVOURITES_STATION_LOCAL_STORAGE_KEY).toBe("favouriteStations");
            expect(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY).toBe("showFavouriteStations");
        });
    });

    describe("getFavouritesStationList", () => {
        it("should return empty array when no data in localStorage", () => {
            const result = getFavouritesStationList();

            expect(result).toEqual([]);
            expect(Array.isArray(result)).toBe(true);
        });

        it("should return stored favourite stations", () => {
            const stations = [1, 2, 3, 4, 5];
            localStorage.setItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY, JSON.stringify(stations));

            const result = getFavouritesStationList();

            expect(result).toEqual(stations);
        });

        it("should return empty array when window is undefined (SSR)", () => {
            const originalWindow = global.window;
            // @ts-expect-error ignore
            delete global.window;

            const result = getFavouritesStationList();

            expect(result).toEqual([]);

            global.window = originalWindow;
        });

        it("should handle single station", () => {
            const stations = [42];
            localStorage.setItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY, JSON.stringify(stations));

            const result = getFavouritesStationList();

            expect(result).toEqual([42]);
        });

        it("should handle large list of stations", () => {
            const stations = Array.from({ length: 100 }, (_, i) => i + 1);
            localStorage.setItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY, JSON.stringify(stations));

            const result = getFavouritesStationList();

            expect(result.length).toBe(100);
            expect(result[0]).toBe(1);
            expect(result[99]).toBe(100);
        });
    });

    describe("storeFavouriteStationsList", () => {
        it("should store favourite stations in localStorage", () => {
            const stations = [1, 2, 3];
            storeFavouriteStationsList(stations);

            const stored = localStorage.getItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY);
            expect(stored).toBe(JSON.stringify(stations));
        });

        it("should overwrite existing data", () => {
            const oldStations = [1, 2, 3];
            const newStations = [4, 5, 6];

            storeFavouriteStationsList(oldStations);
            expect(localStorage.getItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY)).toBe(
                JSON.stringify(oldStations)
            );

            storeFavouriteStationsList(newStations);
            expect(localStorage.getItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY)).toBe(
                JSON.stringify(newStations)
            );
        });

        it("should handle empty array", () => {
            storeFavouriteStationsList([]);

            const stored = localStorage.getItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY);
            expect(stored).toBe("[]");
        });

        it("should be retrievable with getter", () => {
            const stations = [7, 8, 9];
            storeFavouriteStationsList(stations);

            const retrieved = getFavouritesStationList();
            expect(retrieved).toEqual(stations);
        });
    });

    describe("getShowFavouriteStations", () => {
        it("should return false when no data in localStorage", () => {
            const result = getShowFavouriteStations();

            expect(result).toBe(false);
        });

        it("should return stored boolean value", () => {
            localStorage.setItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY, JSON.stringify(true));

            const result = getShowFavouriteStations();

            expect(result).toBe(true);
        });

        it("should return false from localStorage", () => {
            localStorage.setItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY, JSON.stringify(false));

            const result = getShowFavouriteStations();

            expect(result).toBe(false);
        });

        it("should return false when window is undefined (SSR)", () => {
            const originalWindow = global.window;
            // @ts-expect-error ignore
            delete global.window;

            const result = getShowFavouriteStations();

            expect(result).toBe(false);

            global.window = originalWindow;
        });
    });

    describe("storeShowFavouriteStations", () => {
        it("should store true value", () => {
            storeShowFavouriteStations(true);

            const stored = localStorage.getItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY);
            expect(stored).toBe("true");
        });

        it("should store false value", () => {
            storeShowFavouriteStations(false);

            const stored = localStorage.getItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY);
            expect(stored).toBe("false");
        });

        it("should overwrite existing value", () => {
            storeShowFavouriteStations(true);
            expect(localStorage.getItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY)).toBe("true");

            storeShowFavouriteStations(false);
            expect(localStorage.getItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY)).toBe("false");
        });

        it("should be retrievable with getter", () => {
            storeShowFavouriteStations(true);

            const retrieved = getShowFavouriteStations();
            expect(retrieved).toBe(true);
        });
    });
});
