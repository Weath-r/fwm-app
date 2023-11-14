"use client";
import "leaflet/dist/leaflet.css";
import HomepageMap from "@/components/Home/HomepageMap";
import { StationsProvider } from "@/providers/StationsProvider";

export default function Home() {
    return (
        <StationsProvider>
            <main className="flex flex-col flex-1 relative">
                <HomepageMap></HomepageMap>
            </main>
        </StationsProvider>
    );
}
