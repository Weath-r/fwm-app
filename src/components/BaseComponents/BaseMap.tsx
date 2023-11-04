import { MapContainer, TileLayer } from "react-leaflet";
import { CONFIG } from "@/common/mapSettings";
import { PropsWithChildren } from "react";

export default function BaseMap(props: PropsWithChildren) {
    const zoomLevel = CONFIG.default_zoom_level;
    const defaultCenter = CONFIG.center;
    return (
        <MapContainer
            center={defaultCenter}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            className="w-full h-screen map"
        >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Mapbox</a> contributors'
        url="https://api.mapbox.com/styles/v1/virtuosofriend/clobmjbzm013j01qmbjlof6g0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlydHVvc29mcmllbmQiLCJhIjoiY2lwY2lvc3ZjMDAyNnZobm5haDZ1M2VrcSJ9.IGVbY93V5cF7KvEVJnmUTQ"
        />
        {props.children}
    </MapContainer>
    );
}