"use client";
import CommonButton from "@/components/Common/CommonButton";
import ForecastLayer from "@/components/Home/ForecastLayer";
import { useAppStore } from "@/hooks/useAppStore";
import { useMarkerStationsClick } from "@/hooks/useMarkerStations";
import { StationsProvider } from "@/providers/StationsProvider";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomepageMap = dynamic(() => import("@/components/Home/HomepageMap"), {
    ssr: false,
});
const WarningsPanel = dynamic(() => import("@/components/Warnings/WarningsPanel"), {
    ssr: false,
});
const MobileWarnings = dynamic(() => import("@/components/Warnings/MobileWarnings"), {
    ssr: false,
});
const MapSearchForm = dynamic(() => import("@/components/Home/SearchForm/MapSearchForm"), {
    ssr: false,
});

export default function Home() {
    const { handleModal } = useMarkerStationsClick();
    const { setShowFavouriteStations, showFavouriteStations, favouriteStations } = useAppStore();

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
                <aside className="hidden lg:inline-block">
                    <WarningsPanel></WarningsPanel>
                </aside>
                <aside className="absolute right-0 top-1 z-[2] w-full lg:hidden">
                    <MobileWarnings></MobileWarnings>
                </aside>
                <div className="absolute left-2 top-2 z-[2] flex h-[40px] w-[240px] items-center gap-2">
                    <MapSearchForm showStationModal={handleModal}></MapSearchForm>
                    {favouriteStations.length > 0 && (
                        <CommonButton
                            handleClick={() => setShowFavouriteStations(!showFavouriteStations)}
                            color="danger"
                        >
                            {typeof window !== "undefined" && showFavouriteStations ? (
                                <HeartIcon className="size-8 p-1" />
                            ) : (
                                <HeartIconOutline className="size-8 p-1" />
                            )}
                        </CommonButton>
                    )}
                </div>
                <HomepageMap></HomepageMap>
                <section className="fixed bottom-0 z-[2] w-full lg:bottom-0">
                    <ForecastLayer></ForecastLayer>
                </section>
            </main>
        </StationsProvider>
    );
}
