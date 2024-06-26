import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { assetUrl } from "@/helpers/assetsHandling";
import type { GeoJsonObject } from "geojson";

type BaseGeoJsonProps = {
    assetId: string;
    fillColor: string;
    pane?: string;
};

export default function BaseGeoJSON(props: Readonly<BaseGeoJsonProps>) {
    const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
    const geojsonUrl = assetUrl(props.assetId);
    useEffect(() => {
        const fetchGeoJSON = async () => {
            try {
                const response = await fetch(geojsonUrl);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: GeoJsonObject = await response.json();
                setGeoData(data);
            } catch (error) {
                console.error("Error fetching GeoJSON:", error);
            }
        };

        fetchGeoJSON();
    }, []);
    return (
        geoData && <GeoJSON
            data={geoData} 
            pane={props.pane}
            style={{
                color: props.fillColor,
                fillColor: props.fillColor,
                fill: true,
                fillOpacity: 0.4,
                weight: 2,
            }} />
    );
}
