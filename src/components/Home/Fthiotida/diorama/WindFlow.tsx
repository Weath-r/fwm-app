import type { CSSProperties } from "react";
import type { DioramaWind } from "@/helpers/fthiotida/sectionModel";
import styles from "../fthiotida.module.css";

type WindFlowProps = {
    wind: DioramaWind;
    dimmed: boolean;
};

export default function WindFlow({ wind, dimmed }: WindFlowProps) {
    const towardDegrees = (wind.directionDegrees + 180) % 360;
    const strength = Math.min(1, 0.4 + 0.08 * wind.beaufortMax);
    const style = {
        left: `${wind.anchor.x * 100}%`,
        top: `${wind.anchor.y * 100}%`,
        transform: `translate(-50%, -50%) rotate(${towardDegrees - 90}deg) scale(${0.75 + 0.06 * wind.beaufortMax})`,
        opacity: dimmed ? strength * 0.45 : strength,
        "--flow-duration": `${Math.max(0.7, 3.4 - 0.32 * wind.beaufortMax)}s`,
    } as CSSProperties;
    return <span className={styles.wind} style={style} />;
}
