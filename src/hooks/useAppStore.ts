import { create } from "zustand";

type AppStore = {
    isStationModalOpen: boolean;
    setIsStationModalOpen: (value: boolean) => void;
    activeStation: number;
    setActiveStation: (stationId: number) => void;
};

export const useAppStore = create<AppStore>((set) => ({
    isStationModalOpen: false,
    setIsStationModalOpen: (isStationModalOpen) => {
        set(() => ({ isStationModalOpen }));
    },
    activeStation: 0,
    setActiveStation: (activeStation) => {
        set(() => ({ activeStation }));
    },
}));
