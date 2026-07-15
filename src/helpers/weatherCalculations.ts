import {
    UVCategory,
    AirQualityCategory,
    EnvironmentalData,
    StationEnvironmentalConditions,
} from "@/types";

const findNearestHourIndex = (times: string[]): number => {
    const nowMs = new Date().getTime();
    return times.reduce((nearestIdx, timeStr, idx) => {
        const timeMs = new Date(timeStr).getTime();
        const nearestTimeMs = new Date(times[nearestIdx]).getTime();
        return Math.abs(timeMs - nowMs) < Math.abs(nearestTimeMs - nowMs) ? idx : nearestIdx;
    }, 0);
};

export const resolveEnvironmentalConditions = (
    environmentalData: EnvironmentalData[] | null
): StationEnvironmentalConditions => {
    const hourly = environmentalData?.[0]?.hourly;
    if (!hourly?.time.length) {
        return { uvIndex: null, airQualityIndex: null };
    }

    const nearestIndex = findNearestHourIndex(hourly.time);
    const uvIndex = hourly.uv_index[nearestIndex];
    const airQualityIndex = hourly.european_aqi[nearestIndex];

    return {
        uvIndex: uvIndex !== undefined ? Math.ceil(uvIndex) : null,
        airQualityIndex: airQualityIndex || null,
    };
};

export const windDirectionCalc = (degree: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    // Normalize degree to 0-360 range to handle negative numbers and values > 360
    const normalizedDegree = ((degree % 360) + 360) % 360;

    const index = Math.floor((normalizedDegree + 22.5) / 45) % 8;
    return directions[index];
};

export const UVCalculateCategory = (uvIndex: number) => {
    if (uvIndex === 0) {
        return UVCategory.night;
    }
    switch (uvIndex > 0) {
        case uvIndex < 3:
            return UVCategory.low;
        case uvIndex < 6:
            return UVCategory.moderate;
        case uvIndex < 8:
            return UVCategory.high;
        case uvIndex < 11:
            return UVCategory.veryHigh;
        default:
            return UVCategory.extreme;
    }
};

export const AirQualityCalculateCategory = (aqi: number) => {
    switch (aqi > 0) {
        case aqi <= 20:
            return AirQualityCategory.good;
        case aqi <= 40:
            return AirQualityCategory.fair;
        case aqi <= 60:
            return AirQualityCategory.moderate;
        case aqi <= 80:
            return AirQualityCategory.poor;
        case aqi <= 100:
            return AirQualityCategory.veryPoor;
        default:
            return AirQualityCategory.extremelyPoor;
    }
};
