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
const MobileWarnings = dynamic(
    () => import("@/components/Warnings/MobileWarnings"),
    {
        ssr: false,
    }
);

export default function Home() {
    return (
        <StationsProvider>
            <main className="relative flex flex-1 flex-col">
                <aside className="hidden lg:inline-block">
                    <WarningsPanel></WarningsPanel>
                </aside>
                <aside className="absolute right-0 top-1 z-[2] w-full lg:hidden">
                    <MobileWarnings></MobileWarnings>
                </aside>
                <HomepageMap></HomepageMap>
            </main>
        </StationsProvider>
    );
}
