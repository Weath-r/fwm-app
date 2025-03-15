import { ElevationKnownPoints, Variogram } from "@/types";
import kriging from "@sakitam-gis/kriging";

export const haversineDistance = (lat1:number, lon1:number, lat2:number, lon2:number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export const interpolateElevation = (lat:number, lon:number, knownPoints: ElevationKnownPoints[], power = 2):number => {
    let numerator = 0;
    let denominator = 0;
    for (const point of knownPoints) {
        const distance = haversineDistance(lat, lon, point.lat, point.lng);
        if (distance === 0) return point.elevation; // Exact match
        const weight = 1 / Math.pow(distance, power);
        numerator += weight * point.elevation;
        denominator += weight;
    }
    return numerator / denominator;
};

export const applyAltitudeCorrection = (temp: number, elevation:number, baseElevation = 0):number => {
    const lapseRate = 0.0065; // Temperature lapse rate in °C/m
    return temp - lapseRate * (elevation - baseElevation);
};

export const createElevationVariogram = (locations: ElevationKnownPoints[]): Variogram => {
    return kriging.train(
        locations.map(point => point.elevation),
        locations.map(point => point.lng),
        locations.map(point => point.lat),
        "exponential", 0, 25
    );
};

export const predictKriging = ({ x, y, variogram }: { 
    x: number; 
    y: number;
    variogram: Variogram;
}): number => {
    return kriging.predict(x, y, variogram);
};

export const trainKriging = ({ values, lons, lats }: {
    values: number[];
    lons: number[];
    lats: number[];
}): Variogram => {
    return kriging.train(values, lons, lats, "exponential", 0, 25);
};