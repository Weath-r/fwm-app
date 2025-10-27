import { windPlotBands } from "@/helpers/graphHelpers";

export const calculateWindToBft = (windSpeed: number): number => {
    const band = windPlotBands.find(band => windSpeed >= band.from && windSpeed < band.to);
    if (band) {
        return parseInt(band.label.text);
    }
    return 0;
};