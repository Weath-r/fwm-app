import * as d3 from "d3";
import { useEffect, useMemo } from "react";
import L, { GeoJSON } from "leaflet";
import { useMap } from "react-leaflet/hooks";
import {
    applyAltitudeCorrection,
    createElevationVariogram,
    predictKriging,
    trainKriging,
} from "@/utils/gisUtils";
import { convertCelciusKelvin } from "@/utils/mathUtils";
import { TemperatureColorList } from "@/constants/Colors";
import { createColorGradient, ColorToRgb } from "@/utils/d3Utils";
import { useForecastLayerStore } from "@/stores/forecastLayerStore";
import { useMapStore } from "@/stores/mapStore";
import { MapMarker, TemperatureLayerData, Station } from "@/types";

const BBOX = {
    topLatitude: 42, // end for Y
    bottomLatitude: 34, // start for Y
    leftLongitude: 19, // start for X
    rightLongitude: 28, // end for X
};

const STEP = 0.5;
const MIN_TEMP = -20;
const MAX_TEMP = 46;

const myFeaturesMap = new L.FeatureGroup();

export default function TemperatureLayer({ stationsList }: { stationsList: Station[] }) {
    const { forecastData, activeForecastHour } = useForecastLayerStore();

    const map = useMap();
    const { addMarker } = useMapStore();

    const colorGradient = createColorGradient({
        minTemp: MIN_TEMP,
        maxTemp: MAX_TEMP,
        colorsList: TemperatureColorList,
    });

    const variogram = useMemo(() => {
        if (stationsList.length === 0) {
            return null;
        }

        const knownLocations = stationsList.map((station) => ({
            lat: station.location.coordinates[1],
            lng: station.location.coordinates[0],
            elevation: station.elevation,
        }));

        return createElevationVariogram(knownLocations);
    }, [stationsList]);

    const tempData: TemperatureLayerData[] = useMemo(() => {
        if (!forecastData || !activeForecastHour || !variogram) {
            return [];
        }

        const result: TemperatureLayerData[] = [];
        let tempIndex = 0;
        const data = forecastData[activeForecastHour];

        for (let y = BBOX.bottomLatitude; y <= BBOX.topLatitude; y += STEP) {
            for (let x = BBOX.leftLongitude; x <= BBOX.rightLongitude; x += STEP) {
                const estimatedElevation = predictKriging({ x, y, variogram });
                const temp = convertCelciusKelvin(data[0].data[tempIndex]);

                result.push({
                    lat: y,
                    lng: x,
                    temp,
                    elevation: estimatedElevation,
                });

                tempIndex++;
            }
        }

        return result;
    }, [variogram, forecastData, activeForecastHour]);

    const geojson: GeoJSON.FeatureCollection | null = useMemo(() => {
        if (!tempData.length) return null;

        // Prepare data for kriging
        const lons = tempData.map((d) => d.lng);
        const lats = tempData.map((d) => d.lat);
        const temps = tempData.map((d) => applyAltitudeCorrection(d.temp, d.elevation ?? 0));

        // Perform kriging interpolation
        const variogram = trainKriging({ values: temps, lons, lats });

        // Define the grid
        const gridSize = 0.1;
        const xgrid = d3.range(BBOX.leftLongitude, BBOX.rightLongitude, gridSize);
        const ygrid = d3.range(BBOX.bottomLatitude, BBOX.topLatitude, gridSize);

        // Create the grid for kriging predictions
        const zgrid: number[][] = [];
        for (let i = 0; i < ygrid.length; i++) {
            const row: number[] = [];
            for (let j = 0; j < xgrid.length; j++) {
                const z = predictKriging({
                    x: xgrid[j],
                    y: ygrid[i],
                    variogram,
                });
                row.push(z);
            }
            zgrid.push(row);
        }

        // Convert the kriging grid to GeoJSON
        const contours = d3
            .contours()
            .size([xgrid.length, ygrid.length])
            .thresholds(d3.range(MIN_TEMP, MAX_TEMP, 1))(d3.merge(zgrid));

        return {
            type: "FeatureCollection",
            features: contours.map((contour) => ({
                type: "Feature",
                geometry: {
                    type: "MultiPolygon",
                    coordinates: contour.coordinates.map((polygon) =>
                        polygon.map((ring) =>
                            ring.map((point) => {
                                const lon = BBOX.leftLongitude + point[0] * gridSize;
                                const lat = BBOX.bottomLatitude + point[1] * gridSize;
                                return [lon, lat];
                            })
                        )
                    ),
                },
                properties: {
                    value: contour.value,
                    color: ColorToRgb(colorGradient(contour.value)),
                },
            })),
        };
    }, [tempData, colorGradient]);

    useEffect(() => {
        if (!geojson) return;

        const geojsonLayer = L.geoJson(geojson, {
            style: (feature) => {
                const fillColor = ColorToRgb(colorGradient(feature?.properties.value));
                return {
                    fillColor,
                    fillOpacity: 0.04,
                    stroke: false,
                    color: "black",
                    weight: 0.2,
                    opacity: 0.1,
                };
            },
            onEachFeature(feature, layer) {
                layer.on("click", function (ev) {
                    console.log(feature.properties);
                    // add marker in store
                    // map reads that marker
                    // map shows the marker
                    const marker: MapMarker = {
                        coordinates: ev.latlng,
                        value: feature.properties,
                    };
                    addMarker(marker);
                });
            },
        });

        if (myFeaturesMap.getLayers().length > 0) {
            myFeaturesMap.clearLayers();
            myFeaturesMap.addLayer(geojsonLayer);
        } else {
            myFeaturesMap.addLayer(geojsonLayer);
        }

        if (map && !map.hasLayer(myFeaturesMap)) {
            map.addLayer(myFeaturesMap);
        }
    }, [geojson]);

    return null;
}
