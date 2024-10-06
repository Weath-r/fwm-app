import { useEffect } from "react";
import L, { Map } from "leaflet";
import "leaflet-velocity/dist/leaflet-velocity.min.css";
import "leaflet-velocity";

type WindLayerProps = {
    map: Map;
    forecastData: {
        data: number[],
        header: {
            category: string;
        };
    };
};

const colorScale = [
    "#005246",
    "#00aa8e",
    "#fc8c78",
    "#b01e64",
    "#ad14f5"
];

const FORECAST_PANE = "windForecastGfs";

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
    opacity: 0.67,
    colorScale,
    lineWidth: 1.4,
    paneName: FORECAST_PANE,
});

export default function WindLayer(props: WindLayerProps) {

    useEffect(() => {
        if (props.forecastData) {
            const mapPanes = props.map.getPanes();
            if (!mapPanes[FORECAST_PANE]) {
                velocityLayer.setData(props.forecastData);
                velocityLayer.addTo(props.map);
            } else {
                velocityLayer.setData(props.forecastData);
            }
        }
    }, [props.forecastData]);

    return (<span></span>);
}