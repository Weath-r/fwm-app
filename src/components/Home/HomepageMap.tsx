import dynamic from "next/dynamic";
import { useStationsProvider, useWarningsProvider } from "@/providers/StationsProvider";
import L, { MarkerCluster } from "leaflet";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { assetUrl } from "@/helpers/assetsHandling";

import { useAppStore } from "@/hooks/useAppStore";
import BaseModal from "@/components/BaseComponents/BaseModal";
import StationModalContent from "@/components/Home/StationModalContent";
import MapControls from "@/components/MapControls/MapControls";
import MapSearchForm from "@/components/Home/SearchForm/MapSearchForm";
import MapWarningsGeojsonGroup from "./MapWarningsGeojsonGroup";
import { getReversedCoordinates } from "@/utils/weatherDataFormatUtils";
import { MAP_CONFIG } from "@/types";
const BaseMap = dynamic(() => import("@/components/BaseComponents/BaseMap"), {
    ssr: false,
});
const BaseMarker = dynamic(() => import("@/components/BaseComponents/BaseMarker"), {
    ssr: false,
});
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), {
    ssr: false,
});


type MarkerCustomAttrs = {
    weatherDescription: string;
    assetId: string;
};

declare module "leaflet" {
    interface MarkerOptions {
        customAttr?: MarkerCustomAttrs;
    }
}

const createClusterCustomIcon = function (cluster: MarkerCluster) {
    const markersInCluster: L.Marker[] = cluster.getAllChildMarkers();
    const iconsOfCluster: string[] = [];
    markersInCluster.forEach((element) => {
        if (element.options.customAttr) {
            const { assetId }: MarkerCustomAttrs = element.options.customAttr;
            const renderImg = assetUrl(assetId);
            iconsOfCluster.push(renderImg);
        }
    });
    return L.divIcon({
        html: `<div class="flex justify-center items-center">
            <div class="w-[58px] h-[58px] relative">
                <img src="${iconsOfCluster[0]}" class="w-full h-full" alt="Weather Icon" />
                <div class="absolute bottom-0 right-0 bg-primary rounded px-1">
                <p class="text-white">
                    ${cluster.getChildCount()}
                </p>
            </div>
            </div>
        </div>`,
        className: "",
        iconSize: L.point(33, 33, true),
    });
};

export default function HomepageMap() {
    const { setIsStationModalOpen, setActiveStation, isStationModalOpen } = useAppStore();
    const { stations } = useStationsProvider();
    const { warnings, shouldRenderWarnings } = useWarningsProvider();
    const [searchStationParam, setSearchStationParam] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const handleModal = (stationId: number) => {
        window.history.pushState(null, "", `?station=${stationId}`);
        setSearchStationParam(`${stationId}`);
    };

    const handleCloseModal = () => {
        window.history.pushState(null, "", "/");
        return setSearchStationParam(null);
    };

    useEffect(() => {
        const activeStationParams = searchParams.get("station");
        setSearchStationParam(activeStationParams);
    }, []);

    useEffect(() => {
        if(searchStationParam) {
            setIsStationModalOpen(true);
            setActiveStation(+searchStationParam);
        } else {
            setIsStationModalOpen(false);
            setActiveStation(0);
        }
    }, [searchStationParam]);
    
    const markers = stations.map((station) => {
        return (
            <BaseMarker
                key={station.id}
                position={getReversedCoordinates(station.location.coordinates)}
                stationId={station.id}
                weatherDescription={station.currentWeatherDescription}
                assetId={station.currentWeatherConditionIcon}
                handleClick={handleModal}
            />
        );
    });

    return (
        <BaseMap
            zoom={MAP_CONFIG.zoom}
            center={MAP_CONFIG.center}
            maxBounds={MAP_CONFIG.maxBounds}
            minZoom={MAP_CONFIG.minZoom}
            maxZoom={MAP_CONFIG.maxZoom}
        >
            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
                polygonOptions={{
                    fillColor: "#F5F0ED",
                    color: "#3D5361",
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.5,
                }}
                showCoverageOnHover={false}
            >
                {markers}
            </MarkerClusterGroup>
            <MapWarningsGeojsonGroup
                groupedWarnings={warnings}
                shouldRender={shouldRenderWarnings}
            ></MapWarningsGeojsonGroup>
            <div className="absolute bottom-2 left-2 z-[2]">
                <MapControls />
            </div>
            <div 
                id="selectComponentMap" 
                className="absolute left-2 top-2 z-[2] h-[40px] w-[240px]"
            >
                <MapSearchForm 
                    handleSearchResult={handleModal}
                ></MapSearchForm>
            </div>
            <div className="absolute bottom-0">
                <BaseModal
                    handleCloseModal={handleCloseModal}
                    isModalOpen={isStationModalOpen}
                    dialogClass="max-w-sm mx-2 lg:max-w-xl"
                >
                    <StationModalContent />
                </BaseModal>
            </div>
        </BaseMap>
    );
}
