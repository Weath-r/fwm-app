import type { CSSProperties, ReactNode } from "react";
import { daylightProgress, formatClockTime, type Daypart } from "@/utils/sky";
import styles from "../fthiotida.module.css";

type SkyArcProps = {
    rise: number;
    set: number;
    now: number;
    peakElevationDegrees: number;
    tone: Daypart;
    width: number;
    stageHeight: number;
    landTopAt: (x: number) => number;
    renderMarker: (position: CSSProperties) => ReactNode;
    caption?: string;
};

const ARC_SAMPLES = 40;
const RISE_RATIO = 0.93;
const SET_RATIO = 0.07;
const BASE_RATIO = 0.17;
const AMPLITUDE_RATIO = 0.13;
const LAND_GAP = 18;
const HIGHEST_ELEVATION = 72;
const CAPTION_GAP = 18;

export default function SkyArc({
    rise,
    set,
    now,
    peakElevationDegrees,
    tone,
    width,
    stageHeight,
    landTopAt,
    renderMarker,
    caption,
}: SkyArcProps) {
    const amplitude =
        stageHeight *
        AMPLITUDE_RATIO *
        (0.55 + 0.45 * Math.min(1, Math.max(0, peakElevationDegrees / HIGHEST_ELEVATION)));
    const pointAt = (progress: number, base: number) => ({
        x: width * (RISE_RATIO - progress * (RISE_RATIO - SET_RATIO)),
        y: base - amplitude * Math.sin(Math.PI * progress),
    });
    const samples = Array.from({ length: ARC_SAMPLES + 1 }, (_, index) => index / ARC_SAMPLES);
    const lift = Math.max(
        0,
        ...samples.map((progress) => {
            const point = pointAt(progress, stageHeight * BASE_RATIO);
            return point.y - (landTopAt(point.x) - LAND_GAP);
        })
    );
    const base = Math.max(amplitude + 10, stageHeight * BASE_RATIO - lift);
    const path = samples
        .map((progress, index) => {
            const point = pointAt(progress, base);
            return `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
        })
        .join(" ");
    const marker = pointAt(daylightProgress(now, rise, set), base);
    const start = pointAt(0, base);
    const end = pointAt(1, base);

    return (
        <div className={styles.skyArc} data-daypart={tone} aria-hidden="true">
            <svg width={width} height={stageHeight} className={styles.skyArcPath}>
                <path d={path} />
            </svg>
            <span className={styles.skyArcTime} style={{ left: start.x, top: start.y + 8 }}>
                {formatClockTime(rise)}
            </span>
            <span className={styles.skyArcTime} style={{ left: end.x, top: end.y + 8 }}>
                {formatClockTime(set)}
            </span>
            {caption && (
                <span
                    className={styles.skyArcCaption}
                    style={{ left: width / 2, top: base - amplitude + CAPTION_GAP }}
                >
                    {caption}
                </span>
            )}
            {renderMarker({ left: marker.x, top: marker.y })}
        </div>
    );
}
