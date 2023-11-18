import dynamic from "next/dynamic";
import BaseWeatherIcon from "./BaseWeatherIcon";
const DivIconMarker = dynamic(
    () => import("@/components/Common/DivIconMarker"),
    {
        ssr: false,
    }
);

export type BaseMarkerProps = {
    position: [number, number];
    handleClick: any;
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
}: BaseMarkerProps) {
    const marker = {
        position,
        eventHandlers: {
            click: () => {
                return handleClick(true, stationId);
            },
        },
    };
    const container = { tagName: "div" };
    return (
        <DivIconMarker marker={marker} container={container}>
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
