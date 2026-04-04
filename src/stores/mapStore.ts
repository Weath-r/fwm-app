import { create } from "zustand";
import { Map } from "leaflet";
import { MapMarker } from "@/types";

type MapStore = {
    map: Map | null;
    setMap: (map: Map) => void;
    markers: MapMarker[];
    addMarker: (marker: MapMarker) => void;
    clearMarkers: () => void;
};

export const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map: Map) => set({ map }),
    markers: [],
    addMarker: (marker: MapMarker) =>
        set((state) => ({
            markers: [...state.markers, marker],
        })),
    clearMarkers: () => set({ markers: [] }),
}));
