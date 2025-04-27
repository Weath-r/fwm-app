import L from "leaflet";
import { ReactNode } from "react";

type CommonMapSettings = {
    center: [number, number];
    maxBounds: [[number, number], [number, number]];
    minZoom: number;
    maxZoom: number;
    zoom: number;
};

export type MapMarker = {
    coordinates: L.LatLng;
    value: number;
};

export type MapLeafletType = CommonMapSettings & {
    children: JSX.Element | JSX.Element[] | ReactNode;
};

export type MapConfig = CommonMapSettings & {
    default_language: string;
};

export const MAP_CONFIG: MapConfig = {
    center: [38.900356, 22.431935],
    default_language: "en",
    zoom: 10,
    maxBounds: [
        [37.146723, 20.728039],
        [40.105765, 25.448018]
    ],
    minZoom: 9,
    maxZoom: 12,
};

export default MAP_CONFIG;
