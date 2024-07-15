import dynamic from "next/dynamic";
import BaseWeatherIcon from "./BaseWeatherIcon";
import { DivIconLeafletMarker, DivIconContainer } from "@/components/Common/DivIconMarker";
const DivIconMarker = dynamic(() => import("@/components/Common/DivIconMarker"), {
    ssr: false,
});
/**
* @todo This is more of a specific Marker with a modal functionality and less a base one.
Refactor might be possible here. https://tzoupy.atlassian.net/browse/FWM-38
*/

type BaseMarkerProps = {
    position: [number, number];
    handleClick?: any;
    stationId: number;
    weatherDescription: string;
    assetId: string;
};

export default function BaseMarker({
    position,
    handleClick,
    stationId,
    weatherDescription,
    assetId,
}: Readonly<BaseMarkerProps>) {
    const marker: DivIconLeafletMarker = {
        position,
        weatherDescription,
        assetId,
        eventHandlers: {
            click: () => {
                return handleClick(stationId);
            },
        },
    };
    const container: DivIconContainer = {
        tagName: "div",
        className: "",
    };

    return (
        <DivIconMarker leafletMarker={marker} container={container}>
            <div className="flex flex-col justify-center items-center">
                <div className="w-[58px]">
                    <BaseWeatherIcon
                        weatherDescriptionText={weatherDescription}
                        assetId={assetId}
                    />
                </div>
            </div>
        </DivIconMarker>
    );
}
