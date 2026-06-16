import { create } from "zustand";
import { FeatureFlags, MenuLink } from "@/types";
import { BASE_MENU } from "@/constants/navigation";

type ConfiguratorStore = {
    featureFlags: FeatureFlags;
    menu: MenuLink[];
    addFeatureFlags: (config: FeatureFlags) => void;
    setFeatureFlags: (featureFlags: FeatureFlags) => void;
    setMenu: (menu: MenuLink[]) => void;
};

export const useConfigurationStore = create<ConfiguratorStore>((set) => ({
    featureFlags: {},
    addFeatureFlags: (config: FeatureFlags) =>
        set((state) => ({ featureFlags: { ...state.featureFlags, ...config } })),
    setFeatureFlags: (featureFlags: FeatureFlags) => set({ featureFlags }),
    menu: BASE_MENU,
    setMenu: (menu: MenuLink[]) => set({ menu }),
}));
