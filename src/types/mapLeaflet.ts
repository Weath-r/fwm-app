export type MapLeafletType = {
    children: JSX.Element | JSX.Element[];
    center: [number, number];
    zoom: number;
    maxBounds: [[number, number], [number, number]];
    minZoom: number;
};
