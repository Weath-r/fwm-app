"use client";
import { useEffect } from "react";
import { useGeneralStore } from "@/stores/settingsStore";
import { useConfigurationStore } from "@/stores/configurationStore";
import { DataService } from "@/services/DataService";
import { FeatureFlags, Configurations } from "@/types";

export const useFetchGeneral = () => {
    const setHazards = useGeneralStore((state) => state.setHazards);
    const setWarningsLevels = useGeneralStore((state) => state.setWarningsLevels);
    const setFeatureFlags = useConfigurationStore((state) => state.setFeatureFlags);
    const { menu } = useConfigurationStore();
    const dataService = new DataService();

    const fetchHazards = async () => {
        await dataService
            .fetchWeatherHazards()
            .then((response) => {
                setHazards(response);
            })
            .catch((error) => {
                console.log(error);
                setHazards([]);
            });
    };

    const fetchLevels = async () => {
        await dataService
            .fetchWarningLevels()
            .then((response) => {
                setWarningsLevels(response);
            })
            .catch((error) => {
                console.log(error);
                setWarningsLevels([]);
            });
    };    
   
    const fetchFeatureFlags = async () => {
        await dataService
            .fetchConfiguration()
            .then((response: Configurations[]) => {
                const result: FeatureFlags = response.reduce<FeatureFlags>((acc, currentVal) => {
                    acc[currentVal.value] = currentVal.config;
                    return acc;
                }, {});
                createHeaderMenu(result);
                setFeatureFlags(result);
            })
            .catch((error) => {
                console.log(error);
                setFeatureFlags({});
            });
    };

    const createHeaderMenu = (config: FeatureFlags) => {
        const warningsMenuItem = config["warnings"].showWarningsMenuItem;
        const setMenu = useConfigurationStore.getState().setMenu;

        if (!warningsMenuItem) {
            const newMenu = menu.filter(item => item.value !== "warnings");
            setMenu(newMenu);
        } else {
            setMenu(menu);
        }
    };

    useEffect(() => {
        fetchHazards();
        fetchLevels();
        fetchFeatureFlags();
    }, []);
};