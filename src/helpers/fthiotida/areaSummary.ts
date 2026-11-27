import type { DioramaArea, DioramaWind } from "./sectionModel";

export type TemperatureRange = {
    min: number;
    max: number;
};

export type RangeBar = {
    left: number;
    width: number;
};

export type ComparisonDot = {
    key: string;
    left: number;
    selected: boolean;
    colour: string;
};

export type HighsComparison = {
    dots: ComparisonDot[];
    low: number;
    high: number;
    warmerCount: number;
    colderCount: number;
    total: number;
};

export type CompassPoint = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

const COMPASS_POINTS: CompassPoint[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const MINIMUM_BAR_WIDTH = 4;
const TEMPERATURE_STOPS: [number, string][] = [
    [-10, "#8ab4ff"],
    [-3, "#9cc9ff"],
    [3, "#86d3d0"],
    [8, "#a9d98a"],
    [13, "#e8d26a"],
    [17, "#f3ad5a"],
    [22, "#ec7f4f"],
];

export const temperatureColour = (temperature: number): string =>
    TEMPERATURE_STOPS.reduce(
        (colour, [threshold, stopColour]) => (temperature >= threshold ? stopColour : colour),
        TEMPERATURE_STOPS[0][1]
    );

export const regionalRange = (areas: DioramaArea[]): TemperatureRange | null => {
    const lows = areas.flatMap((area) => (area.low === undefined ? [] : [area.low]));
    const highs = areas.flatMap((area) => (area.high === undefined ? [] : [area.high]));
    if (lows.length === 0 || highs.length === 0) {
        return null;
    }
    return { min: Math.min(...lows), max: Math.max(...highs) };
};

export const rangeBar = (low: number, high: number, range: TemperatureRange): RangeBar => {
    const span = Math.max(1, range.max - range.min);
    return {
        left: ((low - range.min) / span) * 100,
        width: Math.max(MINIMUM_BAR_WIDTH, ((high - low) / span) * 100),
    };
};

export const highsComparison = (
    areas: DioramaArea[],
    selectedKey: string
): HighsComparison | null => {
    const withHighs = areas.filter((area) => area.high !== undefined);
    const selected = withHighs.find((area) => area.key === selectedKey);
    if (!selected || selected.high === undefined) {
        return null;
    }
    const highs = withHighs.map((area) => area.high as number);
    const low = Math.min(...highs);
    const high = Math.max(...highs);
    const span = Math.max(1, high - low);
    const selectedHigh = selected.high;
    return {
        dots: withHighs.map((area) => ({
            key: area.key,
            left: (((area.high as number) - low) / span) * 100,
            selected: area.key === selectedKey,
            colour: temperatureColour(area.high as number),
        })),
        low,
        high,
        warmerCount: highs.filter((value) => value > selectedHigh).length,
        colderCount: highs.filter((value) => value < selectedHigh).length,
        total: withHighs.length,
    };
};

export const compassPoint = (degrees: number): CompassPoint =>
    COMPASS_POINTS[Math.round((((degrees % 360) + 360) % 360) / 45) % 8];

export const nearestWind = (area: DioramaArea, winds: DioramaWind[]): DioramaWind | null =>
    winds.reduce<DioramaWind | null>((nearest, wind) => {
        const distance = Math.hypot(wind.anchor.x - area.anchor.x, wind.anchor.y - area.anchor.y);
        const nearestDistance = nearest
            ? Math.hypot(nearest.anchor.x - area.anchor.x, nearest.anchor.y - area.anchor.y)
            : Number.POSITIVE_INFINITY;
        return distance < nearestDistance ? wind : nearest;
    }, null);

export const areaWind = (area: DioramaArea, winds: DioramaWind[]): DioramaWind | null =>
    winds.find((wind) => wind.key === area.windZone) ?? nearestWind(area, winds);

export const formatOrdinal = (position: number, language: string): string => {
    if (language === "el") {
        return `${position}η`;
    }
    const suffixes: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };
    return `${position}${suffixes[new Intl.PluralRules("en", { type: "ordinal" }).select(position)]}`;
};
