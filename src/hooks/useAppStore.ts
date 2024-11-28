import {
    getFavouritesStationList,
    getShowFavouriteStations,
    storeFavouriteStationsList,
    storeShowFavouriteStations
} from "@/utils/localStorage";
import { create } from "zustand";

type AppStore = {
    isStationModalOpen: boolean;
    setIsStationModalOpen: (value: boolean) => void;
    activeStation: number;
    setActiveStation: (stationId: number) => void;
    isStationFavourite: (stationId: number) => boolean;
    favouriteStations: number[];
    handleFavouriteStationButton: (stationId: number) => void;
    showFavouriteStations: boolean;
    setShowFavouriteStations: (value: boolean) => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
    isStationModalOpen: false,
    setIsStationModalOpen: (isStationModalOpen) => {
        set(() => ({ isStationModalOpen }));
    },
    activeStation: 0,
    setActiveStation: (activeStation) => {
        set(() => ({ activeStation }));
    },
    favouriteStations: getFavouritesStationList(),
    isStationFavourite: (stationId: number) => {
        const storedFavouriteStations = getFavouritesStationList();
        return storedFavouriteStations.includes(stationId);
    },
    handleFavouriteStationButton: (stationId: number) => {
        if (getFavouritesStationList().includes(stationId)) {
            set((state) => ({
                favouriteStations: state.favouriteStations.filter((id) => stationId !== id),
            }));
        } else {
            set((state) => ({ favouriteStations: [...state.favouriteStations, stationId] }));
        }

        if (get().favouriteStations.length === 0) {
            set(() => ({ showFavouriteStations: false }));
            storeShowFavouriteStations(false);
        }
        storeFavouriteStationsList(get().favouriteStations);
    },
    showFavouriteStations: getShowFavouriteStations(),
    setShowFavouriteStations: (showFavouriteStations) => {
        set(() => ({ showFavouriteStations }));
        storeShowFavouriteStations(showFavouriteStations);
    },
}));
