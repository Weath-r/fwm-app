import type { CSSProperties } from "react";
import { moonLitPath, type MoonPhase } from "@/utils/sky";
import styles from "../fthiotida.module.css";

const RADIUS = 12;

type MoonPhaseIconProps = {
    moon: MoonPhase;
    className: string;
    style?: CSSProperties;
};

export default function MoonPhaseIcon({ moon, className, style }: MoonPhaseIconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
            aria-hidden="true"
        >
            <circle cx={RADIUS} cy={RADIUS} r={RADIUS} className={styles.moonDark} />
            <path d={moonLitPath(moon.phase, RADIUS)} className={styles.moonLit} />
        </svg>
    );
}
