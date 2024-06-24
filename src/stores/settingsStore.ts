import { create } from "zustand";
import { WarningHazard, WarningLevel } from "@/types";

type GeneralStore = {
    hazards: WarningHazard[];
    addHazards: (hazard: WarningHazard) => void;
    setHazards: (hazards: WarningHazard[]) => void;
    warningLevels: WarningLevel[];
    addWarningsLevels: (warning: WarningLevel) => void;
    setWarningsLevels: (warnings: WarningLevel[]) => void;
};

export const useGeneralStore = create<GeneralStore>((set) => ({
    hazards: [],
    addHazards: (hazard: WarningHazard) => set((state) => ({ hazards: [...state.hazards, hazard] })),
    setHazards: (hazards: WarningHazard[]) => set({ hazards }),
    warningLevels: [],
    addWarningsLevels: (warning: WarningLevel) => set((state) => ({ warningLevels: [...state.warningLevels, warning] })),
    setWarningsLevels: (warningLevels: WarningLevel[]) => set({ warningLevels }),
}));
