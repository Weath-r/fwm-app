import { useStationsProvider, useWarningsProvider } from "@/providers/StationsProvider";
import L from "leaflet";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useT } from "@/i18n/client";

import { useMapStore } from "@/stores/mapStore";
import { MAP_CONFIG, Station, StationParamsUrlProp } from "@/types";
import { getReversedCoordinates } from "@/utils/weatherDataFormatUtils";
import MapWarningsGeojsonGroup from "./MapWarningsGeojsonGroup";
import MapMarketWithLabel from "./Markers/MapMarkerWithLabel";
import StationLink from "@/components/Common/StationLink";

const BaseMap = dynamic(() => import("@/components/BaseComponents/BaseMap"), {
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


const getStationsMarkers = function (
    stations: Station[],
    selectedLanguage: string
) {
    
    const queryParams: StationParamsUrlProp[] = [
        { "isForecastEnabled": "true" }
    ];

    return stations.map((station) => {
        return (
            <StationLink
                key={station.id}
                pageName="live-weather-conditions"
                lang={selectedLanguage}
                stationId={station.id}
                stationName={station.name}
                paramsQuery={queryParams}
            >
                <MapMarketWithLabel
                    position={getReversedCoordinates(station.location.coordinates)}
                    stationId={station.id}
                    weatherDescription={station.currentWeatherDescription}
                    assetId={station.currentWeatherConditionIcon}
                    stationName={station.name}
                />
            </StationLink>
        );
    });
};

export default function HomepageMap() {
    const map = useMapStore((state) => state.map);
    const { stations } = useStationsProvider();
    const { warnings, shouldRenderWarnings } = useWarningsProvider();

    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;

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

    const markers = getStationsMarkers(stations, selectedLanguage);

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
