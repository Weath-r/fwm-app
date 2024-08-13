import { create } from "zustand";
import { Map } from "leaflet";

type MapStore = {
    map: Map | null;
    setMap: (map: Map) => void;
};

export const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map: Map) => set({ map }),
}));
