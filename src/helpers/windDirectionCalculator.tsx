export const windDirectionCalc = (degree: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    // Normalize degree to 0-360 range to handle negative numbers and values > 360
    const normalizedDegree = ((degree % 360) + 360) % 360;

    const index = Math.floor((normalizedDegree + 22.5) / 45) % 8;
    return directions[index];
};
