import type { DioramaSnowCap } from "@/helpers/fthiotida/sectionModel";
import styles from "../fthiotida.module.css";

type SnowCapsProps = {
    caps: DioramaSnowCap[];
};

export default function SnowCaps({ caps }: SnowCapsProps) {
    return (
        <>
            {caps
                .filter((cap) => cap.opacity > 0)
                .map((cap) => (
                    <span
                        key={cap.id}
                        className={styles.snowCap}
                        style={{
                            left: `${cap.anchor.x * 100}%`,
                            top: `${cap.anchor.y * 100}%`,
                            opacity: cap.opacity,
                        }}
                    />
                ))}
        </>
    );
}
