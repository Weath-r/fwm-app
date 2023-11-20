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
    isDay: boolean;
    iconImg: string;
};

export default function BaseMarker({
    position,
    handleClick,
    stationId,
    isDay,
    iconImg,
}: Readonly<BaseMarkerProps>) {
    const marker: DivIconLeafletMarker = {
        position,
        iconImg,
        isDay,
        eventHandlers: {
            click: () => {
                return handleClick(true, stationId);
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
                    <BaseWeatherIcon iconImg={iconImg} isDay={isDay} />
                </div>
            </div>
        </DivIconMarker>
    );
}
