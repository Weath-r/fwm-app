import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

type BaseMapLibreProps = {
    coordinates: [number, number];
    zoom?: number;
    interactive?: boolean;
    children?: React.ReactNode;
};

export default function BaseMapLibre({
    coordinates,
    zoom = 9,
    children,
    interactive = true,
}: Readonly<BaseMapLibreProps>) {
    return (
        <Map
            initialViewState={{
                longitude: coordinates[0],
                latitude: coordinates[1],
                zoom,
                pitch: 85,
            }}
            interactive={interactive}
            style={{ height: "100dvh" }}
            mapStyle="https://api.maptiler.com/maps/019c27a3-8180-78fe-a365-1ad4fa05798e/style.json?key=TYk3u1G7CnLO2KSx5EAN"
        >
            {children}
        </Map>
    );
}
