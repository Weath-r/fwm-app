import type { DioramaArea } from "@/helpers/fthiotida/sectionModel";
import WeatherObject from "../diorama/WeatherObject";
import styles from "../fthiotida.module.css";

type AreaIconProps = {
    area: DioramaArea;
};

export default function AreaIcon({ area }: AreaIconProps) {
    return (
        <span className={styles.areaIcon} aria-hidden="true">
            <WeatherObject
                object={area.appearance?.object ?? null}
                fallbackIcon={area.conditionIcon}
                delaySeconds={0}
            />
        </span>
    );
}
