import * as d3 from "d3";
import { useEffect, useState } from "react";
import L, { GeoJSON } from "leaflet";
import { useMap } from "react-leaflet/hooks";
import { 
    applyAltitudeCorrection,
    createElevationVariogram,
    predictKriging,
    trainKriging
} from "@/utils/gisUtils";
import { convertCelciusKelvin } from "@/utils/mathUtils";
import { TemperatureColorList } from "@/constants/Colors";
import { rgbToRgba } from "@/utils/colorManipulation";
import { createColorGradient } from "@/utils/d3Utils";
import { useForecastLayerStore } from "@/stores/forecastLayerStore";
import { useMapStore } from "@/stores/mapStore";
import { MapMarker, TemperatureLayerData, Station, Variogram } from "@/types";

const BBOX = {
    topLatitude: 42,    // end for Y
    bottomLatitude: 34, // start for Y
    leftLongitude: 19, // start for X
    rightLongitude: 28, // end for X
};

const STEP = 0.5;
const MIN_TEMP = -20;
const MAX_TEMP = 46;

const myFeaturesMap = new L.FeatureGroup();

export default function TemperatureLayer({ stationsList }: { stationsList: Station[]}) {
    const [tempData, setTempData] = useState<TemperatureLayerData[]>([]);
    const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection | null>(null);
    const [variogram, setVariogram] = useState<Variogram | null>(null);
    const { forecastData, activeForecastHour } = useForecastLayerStore();

    const map = useMap();
    const { addMarker } = useMapStore();

    const colorGradient = createColorGradient({
        minTemp: MIN_TEMP,
        maxTemp: MAX_TEMP,
        colorsList: TemperatureColorList,   
    });

    useEffect(() => {
        if (stationsList.length === 0) return;
        const knownLocations = stationsList.map(station => ({
            lat: station.location.coordinates[1],
            lng: station.location.coordinates[0],
            elevation: station.elevation,
        }));
        const elevationVariogram = createElevationVariogram(knownLocations);
        setVariogram(elevationVariogram);
    }, [stationsList]);

    useEffect(() => {
        if (!forecastData || !activeForecastHour || !variogram) return;
        
        const result = [];
        let tempIndex = 0;
        const data = forecastData[activeForecastHour];
        for(let y = BBOX.bottomLatitude; y <= BBOX.topLatitude; y += STEP) {
            for(let x = BBOX.leftLongitude; x <= BBOX.rightLongitude; x += STEP) {
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
        setTempData(result);
    },[variogram,forecastData,activeForecastHour]);
    
    useEffect(() => {
        if (!tempData.length) return;
        
        // Prepare data for kriging
        const lons = tempData.map(d => d.lng);
        const lats = tempData.map(d => d.lat);
        const temps = tempData.map(d => applyAltitudeCorrection(d.temp, d.elevation ?? 0));

        // Perform kriging interpolation
        const variogram = trainKriging({ values: temps, lons, lats });

        // Define the grid
        const gridSize = 0.1;
        const xgrid = d3.range(BBOX.leftLongitude, BBOX.rightLongitude, gridSize);
        const ygrid = d3.range(BBOX.bottomLatitude, BBOX.topLatitude, gridSize);

        // Create the grid for kriging predictions
        const zgrid = [];
        for (let i = 0; i < ygrid.length; i++) {
            const row = [];
            for (let j = 0; j < xgrid.length; j++) {
                const z = predictKriging({ x:xgrid[j], y: ygrid[i], variogram });
                row.push(z);
            }
            zgrid.push(row);
        }

        // Convert the kriging grid to GeoJSON
        const contours = d3.contours()
            .size([xgrid.length, ygrid.length])
            .thresholds(d3.range(MIN_TEMP, MAX_TEMP, 1))
            (d3.merge(zgrid));

        const geojson: GeoJSON.FeatureCollection = {
            type: "FeatureCollection",
            features: contours.map(contour => ({
                type: "Feature",
                geometry: {
                    type: "MultiPolygon",
                    coordinates: contour.coordinates.map(polygon => polygon.map(ring => ring.map(point => {
                        const lon = BBOX.leftLongitude + point[0] * gridSize;
                        const lat = BBOX.bottomLatitude + point[1] * gridSize;
                        return [lon, lat];
                    }))),
                },
                properties: {
                    value: contour.value,
                    color: colorGradient(contour.value),
                },
            })),
        };

        setGeojson(geojson);
    }, [tempData]);

    useEffect(() => {
        if (!geojson) return;

        const geojsonLayer  = L.geoJson(geojson, {
            style: feature => {
                const alpha = 0.03;
                const fillColor = rgbToRgba(colorGradient(feature?.properties.value), alpha);
                return {
                    fillColor,
                    fillOpacity: .9,
                    stroke: false,
                    color: "black",
                    weight: 0.2,
                    opacity: 0.1,
                };
            },
            onEachFeature(feature, layer) {
                layer.on("click", function(ev){
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

        if (myFeaturesMap.getLayers().length > 0 ) {
            myFeaturesMap.clearLayers();
            myFeaturesMap.addLayer(geojsonLayer);

        } else {
            myFeaturesMap.addLayer(geojsonLayer);
        }

        if (map && !map.hasLayer(myFeaturesMap)) {
            map.addLayer(myFeaturesMap);
        }
    },[geojson]);

    return null;
}