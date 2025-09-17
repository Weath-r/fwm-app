import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { DivIconLeafletMarker, DivIconContainer } from "@/components/Common/DivIconMarker";
import DivIconMarker from "@/components/Common/DivIconMarker";

type MapMarkerProps = {
    position: [number, number];
    handleClick?: (id: number) => void;
    stationId: number;
    weatherDescription: string;
    assetId: string;
    stationName?: string;
};

export default function MapMarketWithLabel({
    position,
    handleClick,
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
            click: () => {
                return false;
            },
        },
    };

    const container: DivIconContainer = {
        tagName: "section",
        className: "w-[100px]",
    };

    const stationContainerClick = (stationId: number) => {
        return handleClick?.(stationId);
    };

    return (
        <DivIconMarker leafletMarker={marker} container={container}>
            <div 
                className="relative flex h-8 items-center gap-1 rounded-lg bg-primary/80 p-1" onClick={() => stationContainerClick(stationId)}>
                <div className="w-8 p-1">
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