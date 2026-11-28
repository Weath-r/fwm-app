"use client";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types";
import type { DioramaArea } from "@/helpers/fthiotida/sectionModel";
import AreaIcon from "../panel/AreaIcon";
import styles from "../fthiotida.module.css";

type AreaChipsProps = {
    areas: DioramaArea[];
    focusedKey: string | null;
    onSelect: (key: string) => void;
    areaLabel: (area: DioramaArea) => string;
};

export default function AreaChips({ areas, focusedKey, onSelect, areaLabel }: AreaChipsProps) {
    const { t } = useT("fthiotida");
    return (
        <ul aria-label={t("rail.chips")} className={styles.chips}>
            {areas.map((area) => (
                <li key={area.key} className="flex">
                    <button
                        type="button"
                        className={styles.chip}
                        aria-pressed={area.key === focusedKey}
                        aria-label={areaLabel(area)}
                        onClick={() => onSelect(area.key)}
                    >
                        <AreaIcon area={area} />
                        <span className="text-[13px] font-semibold leading-tight">
                            {t(`areas.${area.translationKey}`)}
                        </span>
                        <span className="mt-auto text-[15px] font-bold tabular-nums">
                            {area.high === undefined ? "–" : `${area.high}${Measurements.DEGREE}`}{" "}
                            {area.low !== undefined && (
                                <span className={`${styles.muted} font-medium`}>
                                    {`${area.low}${Measurements.DEGREE}`}
                                </span>
                            )}
                        </span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
