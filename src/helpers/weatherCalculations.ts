import { UVCategory } from "@/types";

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
