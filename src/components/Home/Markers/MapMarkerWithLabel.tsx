import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { DivIconLeafletMarker, DivIconContainer } from "@/components/Common/DivIconMarker";
import DivIconMarker from "@/components/Common/DivIconMarker";
import { LeafletMouseEvent } from "leaflet";

type MapMarkerProps = {
    position: [number, number];
    stationId: number;
    weatherDescription: string;
    assetId: string;
    stationName?: string;
};

export default function MapMarketWithLabel({
    position,
    stationId,
    weatherDescription,
    assetId,
    stationName,
}: Readonly<MapMarkerProps>) {

    const marker: DivIconLeafletMarker = {
        position,
        weatherDescription,
        assetId,
        stationName,
        stationId,
        eventHandlers: {
            click: (ev: LeafletMouseEvent) => {
                return ev.originalEvent.preventDefault();
            },
        },
    };

    const container: DivIconContainer = {
        tagName: "section",
        className: "w-[100px]",
    };


    return (
        <DivIconMarker leafletMarker={marker} container={container}>
            <div 
                className="relative flex h-8 items-center gap-1 rounded-lg bg-primary/80 p-1">
                <div className="w-8 p-1 shrink-0">
                    <BaseWeatherIcon
                        weatherDescriptionText={weatherDescription}
                        assetId={assetId}
                    />
                </div>
                <p className="truncate font-semibold text-white">
                    {stationName}
                </p>
            </div>
        </DivIconMarker>
    );
}