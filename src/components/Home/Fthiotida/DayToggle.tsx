"use client";
import { useT } from "@/i18n/client";
import styles from "./fthiotida.module.css";

export type DayKind = "today" | "tomorrow";

const DAYS: DayKind[] = ["today", "tomorrow"];

type DayToggleProps = {
    selected: DayKind;
    available: Record<DayKind, boolean>;
    onChange: (day: DayKind) => void;
};

export default function DayToggle({ selected, available, onChange }: DayToggleProps) {
    const { t } = useT("fthiotida");
    return (
        <div className="flex flex-col items-end gap-2">
            <div role="group" aria-label={t("dayToggle.label")} className={styles.dayToggle}>
                {DAYS.map((day) => (
                    <button
                        key={day}
                        type="button"
                        className={styles.dayButton}
                        aria-pressed={selected === day}
                        disabled={!available[day]}
                        onClick={() => onChange(day)}
                    >
                        {t(`dayToggle.${day}`)}
                        {day === "tomorrow" && !available.tomorrow && (
                            <span className={styles.pendingDot} aria-hidden="true" />
                        )}
                    </button>
                ))}
            </div>
            {!available.tomorrow && (
                <p role="status" className={`${styles.muted} m-0 text-xs`}>
                    {t("dayToggle.pending")}
                </p>
            )}
        </div>
    );
}
