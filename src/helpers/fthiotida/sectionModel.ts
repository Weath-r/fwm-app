import { geoToSlab, nudgeSlabPoint, snapInsideOutline, type SlabPoint } from "@/utils/geoToSlab";
import {
    FTHIOTIDA_AREAS,
    snowCapOpacity,
    type FthiotidaAreaDefinition,
    type FthiotidaAreaKey,
    type FthiotidaWindZone,
    type SnowCap,
} from "./areas";
import { resolveCondition, type ConditionAppearance } from "./conditions";
import type { FthiotidaForecastDay } from "./forecastDays";

export type DioramaArea = {
    key: FthiotidaAreaKey;
    translationKey: string;
    anchor: SlabPoint;
    appearance: ConditionAppearance | null;
    conditionValue?: string;
    conditionLabel?: string;
    conditionIcon?: string;
    high?: number;
    low?: number;
    precipProbability?: number;
    snowLevel?: number;
    windZone?: FthiotidaWindZone;
};

export type DioramaWind = {
    key: FthiotidaAreaKey;
    translationKey: string;
    anchor: SlabPoint;
    directionDegrees: number;
    beaufortMin?: number;
    beaufortMax: number;
};

export type DioramaSnowCap = {
    id: SnowCap["id"];
    anchor: SlabPoint;
    opacity: number;
};

export type FthiotidaDayModel = {
    forecastDate: string;
    areas: DioramaArea[];
    winds: DioramaWind[];
    snowCaps: DioramaSnowCap[];
};

export const buildDayModel = (day: FthiotidaForecastDay): FthiotidaDayModel => {
    const areas: DioramaArea[] = [];
    const winds: DioramaWind[] = [];
    const snowCaps: DioramaSnowCap[] = [];

    (Object.keys(FTHIOTIDA_AREAS) as FthiotidaAreaKey[]).forEach((key) => {
        const definition: FthiotidaAreaDefinition = FTHIOTIDA_AREAS[key];
        const entry = day.entries[key];
        if (!entry?.location) {
            return;
        }
        const projected = geoToSlab(entry.location);
        const anchor =
            definition.role === "area"
                ? snapInsideOutline(nudgeSlabPoint(projected, definition.markerNudge))
                : projected;
        if (definition.role === "wind") {
            if (entry.wmax === undefined || entry.windDirection === undefined) {
                return;
            }
            winds.push({
                key,
                translationKey: definition.translationKey,
                anchor,
                directionDegrees: entry.windDirection,
                beaufortMin: entry.wmin,
                beaufortMax: entry.wmax,
            });
            return;
        }
        areas.push({
            key,
            translationKey: definition.translationKey,
            anchor,
            appearance: resolveCondition(entry.weatherConditions?.value),
            conditionValue: entry.weatherConditions?.value,
            conditionLabel: entry.weatherConditions?.label,
            conditionIcon: entry.weatherConditions?.icon,
            high: entry.tmax,
            low: entry.tmin,
            precipProbability: entry.precipProbability,
            snowLevel: entry.snow && entry.snow > 0 ? entry.snow : undefined,
            windZone: definition.windZone,
        });
        if (definition.snowCap) {
            snowCaps.push({
                id: definition.snowCap.id,
                anchor: snapInsideOutline(geoToSlab(definition.snowCap.location)),
                opacity: snowCapOpacity(definition.snowCap.peakMeters, entry.snow),
            });
        }
    });

    return { forecastDate: day.forecastDate, areas, winds, snowCaps };
};

export type PlaceholderArea = {
    key: FthiotidaAreaKey;
    translationKey: string;
    anchor: SlabPoint;
};

export const placeholderAreas = (): PlaceholderArea[] =>
    (Object.keys(FTHIOTIDA_AREAS) as FthiotidaAreaKey[]).flatMap((key) => {
        const definition: FthiotidaAreaDefinition = FTHIOTIDA_AREAS[key];
        if (definition.role !== "area" || !definition.location) {
            return [];
        }
        return [
            {
                key,
                translationKey: definition.translationKey,
                anchor: snapInsideOutline(
                    nudgeSlabPoint(geoToSlab(definition.location), definition.markerNudge)
                ),
            },
        ];
    });
