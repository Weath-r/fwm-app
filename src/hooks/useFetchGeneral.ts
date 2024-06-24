"use client";
import { useEffect } from "react";
import { useGeneralStore } from "@/stores/settingsStore";
import { DataService } from "@/services/DataService";

export const useFetchGeneral = () => {
    const setHazards = useGeneralStore((state) => state.setHazards);
    const setWarningsLevels = useGeneralStore((state) => state.setWarningsLevels);
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

    useEffect(() => {
        fetchHazards();
        fetchLevels();
    }, [setHazards]);
};