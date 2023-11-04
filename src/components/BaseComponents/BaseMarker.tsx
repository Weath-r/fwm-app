'use client';
import DivIconMarker from "@/common/DivIconMarker";
import BaseWeatherIcon from "./BaseWeatherIcon";

export default function BaseMarker({
    position, 
    handleClick,
    stationId,
    stationName,
    isDay,
    iconImg,
    }: {
        position: [number, number],
        handleClick: any,
        stationId: number,
        stationName: String,
        isDay: boolean,
        iconImg: String,
    }) {

    const marker = {position, eventHandlers: {
        click: () => {
            return handleClick(true, stationId)
        }
    }};
    const container = { tagName: "div" };
    return (
        <DivIconMarker 
            marker={marker} 
            container={container}
        >
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
