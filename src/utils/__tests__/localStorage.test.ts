import {
    FAVOURITES_STATION_LOCAL_STORAGE_KEY,
    SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY,
    RECENT_SEARCHES_LOCAL_STORAGE_KEY,
    getFavouritesStationList,
    storeFavouriteStationsList,
    getShowFavouriteStations,
    storeShowFavouriteStations,
    getRecentSearches,
    saveRecentSearch,
    clearRecentSearches,
} from "../localStorage";
import { SearchableStation } from "@/types";

const createStation = (id: number): SearchableStation => ({
    id,
    temperature: 20,
    windSpeed: 10,
    windDirection: 90,
    weatherConditionIcon: "sunny",
    name_el: `Station ${id} EL`,
    name_en: `Station ${id} EN`,
    name_el_latin: `Station ${id} Latin`,
    prefecture_el: `Prefecture ${id} EL`,
    prefecture_en: `Prefecture ${id} EN`,
});

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
            expect(RECENT_SEARCHES_LOCAL_STORAGE_KEY).toBe("myWeatherSearches");
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

    describe("getRecentSearches", () => {
        it("should return empty array when no data in localStorage", () => {
            const result = getRecentSearches();

            expect(result).toEqual([]);
        });

        it("should return stored recent search IDs", () => {
            const stationIds = [1, 2];
            localStorage.setItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY, JSON.stringify(stationIds));

            const result = getRecentSearches();

            expect(result).toEqual(stationIds);
        });

        it("should return empty array when stored value is malformed JSON", () => {
            localStorage.setItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY, "not-json");

            const result = getRecentSearches();

            expect(result).toEqual([]);
        });

        it("should return empty array when window is undefined (SSR)", () => {
            const originalWindow = global.window;
            // @ts-expect-error ignore
            delete global.window;

            const result = getRecentSearches();

            expect(result).toEqual([]);

            global.window = originalWindow;
        });
    });

    describe("saveRecentSearch", () => {
        it("should store the first recent search as an ID", () => {
            saveRecentSearch(createStation(1));

            expect(getRecentSearches()).toEqual([1]);
        });

        it("should add new searches to the front of the list", () => {
            saveRecentSearch(createStation(1));
            saveRecentSearch(createStation(2));

            expect(getRecentSearches()).toEqual([2, 1]);
        });

        it("should move a duplicate station to the front instead of adding it twice", () => {
            saveRecentSearch(createStation(1));
            saveRecentSearch(createStation(2));
            saveRecentSearch(createStation(1));

            expect(getRecentSearches()).toEqual([1, 2]);
        });

        it("should cap the list at the maximum number of recent searches", () => {
            saveRecentSearch(createStation(1));
            saveRecentSearch(createStation(2));
            saveRecentSearch(createStation(3));
            saveRecentSearch(createStation(4));

            const result = getRecentSearches();

            expect(result).toHaveLength(3);
            expect(result).toEqual([4, 3, 2]);
        });
    });

    describe("clearRecentSearches", () => {
        it("should remove stored recent searches", () => {
            saveRecentSearch(createStation(1));

            clearRecentSearches();

            expect(getRecentSearches()).toEqual([]);
            expect(localStorage.getItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY)).toBeNull();
        });

        it("should not throw when there is nothing to clear", () => {
            expect(() => clearRecentSearches()).not.toThrow();
        });
    });
});
