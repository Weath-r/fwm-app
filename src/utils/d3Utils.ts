import * as d3 from "d3";

export const createColorGradient = ({ minTemp, maxTemp, colorsList }: {
    minTemp: number;
    maxTemp: number;
    colorsList: string[];
}) => {
    return d3.scaleQuantize<string>()
        .domain([minTemp, maxTemp])
        .range(colorsList);
};

export const ColorToRgb = (colorHex: string): string => {
    const color = d3.rgb(colorHex).formatRgb();
    return color;
};