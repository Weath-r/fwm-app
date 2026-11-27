"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type TransitionEvent } from "react";
import { Measurements } from "@/types";
import { FTHIOTIDA_TOWNS } from "@/helpers/fthiotida/areas";
import type {
    DioramaArea,
    DioramaSnowCap,
    DioramaWind,
    PlaceholderArea,
} from "@/helpers/fthiotida/sectionModel";
import { createCamera, projectToScreen, slabTransform } from "@/utils/dioramaProjection";
import { SLAB_OUTLINE, geoToSlab, snapInsideOutline, type SlabPoint } from "@/utils/geoToSlab";
import type { Daypart } from "@/utils/sunTimes";
import type { Sky } from "@/hooks/useDaypart";
import {
    BILLBOARD_OFFSETS,
    WIND_PILL_OFFSETS,
    placeBoxes,
    type ScreenBox,
} from "@/utils/screenPlacement";
import GroundEffect from "./GroundEffect";
import SkyArc from "./SkyArc";
import SnowCaps from "./SnowCaps";
import WeatherObject from "./WeatherObject";
import WindFlow from "./WindFlow";
import styles from "../fthiotida.module.css";

const COMPACT_WIDTH = 600;
const PRECIPITATION_BADGE_MINIMUM = 30;
const DIORAMA_CENTRE: SlabPoint = { x: 0.5, y: 0.5 };
const OBJECT_WIDTH = 92;
const OBJECT_HEIGHT = 70;
const LABEL_HEIGHT = 34;
const COMPACT_PIN_WIDTH = 78;
const COMPACT_PIN_HEIGHT = 30;
const COMPACT_PILL_SCALE = 0.6;
const PILL_ICON_WIDTH = 34;
const PILL_CHARACTER_WIDTH = 7;
const PILL_HEIGHT = 24;
const PILL_SCALE = 0.95;
const PLACEHOLDER_HEIGHT = 26;
const OUTLINE_CLIP = `polygon(${SLAB_OUTLINE.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(", ")})`;
const TOWN_POINTS = FTHIOTIDA_TOWNS.map((location) => snapInsideOutline(geoToSlab(location)));

type ReliefDioramaProps = {
    areas: DioramaArea[];
    winds: DioramaWind[];
    snowCaps: DioramaSnowCap[];
    placeholders?: PlaceholderArea[];
    daypart: Daypart;
    sky: Sky;
    focusedKey: string | null;
    spotlightKey: string | null;
    cameraMoving: boolean;
    onSelect: (key: string) => void;
    onCameraSettled: () => void;
    areaName: (translationKey: string) => string;
    areaLabel: (area: DioramaArea) => string;
};

const landTopAt = (x: number, outline: { left: number; top: number }[]) => {
    let top = Number.POSITIVE_INFINITY;
    outline.forEach((start, index) => {
        const end = outline[(index + 1) % outline.length];
        if ((start.left - x) * (end.left - x) <= 0 && start.left !== end.left) {
            const along = (x - start.left) / (end.left - start.left);
            top = Math.min(top, start.top + along * (end.top - start.top));
        }
    });
    return top;
};

const spotlightCentre = (anchor: SlabPoint) => ({
    x: ((anchor.x * 100 + 30) / 160) * 100,
    y: ((anchor.y * 100 + 30) / 160) * 100,
});

