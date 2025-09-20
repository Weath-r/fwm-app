import L, { LeafletMouseEvent, Marker } from "leaflet";
import dynamic from "next/dynamic";

import { useState } from "react";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useAppStore } from "@/hooks/useAppStore";
import { useMarkerStationsClick } from "@/hooks/useMarkerStations";
import BaseDialog from "@/components/BaseComponents/BaseDialog";
import { createClusterCustomIcon } from "@/components/Home/Markers/ClusterMarkersContent";
import StationModalContent from "@/components/Home/WeatherModal/StationModalContent";
import { useT } from "@/i18n/client";

const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), {
    ssr: false,
});

type MarkerCustomAttrs = {
    weatherDescription: string;
    assetId: string;
    stationName?: string;
    stationId: number;
};

type RenderStationInClusterProps = {
    station: Marker;
    handleClick: (stationId: number) => void;
    changeView: (view: ModalView) => void;
};

declare module "leaflet" {
    interface MarkerOptions {
        customAttr?: MarkerCustomAttrs;
    }
}

type ModalView = "list" | "stationDetails";

const renderStationInCluster = ({ station, handleClick, changeView }: RenderStationInClusterProps) => {
    if (!station.options.customAttr) return null;
    const { assetId, weatherDescription, stationName, stationId }: MarkerCustomAttrs = station.options.customAttr;
    
    const onStationClick = (stationId: number) => {
        handleClick(stationId);
        changeView("stationDetails");
    };

    const triggerStationModal = (
        <section
            className="flex cursor-pointer items-center gap-3"
            onClick={() => onStationClick(stationId)}
        >
            <div className="size-[32px]">
                <BaseWeatherIcon
                    weatherDescriptionText={weatherDescription}
                    assetId={assetId}
                    className="size-full"
                />
            </div>
            <div 
                className="text-sm font-medium text-primary hover:text-primary/80"
            >
                {stationName}
            </div>
            <ChevronRightIcon className="ml-auto mr-2 size-3"></ChevronRightIcon>
        </section>
    );
    return (triggerStationModal);
};


export default function ClusterGroupLayer({ markers }: { markers: React.ReactNode[] }) {
    const [clusterData, setClusterData] = useState<L.Marker[]>([]);
    const { activeStation } = useAppStore();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { handleModal, handleCloseModal } = useMarkerStationsClick();
    const [currentView, setCurrentView] = useState<ModalView>("list");
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;

    if (markers.length === 0) {
        return null;
    }

    const handleClusterClick = (ev: LeafletMouseEvent) => {
        const markersInCluster: L.Marker[] = ev.layer.getAllChildMarkers();
        setClusterData(markersInCluster);
        setIsModalOpen(true);
    };

    const onCloseDialog = () => {
        setCurrentView("list");
        if (activeStation > 0) {
            return handleCloseModal();
        }
        return null;
    };

    return (
        <>
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
                zoomToBoundsOnClick={false}
                maxClusterRadius={50}
                onClick={handleClusterClick}
            >
                {markers}
            </MarkerClusterGroup>
            <BaseDialog 
                dialogTitle={
                    currentView === "list" 
                        ? <div className="text-sm font-bold uppercase text-primary">
                            {i18n.getFixedT(selectedLanguage, "stationModal")("availableStations")}
                        </div> 
                        : <div className="text-sm font-bold uppercase text-primary">
                            {i18n.getFixedT(selectedLanguage, "stationModal")("currentlyOutside")}
                        </div> 
                }
                onClose={onCloseDialog}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            >
                {currentView === "list" && (
                    <div className="mt-4 max-h-60 overflow-auto">
                        <div className="flex flex-col gap-2">
                            {clusterData.map((marker, index) => (
                                <div 
                                    key={index} 
                                    className="border-b border-secondary/90 py-1 text-primary">
                                    {renderStationInCluster({ 
                                        station: marker,
                                        handleClick: handleModal,
                                        changeView: setCurrentView,
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>)}
                {currentView === "stationDetails" && (
                    <StationModalContent />
                )}
            </BaseDialog>
        </>
    );
}