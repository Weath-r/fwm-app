import { useEffect } from "react";
import L from "leaflet";
import "leaflet-velocity/dist/leaflet-velocity.min.css";
import "leaflet-velocity";
import { useForecastLayerStore } from "@/stores/forecastLayerStore";
import { useMap } from "react-leaflet/hooks";

const colorScale = [
    "#005246",
    "#c5fcef",
    "#e9c4c3",
    "#ffe3f3",
    "#fe85ab",
    "#ff9aff"
];

const FORECAST_PANE = "windForecastGfs";
const myFeaturesMap = new L.FeatureGroup();
const velocityLayer = L.velocityLayer({
    displayValues: false,
    displayOptions: {
        velocityType: "Wind",
        displayPosition: "bottomleft",
        displayEmptyString: "No wind data",
        speedUnit: "k/h",
        showCardinal: true,
        angleConvention: "meteo",
    },
    data: [],
    maxVelocity: 15,
    minVelocity: 0,
    velocityScale: 0.005,
    opacity: 0.87,
    colorScale,
    lineWidth: 1.4,
    paneName: FORECAST_PANE,
});

export default function WindLayer() {
    const { forecastData, activeForecastHour } = useForecastLayerStore();
    const map = useMap();

    useEffect(() => {
        if (forecastData) {
            const mapPanes = map.getPanes();
            if (myFeaturesMap.getLayers().length > 0 ) {
                velocityLayer.setData(forecastData[activeForecastHour]);
            } else {
                velocityLayer.setData(forecastData[activeForecastHour]);
                myFeaturesMap.addLayer(velocityLayer);
            }
            if (map && !map.hasLayer(myFeaturesMap)) {
                map.addLayer(myFeaturesMap);
                mapPanes[FORECAST_PANE].style.pointerEvents = "none";
                myFeaturesMap.bringToBack();
            }
        }
    }, [forecastData, activeForecastHour]);

    return null;
}