'use client';
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { ReactNode } from "react";

export default function BaseMarker({
    position, 
    children,
    handleClick,
    }: {
        position: [number, number],
        children: ReactNode,
        handleClick: any,
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
                  console.log('marker clicked')
                  return handleClick(true);
                },
            }}
        >
            {children}
        </Marker>
    );
}
