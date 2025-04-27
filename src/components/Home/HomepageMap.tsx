import { useMarkerStationsClick } from "@/hooks/useMarkerStations";
import { useStationsProvider, useWarningsProvider } from "@/providers/StationsProvider";
import L from "leaflet";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import { useMapStore } from "@/stores/mapStore";
import { MAP_CONFIG, Station } from "@/types";
import { getReversedCoordinates } from "@/utils/weatherDataFormatUtils";
import MapWarningsGeojsonGroup from "./MapWarningsGeojsonGroup";
import StationModalContent from "./Markers/StationModalContent";

const BaseMap = dynamic(() => import("@/components/BaseComponents/BaseMap"), {
    ssr: false,
});
const BaseMarker = dynamic(() => import("@/components/BaseComponents/BaseMarker"), {
    ssr: false,
});
const TemperatureLayer = dynamic(() => import("@/components/Home/Layers/TemperatureLayer"), {
    ssr: false,
});
const WindLayer = dynamic(() => import("@/components/Home/Layers/WindLayer"), {
    ssr: false,
});
const ClusterStationsLayer = dynamic(() => import("@/components/Home/Layers/ClusterStationsLayer"), {
    ssr: false,
});
const BaseDialog = dynamic(() => import("@/components/BaseComponents/BaseDialog"), {
    ssr: false,
});

const getStationsMarkers = function (
    stations: Station[],
    handleModal: (stationId: number) => void,
    handleCloseModal: () => void
) {
    const dialogTitle = (<div className="text-sm font-bold uppercase text-primary">
        Currently outside
    </div>);

    return stations.map((station) => {
        return (
            <BaseDialog
                key={station.id}
                trigger={<BaseMarker
                    key={station.id}
                    position={getReversedCoordinates(station.location.coordinates)}
                    stationId={station.id}
                    weatherDescription={station.currentWeatherDescription}
                    assetId={station.currentWeatherConditionIcon}
                    stationName={station.name}
                />}
                onOpen={() => handleModal(station.id)}
                onClose={() => handleCloseModal()}
                dialogTitle={dialogTitle}
            >
                <StationModalContent/>
            </BaseDialog>
        );
    });
};

export default function HomepageMap() {
    const map = useMapStore((state) => state.map);
    const { stations } = useStationsProvider();
    const { warnings, shouldRenderWarnings } = useWarningsProvider();
    const { handleModal, handleCloseModal } = useMarkerStationsClick();

    useEffect(() => {
        if (map) {
            const stationsToCoordinates = stations.map((station) => {
                return {
                    lat: station.location.coordinates[1],
                    lng: station.location.coordinates[0],
                };
            });
            if (stationsToCoordinates.length > 0) {
                const bounds = L.latLngBounds(stationsToCoordinates);
                map.fitBounds(bounds);
            }
        }
    }, [map]);

    const markers = getStationsMarkers(stations, handleModal, handleCloseModal);

    return (
        <BaseMap
            zoom={MAP_CONFIG.zoom}
            center={MAP_CONFIG.center}
            maxBounds={MAP_CONFIG.maxBounds}
            minZoom={MAP_CONFIG.minZoom}
            maxZoom={MAP_CONFIG.maxZoom}
        >
            <ClusterStationsLayer markers={markers}></ClusterStationsLayer>
            <MapWarningsGeojsonGroup
                groupedWarnings={warnings}
                shouldRender={shouldRenderWarnings}
            ></MapWarningsGeojsonGroup>
            <TemperatureLayer stationsList={stations}></TemperatureLayer>
            <WindLayer></WindLayer>
        </BaseMap>
    );
}
