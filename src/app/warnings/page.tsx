"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const WarningsPage = dynamic(
    () => import("@/components/Warnings/WarningsPage"),
    {
        ssr: false,
    }
);

export default function Warnings() {
    return (
        <main className="flex flex-col flex-1 relative">
            <WarningsPage></WarningsPage>
        </main>
    );
}
