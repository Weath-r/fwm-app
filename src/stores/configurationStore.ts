import { create } from "zustand";
import { FeatureFlags, MenuLink } from "@/types";

type ConfiguratorStore = {
    featureFlags: FeatureFlags;
    menu: MenuLink[];
    addFeatureFlags: (config: FeatureFlags) => void;
    setFeatureFlags: (featureFlags: FeatureFlags) => void;
    setMenu: (menu: MenuLink[]) => void;
  };

const initialMenu: MenuLink[] = [
    {
        pathName: "/",
        text: "Weather Map",
        value: "map",
    },{
        pathName: "/stations",
        text: "Stations",
        value: "stationslist",
    },{
        pathName: "/warnings",
        text: "Warnings",
        value: "warnings",
    },{
        pathName: "/fthiotida-forecast",
        text: "Fthiotida Forecast",
        value: "fthiotidaforecast",
    },{
        pathName: "/about-us",
        text: "About Us",
        value: "aboutus",
    }
];

export const useConfigurationStore = create<ConfiguratorStore>((set) => ({
    featureFlags: {},
    addFeatureFlags: (config: FeatureFlags) =>
        set((state) => ({ featureFlags: { ...state.featureFlags, ...config } })),
    setFeatureFlags: (featureFlags: FeatureFlags) => set({ featureFlags }),
    menu: initialMenu,
    setMenu: (menu: MenuLink[]) => set({ menu }),
}));
