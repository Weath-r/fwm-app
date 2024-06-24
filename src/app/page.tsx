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
            <main className="flex flex-col flex-1 relative">
                <aside className="hidden lg:inline-block">
                    <WarningsPanel></WarningsPanel>
                </aside>
                <aside className="absolute z-[402] top-0 right-0 w-full lg:hidden">
                    <MobileWarnings></MobileWarnings>
                </aside>
                <HomepageMap></HomepageMap>
            </main>
        </StationsProvider>
    );
}