export default function ReliefDiorama({
    areas,
    winds,
    snowCaps,
    placeholders = [],
    daypart,
    sky,
    focusedKey,
    spotlightKey,
    cameraMoving,
    onSelect,
    onCameraSettled,
    areaName,
    areaLabel,
}: ReliefDioramaProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [{ width, headroom, stageHeight }, setViewportSize] = useState({
        width: 820,
        headroom: 44,
        stageHeight: 560,
    });

    useEffect(() => {
        const element = viewportRef.current;
        if (!element || typeof ResizeObserver === "undefined") {
            return;
        }
        const observer = new ResizeObserver(([entry]) =>
            setViewportSize({
                width: entry.contentRect.width,
                headroom: element.offsetTop,
                stageHeight: element.parentElement?.clientHeight ?? 560,
            })
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const focused = areas.find((area) => area.key === focusedKey) ?? null;
    const spotlightAnchor =
        areas.find((area) => area.key === spotlightKey)?.anchor ?? DIORAMA_CENTRE;
    const camera = createCamera(width, focused?.anchor);
    const compact = width < COMPACT_WIDTH;
    const restingCamera = createCamera(width);
    const restingOutline = SLAB_OUTLINE.map(([x, y]) => projectToScreen({ x, y }, restingCamera));
    const centre = spotlightCentre(spotlightAnchor);

    const stageBounds: ScreenBox = {
        left: 0,
        top: -headroom,
        right: width,
        bottom: stageHeight - headroom,
    };

    const areaPoints = areas.map((area) => {
        const point = projectToScreen(area.anchor, camera);
        const scale = area.key === focusedKey ? 1.3 : 1;
        const boxWidth = compact ? COMPACT_PIN_WIDTH : OBJECT_WIDTH;
        const boxHeight = compact ? COMPACT_PIN_HEIGHT : OBJECT_HEIGHT + LABEL_HEIGHT;
        return { area, point, scale, boxWidth, boxHeight };
    });
    const placementOrder = areaPoints.slice().sort((first, second) => {
        if (first.area.key === focusedKey) {
            return -1;
        }
        if (second.area.key === focusedKey) {
            return 1;
        }
        return second.point.top - first.point.top;
    });
    const orderedPlacements = placeBoxes(
        placementOrder.map(({ point, scale, boxWidth, boxHeight }) => ({
            centreX: point.left,
            centreY: point.top - (boxHeight * scale) / 2,
            scale,
            width: boxWidth,
            height: boxHeight,
        })),
        [],
        stageBounds,
        BILLBOARD_OFFSETS
    );
    const billboardPlacements = new Map(
        placementOrder.map(({ area }, index) => [area.key, orderedPlacements[index]])
    );

    const windPills = winds.map((wind) => {
        const point = projectToScreen(wind.anchor, camera);
        const range =
            wind.beaufortMin === undefined
                ? `${wind.beaufortMax}`
                : `${wind.beaufortMin}–${wind.beaufortMax}`;
        const text = compact ? `${wind.beaufortMax}` : `${range} ${Measurements.BFT}`;
        return { wind, point, range, text, scale: PILL_SCALE * (compact ? COMPACT_PILL_SCALE : 1) };
    });
    const pillPlacements = placeBoxes(
        windPills.map(({ point, text, scale }) => ({
            centreX: point.left,
            centreY: point.top,
            scale,
            width: PILL_ICON_WIDTH + text.length * PILL_CHARACTER_WIDTH,
            height: PILL_HEIGHT,
        })),
        orderedPlacements.map((placement) => placement.box),
        stageBounds,
        WIND_PILL_OFFSETS
    );

    const placeholderPoints = placeholders.map((placeholder) => {
        const point = projectToScreen(placeholder.anchor, camera);
        const name = areaName(placeholder.translationKey);
        return { placeholder, point, name, boxWidth: name.length * 7.2 + 26 };
    });
    const placeholderPlacements = placeBoxes(
        placeholderPoints.map(({ point, boxWidth }) => ({
            centreX: point.left,
            centreY: point.top,
            scale: 1,
            width: boxWidth,
            height: PLACEHOLDER_HEIGHT,
        })),
        [],
        stageBounds,
        BILLBOARD_OFFSETS
    );

    const onSlabTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && event.propertyName === "transform") {
            onCameraSettled();
        }
    };

    return (
        <div className={styles.stage}>
            {daypart === "night" && <span className={styles.skyMoon} aria-hidden="true" />}
            <SkyArc
                sky={sky}
                width={width}
                stageHeight={stageHeight}
                landTopAt={(x) => landTopAt(x, restingOutline) + headroom}
            />
            <div
                ref={viewportRef}
                className={styles.viewport}
                style={{ perspective: `${camera.perspective}px` }}
            >
                <div
                    className={`${styles.slab} ${cameraMoving ? styles.slabMoving : ""}`}
                    style={{ transform: slabTransform(camera) }}
                    onTransitionEnd={onSlabTransitionEnd}
                >
                    <Image
                        className={styles.relief}
                        src="/assets/fthiotida/relief-sea-coast-water-v2.png"
                        alt=""
                        fill
                        sizes="(max-width: 900px) 100vw, 900px"
                        fetchPriority="low"
                    />
                    <SnowCaps caps={snowCaps} />
                    <span
                        className={styles.tint}
                        data-daypart={daypart}
                        style={{ clipPath: OUTLINE_CLIP }}
                    />
                    {TOWN_POINTS.map((town) => (
                        <span
                            key={`${town.x}-${town.y}`}
                            className={styles.townLight}
                            style={{
                                left: `${town.x * 100}%`,
                                top: `${town.y * 100}%`,
                                opacity: daypart === "night" ? 1 : 0,
                            }}
                        />
                    ))}
                    {areas.map(
                        (area) =>
                            area.appearance && (
                                <GroundEffect
                                    key={area.key}
                                    effect={area.appearance.groundEffect}
                                    anchor={area.anchor}
                                    dimmed={focused !== null && focused.key !== area.key}
                                />
                            )
                    )}
                    {winds.map((wind) => (
                        <WindFlow key={wind.key} wind={wind} dimmed={focused !== null} />
                    ))}
                    <span
                        className={styles.spotlight}
                        style={{
                            opacity: focused ? 1 : 0,
                            background: `radial-gradient(circle at ${centre.x}% ${centre.y}%, rgba(16, 28, 40, 0) 0%, rgba(16, 28, 40, 0) 9%, rgba(16, 28, 40, 0.42) 22%)`,
                        }}
                    />
                </div>

                <div className={styles.billboards}>
                    {placeholderPoints.map(({ placeholder, name }, index) => (
                        <span
                            key={placeholder.key}
                            className={styles.placeholderLabel}
                            style={{
                                transform: `translate3d(${placeholderPlacements[index].centreX}px, ${placeholderPlacements[index].centreY}px, 0) translate(-50%, -50%)`,
                            }}
                        >
                            {name}
                        </span>
                    ))}
                    {windPills.map(({ wind, point, range, text, scale }, index) => {
                        const placement = pillPlacements[index];
                        return (
                            <span
                                key={wind.key}
                                className={styles.windPill}
                                title={`${areaName(wind.translationKey)} · ${range} ${Measurements.BFT}`}
                                style={{
                                    transform: `translate3d(${placement.centreX}px, ${placement.centreY}px, 0) translate(-50%, -50%) scale(${scale})`,
                                    opacity: focused ? 0.35 : 1,
                                    zIndex: Math.round(point.top) + 90,
                                }}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    style={{
                                        transform: `rotate(${(wind.directionDegrees + 180) % 360}deg)`,
                                    }}
                                >
                                    <path d="M12 20V5M6 11l6-6 6 6" />
                                </svg>
                                {text}
                            </span>
                        );
                    })}

                    {areaPoints.map(({ area, point, scale, boxHeight }, index) => {
                        const isFocused = area.key === focusedKey;
                        const placement = billboardPlacements.get(area.key);
                        const left = placement?.centreX ?? point.left;
                        const bottom = placement
                            ? placement.centreY + (boxHeight * scale) / 2
                            : point.top;
                        const showPrecipitation =
                            !compact &&
                            area.precipProbability !== undefined &&
                            area.precipProbability >= PRECIPITATION_BADGE_MINIMUM;
                        return (
                            <button
                                key={area.key}
                                type="button"
                                className={`${styles.billboard} ${compact ? styles.billboardCompact : ""}`}
                                aria-label={areaLabel(area)}
                                aria-pressed={isFocused}
                                onClick={() => onSelect(area.key)}
                                style={{
                                    transform: `translate3d(${left}px, ${bottom}px, 0) translate(-50%, -100%) scale(${scale})`,
                                    opacity: !focused || isFocused ? 1 : 0.22,
                                    zIndex: Math.round(point.top) + 100,
                                }}
                            >
                                <WeatherObject
                                    object={area.appearance?.object ?? null}
                                    fallbackIcon={area.conditionIcon}
                                    delaySeconds={-index * 0.7}
                                />
                                <span className={styles.label} aria-hidden="true">
                                    <span className={styles.labelValues}>
                                        <span className={styles.labelHigh}>
                                            {area.high === undefined
                                                ? "–"
                                                : `${area.high}${Measurements.DEGREE}`}
                                        </span>
                                        {!compact && area.low !== undefined && (
                                            <span className={styles.labelLow}>
                                                {`${area.low}${Measurements.DEGREE}`}
                                            </span>
                                        )}
                                        {showPrecipitation && (
                                            <span className={styles.labelPrecipitation}>
                                                {`${area.precipProbability}${Measurements.PERCENTAGE}`}
                                            </span>
                                        )}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
