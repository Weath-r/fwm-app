import L, { LeafletMouseEvent, Marker } from "leaflet";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useT } from "@/i18n/client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { StationParamsUrlProp } from "@/types";

import { createClusterCustomIcon } from "@/components/Home/Markers/ClusterMarkersContent";
import { Dialog, DialogTrigger, DialogContent } from "@/components/Common/CommonDialog";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import StationLink from "@/components/Common/StationLink";

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
    selectedLanguage: string;
};

declare module "leaflet" {
    interface MarkerOptions {
        customAttr?: MarkerCustomAttrs;
    }
}

const renderStationInCluster = ({ station, selectedLanguage }: RenderStationInClusterProps) => {
    if (!station.options.customAttr) return null;
    const { assetId, weatherDescription, stationName, stationId }: MarkerCustomAttrs = station.options.customAttr;
    const queryParams: StationParamsUrlProp[] = [{ "isForecastEnabled": "true" }];

    const triggerStationModal = (
        <StationLink
            pageName="live-weather-conditions"
            lang={selectedLanguage}
            stationId={stationId}
            stationName={stationName || ""}
            paramsQuery={queryParams}
        >
            <section
                className="flex cursor-pointer items-center gap-3"
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
        </StationLink>

    );
    return (triggerStationModal);
};


export default function ClusterGroupLayer({ markers }: { markers: React.ReactNode[] }) {
    const [clusterData, setClusterData] = useState<L.Marker[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

    const dialogTitle = (<span className="text-sm font-bold uppercase text-primary">
        {i18n.getFixedT(selectedLanguage, "stationModal")("availableStations")}
    </span>);

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
            <Dialog
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            >
                <DialogTrigger className="sr-only">Dialog trigger</DialogTrigger>
                <DialogContent
                    dialogTitle={dialogTitle}
                    closeModalButton={false}
                >
                    <div className="mt-4 max-h-60 overflow-auto">
                        <div className="flex flex-col gap-2">
                            {clusterData.map((marker, index) => (
                                <div 
                                    key={index} 
                                    className="border-b border-secondary/90 py-1 text-primary">
                                    {renderStationInCluster({ 
                                        station: marker,
                                        selectedLanguage,
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}