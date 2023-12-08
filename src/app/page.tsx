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
export default function Home() {
    return (
        <StationsProvider>
            <main className="flex flex-col flex-1 relative">
                <HomepageMap></HomepageMap>
            </main>
        </StationsProvider>
    );
}
