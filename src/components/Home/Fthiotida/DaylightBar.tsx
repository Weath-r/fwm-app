"use client";
import { useT } from "@/i18n/client";
import type { Sky } from "@/hooks/useDaypart";
import { daylightProgress, formatClockTime } from "@/utils/sunTimes";
import styles from "./fthiotida.module.css";

export default function DaylightBar({ sky }: { sky: Sky }) {
    const { t } = useT("fthiotida");
    if (!sky.sunrise) {
        return null;
    }
    if (sky.daypart === "night") {
        return (
            <span className="flex min-w-0 items-center gap-2">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="shrink-0 opacity-80"
                >
                    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
                </svg>
                {t("footer.nextSunrise", { time: formatClockTime(sky.nextSunrise) })}
            </span>
        );
    }
    const progress = daylightProgress(sky.now, sky.sunrise, sky.sunset);
    return (
        <span
            className="flex min-w-0 items-center gap-2 tabular-nums"
            role="img"
            aria-label={t("footer.daylight", {
                sunrise: formatClockTime(sky.sunrise),
                sunset: formatClockTime(sky.sunset),
            })}
        >
            <span aria-hidden="true">
                {t("footer.sunrise")} {formatClockTime(sky.sunrise)}
            </span>
            <span className={styles.daylightTrack} aria-hidden="true">
                <span className={styles.daylightFill} style={{ width: `${progress * 100}%` }} />
                <span className={styles.daylightDot} style={{ left: `${progress * 100}%` }} />
            </span>
            <span aria-hidden="true">
                {t("footer.sunset")} {formatClockTime(sky.sunset)}
            </span>
        </span>
    );
}
