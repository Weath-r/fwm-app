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
        <main className="relative flex flex-1 flex-col">
            <StationsPage></StationsPage>
        </main>
    );
}
