import { SearchableStation } from "@/types";

// Favourite stations logic
export const FAVOURITES_STATION_LOCAL_STORAGE_KEY = "favouriteStations";
export const SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY = "showFavouriteStations";

export const getFavouritesStationList = () => {
    if (typeof window === "undefined") {
        return [];
    }
    if (localStorage.getItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY) !== null) {
        return JSON.parse(localStorage.getItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY)!);
    }

    return [];
};

export const storeFavouriteStationsList = (favouriteStations: number[]) => {
    localStorage.setItem(FAVOURITES_STATION_LOCAL_STORAGE_KEY, JSON.stringify(favouriteStations));
};

export const getShowFavouriteStations = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY) !== null) {
        return JSON.parse(
            localStorage.getItem(SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY)!
        ) as boolean;
    }

    return false;
};

export const storeShowFavouriteStations = (showFavouriteStations: boolean) => {
    localStorage.setItem(
        SHOW_FAVOURITES_STATION_LOCAL_STORAGE_KEY,
        JSON.stringify(showFavouriteStations)
    );
};

// User previous searches logic
export const RECENT_SEARCHES_LOCAL_STORAGE_KEY = "myWeatherSearches";
const MAX_RECENT_SEARCHES = 3;

export const getRecentSearches = (): number[] => {
    if (typeof window === "undefined") {
        return [];
    }
    try {
        return JSON.parse(localStorage.getItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY) ?? "[]");
    } catch {
        return [];
    }
};

export const saveRecentSearch = (result: SearchableStation) => {
    const withoutDuplicate = getRecentSearches().filter((stationId) => stationId !== result.id);
    const updatedSearchTerms = [result.id, ...withoutDuplicate].slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY, JSON.stringify(updatedSearchTerms));
};

export const clearRecentSearches = () => {
    localStorage.removeItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY);
};
