"use client";
import { useT } from "@/i18n/client";
import type { Sky } from "@/hooks/useSky";
import { daylightProgress, formatClockTime, moonPhaseName } from "@/utils/sky";
import { Measurements } from "@/types";
import MoonPhaseIcon from "./diorama/MoonPhaseIcon";
import { useDaylightText } from "./useDaylightText";
import styles from "./fthiotida.module.css";

export default function DaylightBar({ sky }: { sky: Sky }) {
    const { t } = useT("fthiotida");
    const daylight = useDaylightText(sky);
    if (!sky.sunrise) {
        return null;
    }
    if (sky.daypart === "night") {
        return (
            <span className="flex min-w-0 flex-col gap-1">
                <span className="flex min-w-0 items-center gap-2 tabular-nums">
                    <MoonPhaseIcon moon={sky.moon} className={styles.footerMoon} />
                    {t("footer.night", {
                        phase: t(`moonPhases.${moonPhaseName(sky.moon.phase)}`),
                        illumination: `${Math.round(sky.moon.illumination * 100)}${Measurements.PERCENTAGE}`,
                    })}
                </span>
                <span className={`${styles.muted} text-xs tabular-nums`}>
                    {t("footer.nextSunrise", { time: formatClockTime(sky.nextSunrise) })}
                </span>
            </span>
        );
    }
    const progress = daylightProgress(sky.now, sky.sunrise, sky.sunset);
    return (
        <span className="flex min-w-0 flex-col gap-1">
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
            <span className={`${styles.muted} text-xs tabular-nums`}>{daylight.full}</span>
        </span>
    );
}
