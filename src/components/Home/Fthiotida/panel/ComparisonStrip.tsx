"use client";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types";
import { formatOrdinal, type HighsComparison } from "@/helpers/fthiotida/areaSummary";
import styles from "../fthiotida.module.css";

type ComparisonStripProps = {
    comparison: HighsComparison;
    areaName: string;
    selectedHigh: number;
};

export default function ComparisonStrip({
    comparison,
    areaName,
    selectedHigh,
}: ComparisonStripProps) {
    const { t, i18n } = useT("fthiotida");
    const { warmerCount, colderCount, total } = comparison;
    const rank =
        warmerCount === 0
            ? t("rank.warmest", { total })
            : colderCount === 0
              ? t("rank.coldest", { total })
              : warmerCount <= colderCount
                ? t("rank.nthWarmest", {
                      position: formatOrdinal(warmerCount + 1, i18n.language),
                      total,
                  })
                : t("rank.nthColdest", {
                      position: formatOrdinal(colderCount + 1, i18n.language),
                      total,
                  });
    const degrees = (value: number) => `${value}${Measurements.DEGREE}`;

    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold">{rank}</span>
            <div
                role="img"
                aria-label={t("card.comparisonSummary", {
                    name: areaName,
                    high: degrees(selectedHigh),
                    rank,
                    low: degrees(comparison.low),
                    max: degrees(comparison.high),
                })}
                className={styles.strip}
            >
                <span className={styles.stripLine} />
                {comparison.dots.map((dot) => (
                    <span
                        key={dot.key}
                        className={dot.selected ? styles.stripDotSelected : styles.stripDot}
                        style={{
                            left: `${dot.left}%`,
                            background: dot.selected ? dot.colour : undefined,
                        }}
                    />
                ))}
            </div>
            <div className={`${styles.muted} flex justify-between text-xs tabular-nums`}>
                <span>{degrees(comparison.low)}</span>
                <span>{degrees(comparison.high)}</span>
            </div>
        </div>
    );
}
