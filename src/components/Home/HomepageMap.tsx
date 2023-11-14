import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useStationsProvider } from "@/providers/StationsProvider";
import { CONFIG } from "@/common/mapSettings";
import BaseModal from "@/components/BaseComponents/BaseModal";
import StationModalContent from "@/components/Home/StationModalContent";
import MapControls from "@/components/MapControls/MapControls";
const BaseMap = dynamic(() => import("@/components/BaseComponents/BaseMap"), {
    ssr: false,
});
const BaseMarker = dynamic(
    () => import("@/components/BaseComponents/BaseMarker"),
    {
        ssr: false,
    }
);

export default function HomepageMap() {
    const zoomLevel = CONFIG.default_zoom_level;
    const defaultCenter = CONFIG.center;
    const maxBounds = CONFIG.bounds;
    const minZoom = CONFIG.minZoom;

    // Create the state for the modal info
    const [activeStation, setActiveStation] = useState(0);
    const [markers, setMarkers] = useState<any>([]);
    const stationsProvider = useStationsProvider();
    const handleModal = (value: boolean, stationId: number) => {
        stationsProvider.handleModal(value);
        setActiveStation(stationId);
    };
    const isModalOpen = stationsProvider.isStationModalOpen;

    useMemo(() => {
        setMarkers(
            stationsProvider.stations.map((station) => {
                return (
                    <BaseMarker
                        position={station.location.coordinates.reverse()}
                        key={station.id}
                        stationId={station.id}
                        iconImg={
                            station.accuweather_location
                                .current_weather_description
                        }
                        isDay={station.accuweather_location.isDayTime}
                        handleClick={handleModal}
                    />
                );
            })
        );
    }, [stationsProvider.stations]);

    return (
        <BaseMap
            zoom={zoomLevel}
            center={defaultCenter}
            maxBounds={maxBounds}
            minZoom={minZoom}
        >
            {markers}
            <div className="absolute bottom-2 left-2 z-[401]">
                <MapControls />
            </div>
            <div className="absolute bottom-0">
                <BaseModal isOpen={isModalOpen}>
                    <StationModalContent
                        isOpen={isModalOpen}
                        activeStation={activeStation}
                    ></StationModalContent>
                </BaseModal>
            </div>
        </BaseMap>
    );
}
