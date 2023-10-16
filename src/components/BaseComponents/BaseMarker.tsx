'use client';
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { ReactNode } from "react";

export default function BaseMarker({
    position, 
    children,
    handleClick,
    stationId,
    }: {
        position: [number, number],
        children: ReactNode,
        handleClick: any,
        stationId: number,
    }) {
    return (
        <Marker
            position={position}
            icon={
                new Icon({
                    iconUrl: "markers/sunny.png",
                    iconSize: [32, 32],
                })
            }
            eventHandlers={{
                click: () => {
                  return handleClick(true, stationId);
                },
            }}
        >
            {children}
        </Marker>
    );
}
