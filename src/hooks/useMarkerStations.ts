"use client";
import { useAppStore } from "@/hooks/useAppStore";
import { useDialogStore } from "@/stores/dialogStore";

export const useMarkerStationsClick = () => {
    const { setActiveStation, activeStation } = useAppStore();
    const { setDialog, setDialogMarkerType, setDialogLoading, setDialogContent } = useDialogStore();

    const handleModal = (stationId: number) => {
        setActiveStation(+stationId);
        setDialogMarkerType("stationDetails");
        setDialog(true);
        setDialogLoading(true);
    };

    const handleCloseModal = () => {
        setActiveStation(-1);
        setDialog(false);
        setDialogContent([]);
    };


    return {
        handleModal,
        handleCloseModal,
        activeStation,
    };
};
