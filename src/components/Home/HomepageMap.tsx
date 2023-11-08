import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import StationsContext from "@/context/stations";
import BaseModal from "@/components/BaseComponents/BaseModal";
import StationModalContent from "@/components/Home/StationModalContent";
const BaseMap = dynamic(() => import("@/components/BaseComponents/BaseMap"), {
    ssr: false,
});
const BaseMarker = dynamic(() => import("@/components/BaseComponents/BaseMarker"), {
      ssr: false,
});
import { CONFIG } from "@/common/mapSettings";

export default function HomepageMap() {
    const zoomLevel = CONFIG.default_zoom_level;
    const defaultCenter = CONFIG.center;
    const maxBounds = CONFIG.bounds;
    const minZoom = CONFIG.minZoom;

    // Create the state for the modal info
    const [activeStation, setActiveStation] = useState(0);
    const providerData = useContext(StationsContext);
    const handleModal = (value:boolean, stationId: number) => {
        providerData.handleModal(value);
        setActiveStation(stationId);
    };
    const isModalOpen = providerData.isStationModalOpen;

    const markers = providerData.stations.map(station => {
        return (
        <BaseMarker
            position={station.location.coordinates.reverse()}
            key={station.id}
            stationId={station.id}
            iconImg={station.accuweather_location.current_weather_description}
            isDay={station.accuweather_location.isDayTime}
            handleClick={handleModal}
        />)
    });

    return (
        <BaseMap
            zoom={zoomLevel}
            center={defaultCenter}
            maxBounds={maxBounds}
            minZoom={minZoom}
        >
            {markers}
            <div className="absolute top-0">
                    <BaseModal
                        isOpen={isModalOpen}
                    >
                        <StationModalContent
                            isOpen={isModalOpen}
                            activeStation={activeStation}
                        ></StationModalContent>
                    </BaseModal>
                </div>
        </BaseMap>
    );
}