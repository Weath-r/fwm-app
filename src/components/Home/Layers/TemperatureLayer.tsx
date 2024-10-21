import * as d3 from "d3";
import kriging from "@sakitam-gis/kriging";
import { useEffect, useState } from "react";
import L, { GeoJSON } from "leaflet";
import { useMap } from "react-leaflet/hooks";
import { interpolateElevation, applyAltitudeCorrection } from "@/utils/gisUtils";
import { TemperatureColorList } from "@/constants/Colors";
import { rgbToRgba } from "@/utils/colorManipulation";
import { useForecastLayerStore } from "@/stores/forecastLayerStore";
import { useMapStore } from "@/stores/mapStore";
import { MapMarker } from "@/types";

type TemperatureData = {
    lat: number;
    lng: number;
    temp: number;
    elevation?: number;
};

const convertCelciusKelvin = (kelvin: number):number => {
    return Math.floor((kelvin - 273.15) * 100) / 100;
};
const BBOX = {
    topLatitude: 42,    // end for Y
    bottomLatitude: 34, // start for Y
    leftLongitude: 19, // start for X
    rightLongitude: 28, // end for X
};
const STEP = 0.5;
const MIN_TEMP = -20;
const MAX_TEMP = 46;
// Known elevation points (lat, lng, elevation)
const knownElevations =
    [{ "lat":38.808962145569694,"lng":22.60381133963037,"elevation":29 },{ "lat":38.93299647147364,"lng":23.038840363032477,"elevation":4 },{ "lat":38.63898629860756,"lng":22.58694522613021,"elevation":440 },{ "lat":38.63446355553543,"lng":22.571537088154145,"elevation":245 },{ "lat":39.12714645861672,"lng":22.300864769328086,"elevation":570 },{ "lat":39.184261822907104,"lng":22.729853415730418,"elevation":81 },{ "lat":38.83347507245935,"lng":21.972869902721555,"elevation":1025 },{ "lat":38.96421276014135,"lng":23.14705821550737,"elevation":55 },{ "lat":38.79201801682194,"lng":22.72203149797491,"elevation":28 },{ "lat":38.91099195906975,"lng":21.80097022589075,"elevation":790 },{ "lat":38.91233292484708,"lng":22.21015016733466,"elevation":100 },{ "lat":39.13691062857171,"lng":22.55968582464658,"elevation":500 },{ "lat":38.91645406308683,"lng":22.426162706450782,"elevation":155 },{ "lat":38.89733848574079,"lng":22.43883429500488,"elevation":114 },{ "lat":38.903466861038766,"lng":22.443635513333618,"elevation":107 },{ "lat":38.900039782141306,"lng":22.435607371769407,"elevation":93 },{ "lat":38.59928631717128,"lng":22.77237267032666,"elevation":133 },{ "lat":38.71199572865575,"lng":23.05016998759541,"elevation":50 },{ "lat":38.94277716723647,"lng":22.118291920893824,"elevation":125 },{ "lat":38.7136684407464,"lng":22.292051888715093,"elevation":1250 },{ "lat":38.9279594409189,"lng":21.91354446892757,"elevation":915 },{ "lat":38.880597778856696,"lng":21.82416752680203,"elevation":1045 },{ "lat":38.7187541954973,"lng":22.48375274741528,"elevation":463 },{ "lat":38.638645420011386,"lng":22.5290316276552,"elevation":350 },{ "lat":38.64209176077,"lng":22.53247142549722,"elevation":392 },{ "lat":39.0557321747533,"lng":22.954984742563397,"elevation":140 },{ "lat":38.89139425235177,"lng":22.782153906525025,"elevation":95 },{ "lat":38.84417083349055,"lng":22.691718041519124,"elevation":9 },{ "lat":39.13576736322463,"lng":22.157001064667583,"elevation":444 },{ "lat":38.921256665512175,"lng":22.618310507527582,"elevation":55 },{ "lat":38.6536650299162,"lng":23.19295136417543,"elevation":30 },{ "lat":38.62172754111097,"lng":23.125094935164753,"elevation":27 },{ "lat":38.76890620014038,"lng":23.318713515343802,"elevation":130 },{ "lat":38.68759998545215,"lng":22.491356046615124,"elevation":303 },{ "lat":38.5958382126704,"lng":22.49523992710462,"elevation":837 },{ "lat":38.653764344570874,"lng":22.99752067150962,"elevation":88 },{ "lat":38.95166107758314,"lng":23.09033488583586,"elevation":10 },{ "lat":38.890920133601725,"lng":21.88264580506302,"elevation":1191 },{ "lat":38.90881980113386,"lng":21.91588890218611,"elevation":824 },{ "lat":38.94261278640974,"lng":21.822923463838947,"elevation":1875 },{ "lat":38.632153,"lng":22.375989,"elevation":874 },{ "lat":39.00492807090282,"lng":22.961179949661073,"elevation":50 },{ "lat":38.89401963929191,"lng":22.58136374053106,"elevation":5 },{ "lat":38.752565714852665,"lng":22.86454598569381,"elevation":7 },{ "lat":39.17860393336869,"lng":22.75880494569728,"elevation":3 },{ "lat":39.072083,"lng":22.552064,"elevation":762 },{ "lat":39.0589931,"lng":22.4756951,"elevation":488 },{ "lat":38.913867215715726,"lng":21.79174761513812,"elevation":998 },{ "lat":38.58344229948593,"lng":22.609786569587193,"elevation":1955 },{ "lat":39.036092,"lng":22.285267,"elevation":485 },{ "lat":38.85829011231118,"lng":22.361389751138177,"elevation":103 },{ "lat":39.28125790343876,"lng":22.819184945515104,"elevation":32 },{ "lat":39.22073212201204,"lng":22.795091750601046,"elevation":25 },{ "lat":39.24232143283757,"lng":22.27129843954816,"elevation":117 },{ "lat":39.029775,"lng":22.3803,"elevation":557 },{ "lat":39.136953,"lng":22.378261,"elevation":432 },{ "lat":38.659564,"lng":22.878597,"elevation":501 },{ "lat":38.89095606824446,"lng":22.417852482030156,"elevation":28 },{ "lat":38.893228524632804,"lng":22.43493870683878,"elevation":44 },{ "lat":38.92097166627477,"lng":22.424006967274295,"elevation":180 },{ "lat":38.5394861,"lng":22.6188231,"elevation":2457 }, { "lat": 38.6299, "lng":22.1367, elevation: 2.510 }, { "lat": 38.6678, "lng": 22.0833, elevation: 2.495 }, { "lat": 38.8353, "lng": 22.2969, "elevation": 2.152 }, { lat: 38.1825, lng: 23.6794, elevation: 1.413 }, { lat: 38.4828, lng: 22.5015, elevation: 570 }, { lat: 39.7219, lng: 21.6309, elevation: 313 }, { lat: 39.3067, lng: 21.7339, elevation: 750 }, { lat: 38.4623, lng: 23.5935, elevation: 5 }, { lat: 38.5270, lng: 22.3750, elevation: 200 }, { lat: 39.7794, lng: 22.6389, elevation: 1.978 }, { lat: 39.4447, lng: 23.0242, elevation: 1624 }, { lat: 39.1600, lng: 21.7200, elevation: 2048 }, { lat: 39.5422, lng: 21.5489, elevation: 1901 },{ lat:39.6390, lng: 22.4191, elevation: 70 }, { lat: 39.3621, lng: 22.9420, elevation: 5 }, { lat:39.5553, lng: 21.7679, elevation: 115 }, { lat:39.3651, lng: 21.9210, elevation: 110 },{ lat: 39.4359, lng: 21.6624, elevation: 180 },{ lat: 39.4303, lng: 22.0911, elevation: 110 },{ lat: 38.4336, lng: 22.4183, elevation: 10 },{ lat: 38.9474, lng: 21.6358, elevation: 260 },{ lat: 38.8611, lng: 21.5522, elevation: 280 }, { lat:38.55601, lng:21.99669, elevation: 930 }, { lat: 38.58607, lng: 21.72340, elevation: 317 }];

