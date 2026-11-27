import type { Sky } from "@/hooks/useDaypart";
import { daylightProgress, formatClockTime } from "@/utils/sunTimes";
import styles from "../fthiotida.module.css";

type SkyArcProps = {
    sky: Sky;
    width: number;
    stageHeight: number;
    landTopAt: (x: number) => number;
};

const ARC_SAMPLES = 40;
const RISE_RATIO = 0.93;
const SET_RATIO = 0.07;
const BASE_RATIO = 0.17;
const AMPLITUDE_RATIO = 0.13;
const LAND_GAP = 18;
const HIGHEST_NOON = 72;

export default function SkyArc({ sky, width, stageHeight, landTopAt }: SkyArcProps) {
    if (!sky.sunrise || sky.daypart === "night") {
        return null;
    }
    const amplitude =
        stageHeight *
        AMPLITUDE_RATIO *
        (0.55 + 0.45 * Math.min(1, Math.max(0, sky.noonElevationDegrees / HIGHEST_NOON)));
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
    const progress = daylightProgress(sky.now, sky.sunrise, sky.sunset);
    const sun = pointAt(progress, base);
    const rise = pointAt(0, base);
    const set = pointAt(1, base);

    return (
        <div className={styles.skyArc} data-daypart={sky.daypart} aria-hidden="true">
            <svg width={width} height={stageHeight} className={styles.skyArcPath}>
                <path d={path} />
            </svg>
            <span className={styles.skyArcTime} style={{ left: rise.x, top: rise.y + 8 }}>
                {formatClockTime(sky.sunrise)}
            </span>
            <span className={styles.skyArcTime} style={{ left: set.x, top: set.y + 8 }}>
                {formatClockTime(sky.sunset)}
            </span>
            <span className={styles.skyArcSun} style={{ left: sun.x, top: sun.y }} />
        </div>
    );
}
