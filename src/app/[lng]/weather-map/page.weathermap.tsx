"use client";
import { useWarningsProvider } from "@/providers/StationsProvider";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import ForecastLayer from "@/components/WeatherMap/ForecastLayer";
import WeatherWarningBanner from "@/components/WeatherMap/Warnings/WeatherWarningBanner";
import { WarningHazard, WarningLevel } from "@/types";

type WeatherMapPageProps = {
    hazards: WarningHazard[];
    warningLevels: WarningLevel[];
};

const StationsMap = dynamic(() => import("@/components/WeatherMap/StationsMap"), {
    ssr: false,
});
const LayersMenu = dynamic(() => import("@/components/WeatherMap/LayersMenu"), {
    ssr: false,
});

export default function WeatherMapPage({ hazards, warningLevels }: WeatherMapPageProps) {
    const { warnings } = useWarningsProvider();
    const warningsCount = warnings.reduce((currValue, acc) => {
        currValue += acc.warnings.length;
        return currValue;
    }, 0);

    return (
        <main className="relative">
            <aside className="absolute right-2 top-1 z-[3]" id="layersMenu">
                <div className="flex items-center gap-2">
                    <LayersMenu></LayersMenu>
                </div>
            </aside>
            <aside
                className={`absolute left-0 top-1 z-[2] w-full ${warningsCount === 0 ? "hidden" : ""}`}
            >
                <WeatherWarningBanner
                    warnings={warnings}
                    hazards={hazards}
                    warningLevels={warningLevels}
                />
            </aside>
            <StationsMap></StationsMap>
            <section className="fixed bottom-0 z-[2] w-full lg:bottom-0">
                <ForecastLayer></ForecastLayer>
            </section>
        </main>
    );
}
