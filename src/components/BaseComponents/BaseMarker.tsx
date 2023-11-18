import dynamic from "next/dynamic";
import BaseWeatherIcon from "./BaseWeatherIcon";
import { DivIconLeafletMarker, DivIconContainer } from "@/components/Common/DivIconMarker";
const DivIconMarker = dynamic(() => import("@/components/Common/DivIconMarker"), {
    ssr: false,
});

type BaseMarkerProps = {
    position: [number, number];
    handleClick: (selected: boolean, stationId: number) => void;
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
                {/* <div className="bg-white p-1 opacity-75 rounded border-solid border truncate overflow-hidden font-medium color-black max-w-[92px] text-black">
                    {stationName}
                </div> */}
            </div>
        </DivIconMarker>
    );
}
