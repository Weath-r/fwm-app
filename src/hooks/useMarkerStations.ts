"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/hooks/useAppStore";

export const useMarkerStationsClick = () => {
    const [searchStationParam, setSearchStationParam] = useState<string | null>(null);
    const { setIsStationModalOpen, setActiveStation } = useAppStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleModal = (stationId: number) => {
        router.push(`${pathname}?station=${stationId}`);
    };

    const handleCloseModal = () => {
        router.push(`${pathname}`);
    };

    useEffect(() => {
        const activeStationParams = searchParams.get("station");
        setSearchStationParam(activeStationParams);
    }, [searchParams]);

    useEffect(() => {
        if(searchStationParam) {
            setIsStationModalOpen(true);
            setActiveStation(+searchStationParam);
        } else {
            setIsStationModalOpen(false);
            setActiveStation(0);
        }
    }, [searchStationParam]);

    return {
        handleModal,
        handleCloseModal,
    };
};
