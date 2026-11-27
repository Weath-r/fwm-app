import type { GroundEffect as GroundEffectType } from "@/helpers/fthiotida/conditions";
import type { SlabPoint } from "@/utils/geoToSlab";
import styles from "../fthiotida.module.css";

const EFFECT_CLASSES: Record<GroundEffectType, string> = {
    sunlight: styles.sunlight,
    cloudShadow: styles.cloudShadow,
    wet: styles.wet,
    snowGlow: styles.snowGlow,
    frost: styles.frost,
    heat: styles.heat,
    dust: styles.dustPatch,
};

type GroundEffectProps = {
    effect: GroundEffectType;
    anchor: SlabPoint;
    dimmed: boolean;
};

export default function GroundEffect({ effect, anchor, dimmed }: GroundEffectProps) {
    return (
        <span
            className={`${styles.ground} ${EFFECT_CLASSES[effect]}`}
            style={{
                left: `${anchor.x * 100}%`,
                top: `${anchor.y * 100}%`,
                opacity: dimmed ? 0.35 : 1,
            }}
        />
    );
}
