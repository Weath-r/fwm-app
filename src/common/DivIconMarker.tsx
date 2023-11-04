import { Marker, MarkerProps } from "react-leaflet";
import { DivIcon } from "leaflet";
import { createPortal } from "react-dom";
import L from "leaflet";
import React, { useEffect } from "react";

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/6e724310e0ed089cf4b8b261b8badf71206ad9e8/types/leaflet/index.d.ts#L75
type ContainerProps = {
    tagName: string;
    className?: string;
    container?: HTMLElement;
};

type DivIconMarkerProps = { marker: MarkerProps } & {
    container: ContainerProps;
};
const DivIconMarker = ({
    marker,
    container,
    children,
}: any) => {
const { tagName, className } = container;
const element = L.DomUtil.create(tagName, className);
const divIcon = new DivIcon({ html: element });
const portal = createPortal(children, element);
    useEffect(() => {
        return () => {
            L.DomUtil.remove(element);
        };
    });

    const { position, eventHandlers } = marker;
    return (
        <>
            {portal}
        <Marker
            position={position}
            icon={divIcon}
            eventHandlers={eventHandlers}
        >
        </Marker>
        </>
    );
};
export default DivIconMarker;