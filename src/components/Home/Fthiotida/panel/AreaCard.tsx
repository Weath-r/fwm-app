"use client";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types";
import type { DioramaArea, DioramaWind } from "@/helpers/fthiotida/sectionModel";
import { areaWind, compassPoint, highsComparison } from "@/helpers/fthiotida/areaSummary";
import WeatherObject from "../diorama/WeatherObject";
import ComparisonStrip from "./ComparisonStrip";
import styles from "../fthiotida.module.css";

type AreaCardProps = {
    area: DioramaArea;
    areas: DioramaArea[];
    winds: DioramaWind[];
    dateLabel: string;
    onBack?: () => void;
};

export default function AreaCard({ area, areas, winds, dateLabel, onBack }: AreaCardProps) {
    const { t } = useT("fthiotida");
    const name = t(`areas.${area.translationKey}`);
    const conditionLabel = area.conditionValue
        ? t(`conditions.${area.conditionValue}`, {
              defaultValue: area.conditionLabel ?? area.conditionValue,
          })
        : t("card.noForecast");
    const comparison = highsComparison(areas, area.key);
    const wind = areaWind(area, winds);

    return (
        <div className={`${styles.card} flex h-full flex-col gap-3.5`}>
            {onBack && (
                <button type="button" className={styles.pillButton} onClick={onBack}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                    {t("card.back")}
                </button>
            )}
            <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-col gap-1">
                    <p
                        className={`${styles.muted} m-0 text-xs font-semibold uppercase tracking-widest`}
                    >
                        {dateLabel}
                    </p>
                    <h3 className="m-0 text-[28px] font-bold leading-tight tracking-tight">
                        {name}
                    </h3>
                    <p className={`${styles.muted} m-0 text-[15px]`}>{conditionLabel}</p>
                </div>
                <span className={styles.cardObject}>
                    <WeatherObject
                        object={area.appearance?.object ?? null}
                        fallbackIcon={area.conditionIcon}
                        delaySeconds={0}
                    />
                </span>
            </div>
            <div className="flex items-baseline gap-2.5 tabular-nums">
                <span className={styles.cardHigh}>
                    {area.high === undefined ? "–" : `${area.high}${Measurements.DEGREE}`}
                </span>
                {area.low !== undefined && (
                    <span className={`${styles.muted} text-[22px] font-medium`}>
                        {`/ ${area.low}${Measurements.DEGREE}`}
                    </span>
                )}
            </div>
            {comparison && area.high !== undefined && (
                <ComparisonStrip comparison={comparison} areaName={name} selectedHigh={area.high} />
            )}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2.5">
                {area.precipProbability !== undefined && (
                    <div className={`${styles.tile} flex flex-col gap-1.5`}>
                        <span className={`${styles.muted} text-xs`}>{t("card.precipitation")}</span>
                        <span className="text-xl font-bold tabular-nums">
                            {`${area.precipProbability}${Measurements.PERCENTAGE}`}
                        </span>
                        <span className={styles.track}>
                            <span
                                className={styles.trackFill}
                                style={{
                                    left: 0,
                                    width: `${area.precipProbability}%`,
                                    background: "#4f97e0",
                                }}
                            />
                        </span>
                    </div>
                )}
                {wind && (
                    <div className={`${styles.tile} flex min-w-0 flex-col gap-1`}>
                        <span className={`${styles.muted} text-balance text-xs leading-snug`}>
                            {t("card.wind", { name: t(`areas.${wind.translationKey}`) })}
                        </span>
                        <span className="flex items-center gap-1.5 text-base font-bold">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                style={{
                                    transform: `rotate(${(wind.directionDegrees + 180) % 360}deg)`,
                                }}
                            >
                                <path d="M12 20V5M6 11l6-6 6 6" />
                            </svg>
                            {`${t(`directions.${compassPoint(wind.directionDegrees)}`)} ${
                                wind.beaufortMin === undefined
                                    ? wind.beaufortMax
                                    : `${wind.beaufortMin}–${wind.beaufortMax}`
                            } ${Measurements.BFT}`}
                        </span>
                        <span className={`${styles.muted} text-xs`}>
                            {t(`beaufort.${Math.min(12, wind.beaufortMax)}`)}
                        </span>
                    </div>
                )}
            </div>
            {area.snowLevel !== undefined && (
                <div className={`${styles.tile} flex items-center gap-2.5 text-sm font-semibold`}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7M9.5 3.8L12 6.3l2.5-2.5M9.5 20.2L12 17.7l2.5 2.5" />
                    </svg>
                    {t("card.snowLevel", { level: `${area.snowLevel} ${Measurements.METER}` })}
                </div>
            )}
        </div>
    );
}
