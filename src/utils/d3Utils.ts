import * as d3 from "d3";

export const createColorGradient = ({ minTemp, maxTemp, colorsList }: {
    minTemp: number;
    maxTemp: number;
    colorsList: string[];
}) => {
    return d3.scaleSequential()
        .domain([minTemp, maxTemp])
        .interpolator(d3.interpolateRgbBasis(colorsList));
};