"use client";
import ForecastLayer from "@/components/Home/ForecastLayer";
import { useMarkerStationsClick } from "@/hooks/useMarkerStations";
import { StationsProvider } from "@/providers/StationsProvider";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomepageMap = dynamic(() => import("@/components/Home/HomepageMap"), {
    ssr: false,
});
const WarningsMapButton = dynamic(() => import("@/components/Warnings/WarningsMapButton"), {
    ssr: false,
});
const MapSearchForm = dynamic(() => import("@/components/Home/SearchForm/MapSearchForm"), {
    ssr: false,
});
const LayersMenu = dynamic(() => import("@/components/Home/LayersMenu"), {
    ssr: false,
});

export default function Homepage() {
    const { handleModal } = useMarkerStationsClick();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Ensure consistent server-client output
    }

    return (
        <StationsProvider>
            <main className="relative flex flex-1 flex-col">
                <aside 
                    className="absolute right-2 top-1 z-[3]"
                    id="layersMenu"
                >
                    <div className="flex items-center gap-2">
                        <WarningsMapButton></WarningsMapButton>
                        <LayersMenu></LayersMenu>
                    </div>
                </aside>
                <aside className="absolute right-0 top-[50px] z-[2] w-full lg:hidden">
                </aside>
                <div className="absolute left-2 top-2 z-[2] flex h-[40px] w-[240px] items-center gap-2">
                    <MapSearchForm showStationModal={handleModal}></MapSearchForm>
                </div>
                <HomepageMap></HomepageMap>
                <section className="fixed bottom-0 z-[2] w-full lg:bottom-0">
                    <ForecastLayer></ForecastLayer>
                </section>
            </main>
        </StationsProvider>
    );
}
