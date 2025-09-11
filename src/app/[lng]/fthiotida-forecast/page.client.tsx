"use client";
import dynamic from "next/dynamic";

const FthiotidaForecastsPage = dynamic(
    () => import("@/components/FthiotidaForecasts/FthiotidaForecastsPage"),
    {
        ssr: false,
    }
);

export default function FthiotidaForecastClientPage() {
    return (
        <main className="relative flex flex-1 flex-col">
            <FthiotidaForecastsPage></FthiotidaForecastsPage>
        </main>
    );
}
