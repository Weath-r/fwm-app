"use client";
import "leaflet/dist/leaflet.css";
import { StationsProvider } from "@/providers/StationsProvider";
import { useMarkerStationsClick } from "@/hooks/useMarkerStations";
import dynamic from "next/dynamic";

const HomepageMap = dynamic(
    () => import("@/components/Home/HomepageMap"),
    {
        ssr: false,
    }
);
const WarningsPanel = dynamic(
    () => import("@/components/Warnings/WarningsPanel"),
    {
        ssr: false,
    }
);
const MobileWarnings = dynamic(
    () => import("@/components/Warnings/MobileWarnings"),
    {
        ssr: false,
    }
);
const MapSearchForm = dynamic(
    () => import("@/components/Home/SearchForm/MapSearchForm"),
    {
        ssr: false,
    }
);
import ForecastLayer from "@/components/Home/ForecastLayer";

export default function Home() {
    const { handleModal } = useMarkerStationsClick();

    return (
        <StationsProvider>
            <main className="relative flex flex-1 flex-col">
                <aside className="hidden lg:inline-block">
                    <WarningsPanel></WarningsPanel>
                </aside>
                <aside className="absolute right-0 top-1 z-[2] w-full lg:hidden">
                    <MobileWarnings></MobileWarnings>
                </aside>
                <div className="absolute left-2 top-2 z-[2] h-[40px] w-[240px]">
                    <MapSearchForm 
                        handleSearchResult={handleModal}
                    ></MapSearchForm>
                </div>
                <HomepageMap></HomepageMap>
                <section className="fixed bottom-0 z-[2] w-full lg:bottom-0">
                    <ForecastLayer></ForecastLayer>
                </section>
            </main>
        </StationsProvider>
    );
}
