import { MapContainer, useMap } from "react-leaflet";
// import configuration from "../../app/appConfig";
import { MapLeafletType } from "@/types";
import { useEffect } from "react";
import { useMapStore } from "@/stores/mapStore";
import * as protomapsL from "protomaps-leaflet";

function MapInitializer() {
    const map = useMap();
    const setMap = useMapStore((state) => state.setMap);

    const URL = "https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt";
    const layer = protomapsL.leafletLayer({ url:URL + "?key=03dc1c138bcded71", flavor: "grayscale", lang: "en" });
    layer.addTo(map);
    useEffect(() => {
        setMap(map);
    }, [map, setMap]);

    return null;
}

export default function BaseMap(props: Readonly<MapLeafletType>) {
    // const attribution =
    //     process.env.NODE_ENV === "development" ? `| App version: ${configuration.appVersion}` : "";
    
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
            <MapInitializer></MapInitializer>
            {/* <TileLayer
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">Mapbox</a> contributors ${attribution}`}
                url="https://api.mapbox.com/styles/v1/virtuosofriend/clobmjbzm013j01qmbjlof6g0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlydHVvc29mcmllbmQiLCJhIjoiY2lwY2lvc3ZjMDAyNnZobm5haDZ1M2VrcSJ9.IGVbY93V5cF7KvEVJnmUTQ"
                detectRetina
            /> */}
            {props.children}
        </MapContainer>
    );
}
