"use client";

import { useAppStore } from "@/hooks/useAppStore";

export const useMarkerStationsClick = () => {
    const { setActiveStation, activeStation } = useAppStore();

    const handleModal = (stationId: number) => {
        setActiveStation(+stationId);
    };

    const handleCloseModal = () => {
        setActiveStation(-1);
    };

    return {
        handleModal,
        handleCloseModal,
        activeStation,
    };
};
