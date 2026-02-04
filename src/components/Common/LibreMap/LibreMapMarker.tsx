import { Marker } from "react-map-gl/maplibre";

type LibreMapMarkerProps = {
    lon: number;
    lat: number;
    children?: React.ReactNode;
};

export default function LibreMapMarker({ lon, lat, children }: Readonly<LibreMapMarkerProps>) {
    return (
        (children && (
            <Marker longitude={lon} latitude={lat}>
                {children}
            </Marker>
        )) || <Marker longitude={lon} latitude={lat} />
    );
}
