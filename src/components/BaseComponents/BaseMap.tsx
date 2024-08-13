import { MapContainer, TileLayer } from "react-leaflet";
import configuration from "../../app/appConfig";
import { MapLeafletType } from "@/types";

export default function BaseMap(props: Readonly<MapLeafletType>) {
    const attribution =
        process.env.NODE_ENV === "development" ? `| App version: ${configuration.appVersion}` : "";
    
    return (
        <MapContainer
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={true}
            maxBounds={props.maxBounds}
            maxBoundsViscosity={1}
            minZoom={props.minZoom}
            maxZoom={props.maxZoom}
            wheelDebounceTime={100}
            zoomControl={false}
            className="map h-screen w-full"
        >
            <TileLayer
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">Mapbox</a> contributors ${attribution}`}
                url="https://api.mapbox.com/styles/v1/virtuosofriend/clobmjbzm013j01qmbjlof6g0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlydHVvc29mcmllbmQiLCJhIjoiY2lwY2lvc3ZjMDAyNnZobm5haDZ1M2VrcSJ9.IGVbY93V5cF7KvEVJnmUTQ"
            />
            {props.children}
        </MapContainer>
    );
}
