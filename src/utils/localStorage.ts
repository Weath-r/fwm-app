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
