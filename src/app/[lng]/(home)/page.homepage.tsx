"use client";
import { useWarningsProvider } from "@/providers/StationsProvider";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ForecastLayer from "@/components/Home/ForecastLayer";
import WeatherWarningBanner from "@/components/Home/Warnings/WeatherWarningBanner";

const HomepageMap = dynamic(() => import("@/components/Home/HomepageMap"), {
    ssr: false,
});
const LayersMenu = dynamic(() => import("@/components/Home/LayersMenu"), {
    ssr: false,
});

export default function Homepage() {
    const [isMounted, setIsMounted] = useState(false);
    const { warnings } = useWarningsProvider();
    const warningsCount = warnings.reduce((currValue, acc) => {
        currValue += acc.warnings.length;
        return currValue;
    },0);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Ensure consistent server-client output
    }

    return (
        <main className="relative flex flex-1 flex-col">
            <aside 
                className="absolute right-2 top-1 z-[3]"
                id="layersMenu"
            >
                <div className="flex items-center gap-2">
                    <LayersMenu></LayersMenu>
                </div>
            </aside>
            <aside className={`absolute left-0 top-1 z-[2] w-full ${warningsCount === 0 ? "hidden" : ""}`}>
                <WeatherWarningBanner warnings={warnings} />
            </aside>
            <HomepageMap></HomepageMap>
            <section className="fixed bottom-0 z-[2] w-full lg:bottom-0">
                <ForecastLayer></ForecastLayer>
            </section>
        </main>
    );
}
