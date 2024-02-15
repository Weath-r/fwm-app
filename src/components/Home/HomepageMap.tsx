import dynamic from "next/dynamic";
import { useStationsProvider } from "@/providers/StationsProvider";
import L, { MarkerCluster } from "leaflet";
import { CONFIG } from "@/common/mapSettings";
import { MarkerCustomAttrs } from "@/types/customMarker";
import { assetUrl } from "@/common/assetsHandling";

import { useAppStore } from "@/hooks/useAppStore";
import BaseModal from "@/components/BaseComponents/BaseModal";
import StationModalContent from "@/components/Home/StationModalContent";
import MapControls from "@/components/MapControls/MapControls";
const BaseMap = dynamic(() => import("@/components/BaseComponents/BaseMap"), {
    ssr: false,
});
const BaseMarker = dynamic(() => import("@/components/BaseComponents/BaseMarker"), {
    ssr: false,
});
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), {
    ssr: false,
});

export default function HomepageMap() {
    const zoomLevel = CONFIG.default_zoom_level;
    const defaultCenter = CONFIG.center;
    const maxBounds = CONFIG.bounds;
    const minZoom = CONFIG.minZoom;

    // Create the state for the modal info
    const { setIsStationModalOpen, setActiveStation } = useAppStore();
    const { stations } = useStationsProvider();

    const handleModal = (value: boolean, stationId: number) => {
        setIsStationModalOpen(value);
        setActiveStation(stationId);
    };

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

    const markers = stations.map((station) => {
        return (
            <BaseMarker
                position={station.location.coordinates.reverse()}
                key={station.id}
                stationId={station.id}
                weatherDescription={station.accuweather_location.current_weather_description}
                assetId={station.accuweather_location.weather_condition_icon.asset}
                handleClick={handleModal}
            />
        );
    });

    return (
        <BaseMap zoom={zoomLevel} center={defaultCenter} maxBounds={maxBounds} minZoom={minZoom}>
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
            <div className="absolute bottom-2 left-2 z-[401]">
                <MapControls />
            </div>
            <div className="absolute bottom-0">
                <BaseModal>
                    <StationModalContent />
                </BaseModal>
            </div>
        </BaseMap>
    );
}
