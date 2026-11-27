"use client";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types";
import type { DioramaArea } from "@/helpers/fthiotida/sectionModel";
import {
    rangeBar,
    temperatureColour,
    type TemperatureRange,
} from "@/helpers/fthiotida/areaSummary";
import AreaIcon from "./AreaIcon";
import styles from "../fthiotida.module.css";

const PRECIPITATION_BADGE_MINIMUM = 30;

type AreaRailProps = {
    areas: DioramaArea[];
    range: TemperatureRange | null;
    onSelect: (key: string) => void;
    areaLabel: (area: DioramaArea) => string;
};

export default function AreaRail({ areas, range, onSelect, areaLabel }: AreaRailProps) {
    const { t } = useT("fthiotida");
    return (
        <div className="flex h-full flex-col">
            <h3
                className={`${styles.muted} m-0 px-2.5 pb-2.5 pt-0.5 text-xs font-bold uppercase tracking-widest`}
            >
                {t("rail.heading", { count: areas.length })}
            </h3>
            <ul className={`${styles.railList} m-0 flex list-none flex-col gap-0.5 p-0`}>
                {areas.map((area) => {
                    const bar =
                        range && area.low !== undefined && area.high !== undefined
                            ? rangeBar(area.low, area.high, range)
                            : null;
                    const showPrecipitation =
                        area.precipProbability !== undefined &&
                        area.precipProbability >= PRECIPITATION_BADGE_MINIMUM;
                    return (
                        <li key={area.key}>
                            <button
                                type="button"
                                className={styles.railRow}
                                onClick={() => onSelect(area.key)}
                                aria-label={areaLabel(area)}
                            >
                                <AreaIcon area={area} />
                                <span className="flex min-w-0 items-baseline gap-2">
                                    <span className="truncate text-[15px] font-semibold">
                                        {t(`areas.${area.translationKey}`)}
                                    </span>
                                    {showPrecipitation && (
                                        <span className={styles.precipitationBadge}>
                                            {`${area.precipProbability}${Measurements.PERCENTAGE}`}
                                        </span>
                                    )}
                                </span>
                                <span className={styles.railRange}>
                                    <span className={`${styles.muted} text-right text-[13px]`}>
                                        {area.low === undefined
                                            ? "–"
                                            : `${area.low}${Measurements.DEGREE}`}
                                    </span>
                                    <span className={styles.track}>
                                        {bar && (
                                            <span
                                                className={styles.trackFill}
                                                style={{
                                                    left: `${bar.left}%`,
                                                    width: `${bar.width}%`,
                                                    background: `linear-gradient(90deg, ${temperatureColour(area.low as number)}, ${temperatureColour(area.high as number)})`,
                                                }}
                                            />
                                        )}
                                    </span>
                                    <span className="text-sm font-bold">
                                        {area.high === undefined
                                            ? "–"
                                            : `${area.high}${Measurements.DEGREE}`}
                                    </span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            <p className={`${styles.muted} m-0 mt-auto px-2.5 pt-2.5 text-xs`}>{t("rail.hint")}</p>
        </div>
    );
}
