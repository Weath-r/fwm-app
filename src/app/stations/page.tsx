"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const StationsPage = dynamic(
    () => import("@/components/Stations/StationsPage"),
    {
        ssr: false,
    }
);

export default function Stations() {
    return (
        <main className="flex flex-col flex-1 relative">
            <StationsPage></StationsPage>
        </main>
    );
}
