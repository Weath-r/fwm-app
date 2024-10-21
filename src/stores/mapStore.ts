import { create } from "zustand";
import { Map } from "leaflet";
import { MapMarker } from "@/types";

type MapStore = {
    map: Map | null;
    setMap: (map: Map) => void;
    markers: MapMarker[];
    setMarkers: (markers: MapMarker[]) => void;
    addMarker: (marker: MapMarker) => void;
  clearMarkers: () => void;
};

export const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map: Map) => set({ map }),
    markers: [],
    setMarkers: (markers: MapMarker[]) => set({ markers }),
    addMarker: (marker: MapMarker) =>
        set((state) => ({
            markers: [...state.markers, marker],
        })),
    clearMarkers: () => set({ markers: [] }),
}));
