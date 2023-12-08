"use client";
import { Marker } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { createPortal } from "react-dom";
import React, { ReactElement, useEffect } from "react";

export type DivIconContainer = {
    tagName: string;
    className?: string;
};

export type DivIconLeafletMarker = {
    position: [number, number];
    eventHandlers: any;
    iconImg: string,
    isDay: boolean,
};

type DivIconMarkerProps = {
    leafletMarker: DivIconLeafletMarker;
    container: DivIconContainer;
    children: ReactElement;
};

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/6e724310e0ed089cf4b8b261b8badf71206ad9e8/types/leaflet/index.d.ts#L75
const DivIconMarker = ({ leafletMarker, container, children }: DivIconMarkerProps) => {
    const { tagName, className } = container;
    const element = L.DomUtil.create(tagName, className);
    const divIcon = new DivIcon({ html: element });
    const portal = createPortal(children, element);
    useEffect(() => {
        return () => {
            L.DomUtil.remove(element);
        };
    });

    const { position, eventHandlers, iconImg, isDay } = leafletMarker;
    return (
        <>
            {portal}
            <Marker
                position={position}
                icon={divIcon}
                eventHandlers={eventHandlers}
                customAttr={{ iconImg, isDay }}
            >
            </Marker>
        </>
    );
};

export default DivIconMarker;