const myFeaturesMap = new L.FeatureGroup();

export default function WindLayer() {
    const [tempData, setTempData] = useState<TemperatureData[]>([]);
    const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection | null>(null);
    const { forecastData, activeForecastHour } = useForecastLayerStore();
    const map = useMap();
    const { addMarker } = useMapStore();

    const color = d3.scaleSequential()
        .domain([MIN_TEMP, MAX_TEMP])
        .interpolator(d3.interpolateRgbBasis(TemperatureColorList));
        
    useEffect(() => {
        /**
        * @todo This should be moved to the BE instead of the FE
        */
        if (!forecastData || !activeForecastHour) return;
        const result = [];
        let tempIndex = 0;
        const data = forecastData[activeForecastHour];
        for(let y = BBOX.bottomLatitude; y <= BBOX.topLatitude; y += STEP) {
            for(let x = BBOX.leftLongitude; x <= BBOX.rightLongitude; x += STEP) {
                const estimatedElevation = interpolateElevation(y, x, knownElevations);
                result.push({
                    lat: y,
                    lng: x,
                    temp: convertCelciusKelvin(data[0].data[tempIndex]),
                    elevation: estimatedElevation,
                });
                tempIndex++;
            }
        }
        setTempData(result);
    },[forecastData,activeForecastHour]);
    
    useEffect(() => {
        if (!tempData.length) return;
        
        // Prepare data for kriging
        const lons = tempData.map(d => d.lng);
        const lats = tempData.map(d => d.lat);
        const temps = tempData.map(d => applyAltitudeCorrection(d.temp, d.elevation ?? 0));

        // Perform kriging interpolation
        const variogram = kriging.train(temps, lons, lats, "exponential", 0, 25);

        // Define the grid
        const gridSize = 0.1;
        const xgrid = d3.range(BBOX.leftLongitude, BBOX.rightLongitude, gridSize);
        const ygrid = d3.range(BBOX.bottomLatitude, BBOX.topLatitude, gridSize);

        // Create the grid for kriging predictions
        const zgrid = [];
        for (let i = 0; i < ygrid.length; i++) {
            const row = [];
            for (let j = 0; j < xgrid.length; j++) {
                const z = kriging.predict(xgrid[j], ygrid[i], variogram);
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
                    color: color(contour.value),
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
                const fillColor = rgbToRgba(color(feature?.properties.value), alpha);
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