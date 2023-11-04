"use client";
import "leaflet/dist/leaflet.css";
import HomepageMap from "@/components/Home/HomepageMap";
import { Provider } from "@/context/stations"

export default function Home() {
    return (
        <Provider>
            <main className="flex flex-col flex-1 relative">
                <HomepageMap></HomepageMap>
            </main>
        </Provider>
    )
}
