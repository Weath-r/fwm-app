"use client";
import "leaflet/dist/leaflet.css";
import { StationsProvider } from "@/providers/StationsProvider";
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
export default function Home() {
    return (
        <StationsProvider>
            <main className="flex flex-col flex-1 relative">
                <WarningsPanel></WarningsPanel>
                <HomepageMap></HomepageMap>
            </main>
        </StationsProvider>
    );
}
