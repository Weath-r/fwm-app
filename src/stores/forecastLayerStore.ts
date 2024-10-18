import { create } from "zustand";
import { ForecastGFSData } from "@/types";

type ForecastLayerStore = {
    forecastData: ForecastGFSData;
    setForecastData: (data: ForecastGFSData) => void;
    activeForecastHour: string;
    setActiveForecastHour: (hour: string) => void;
};

export const useForecastLayerStore = create<ForecastLayerStore>((set) => ({
    forecastData: {},
    setForecastData: (data: ForecastGFSData) => set({ forecastData: data }),
    activeForecastHour: "",
    setActiveForecastHour: (hour: string) => set({ activeForecastHour: hour }),
}));
