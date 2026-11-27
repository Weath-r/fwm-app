import Image from "next/image";
import type { CSSProperties } from "react";
import { assetUrl } from "@/helpers/assetsHandling";
import type { WeatherObjectType } from "@/helpers/fthiotida/conditions";
import styles from "../fthiotida.module.css";

type Part =
    | "sun"
    | "sunSolo"
    | "sunHot"
    | "sunDim"
    | "cloudBack"
    | "cloudBackDark"
    | "cloud"
    | "cloudDark"
    | "rain"
    | "rainLight"
    | "snowLight"
    | "snowHeavy"
    | "bolt"
    | "fog"
    | "dust"
    | "shimmer"
    | "ice"
    | "gust";

const PARTS: Record<WeatherObjectType, Part[]> = {
    sun: ["sunSolo"],
    sunWithWisp: ["sun", "cloudBack"],
    sunBehindCloud: ["sun", "cloud"],
    cloudy: ["cloudBack", "cloud"],
    fog: ["fog"],
    lightRain: ["cloud", "rainLight"],
    showers: ["sun", "cloudDark", "rainLight"],
    rain: ["cloudDark", "rain"],
    thunderstorm: ["cloudBackDark", "cloudDark", "rain", "bolt"],
    lightSnow: ["cloud", "snowLight"],
    heavySnow: ["cloudBackDark", "cloudDark", "snowHeavy"],
    ice: ["ice"],
    heatwave: ["sunHot", "shimmer"],
    wind: ["cloudBack", "gust"],
    dust: ["sunDim", "dust"],
};

const GUST_PATHS = [
    "M8 28 C30 28 48 24 60 18 C68 14 76 17 75 25 C74 31 66 32 63 27",
    "M6 42 H66 C78 42 82 52 74 56",
    "M14 56 C30 56 40 58 50 60",
];

const renderPart = (part: Part) => {
    switch (part) {
        case "sun":
            return (
                <span key={part} className={styles.sun}>
                    <span className={styles.rays} />
                </span>
            );
        case "sunSolo":
            return (
                <span key={part} className={`${styles.sun} ${styles.sunSolo}`}>
                    <span className={styles.rays} />
                </span>
            );
        case "sunHot":
            return (
                <span key={part} className={`${styles.sun} ${styles.sunSolo} ${styles.sunHot}`}>
                    <span className={styles.rays} />
                </span>
            );
        case "sunDim":
            return (
                <span key={part} className={`${styles.sun} ${styles.sunSolo} ${styles.sunDim}`} />
            );
        case "cloudBack":
            return <span key={part} className={`${styles.cloud} ${styles.cloudBack}`} />;
        case "cloudBackDark":
            return (
                <span
                    key={part}
                    className={`${styles.cloud} ${styles.cloudBack} ${styles.cloudDark}`}
                />
            );
        case "cloud":
            return <span key={part} className={styles.cloud} />;
        case "cloudDark":
            return <span key={part} className={`${styles.cloud} ${styles.cloudDark}`} />;
        case "rain":
            return <span key={part} className={`${styles.precipitation} ${styles.rain}`} />;
        case "rainLight":
            return (
                <span
                    key={part}
                    className={`${styles.precipitation} ${styles.rain} ${styles.rainLight}`}
                />
            );
        case "snowLight":
            return (
                <span
                    key={part}
                    className={`${styles.precipitation} ${styles.snow} ${styles.snowLight}`}
                />
            );
        case "snowHeavy":
            return (
                <span
                    key={part}
                    className={`${styles.precipitation} ${styles.snow} ${styles.snowHeavy}`}
                />
            );
        case "bolt":
            return <span key={part} className={styles.bolt} />;
        case "fog":
        case "dust":
            return (
                <span key={part}>
                    {[0, 1, 2].map((index) => (
                        <span
                            key={index}
                            className={`${styles.band} ${part === "fog" ? styles.fogBand : styles.dustBand}`}
                        />
                    ))}
                </span>
            );
        case "shimmer":
            return <span key={part} className={styles.shimmer} />;
        case "ice":
            return (
                <span key={part} className={styles.ice}>
                    <span className={styles.iceBar} />
                </span>
            );
        case "gust":
            return (
                <svg key={part} className={styles.gust} width="92" height="78" viewBox="0 0 92 78">
                    {GUST_PATHS.map((path) => (
                        <path key={path} className={styles.gustPath} d={path} />
                    ))}
                </svg>
            );
    }
};

type WeatherObjectProps = {
    object: WeatherObjectType | null;
    fallbackIcon?: string;
    delaySeconds: number;
};

export default function WeatherObject({ object, fallbackIcon, delaySeconds }: WeatherObjectProps) {
    const floatStyle: CSSProperties = { animationDelay: `${delaySeconds}s` };
    return (
        <span className={styles.object} aria-hidden="true">
            <span className={styles.float} style={floatStyle}>
                {object && PARTS[object].map(renderPart)}
                {!object && fallbackIcon && (
                    <Image
                        className={styles.fallbackIcon}
                        src={assetUrl(fallbackIcon)}
                        alt=""
                        width={64}
                        height={64}
                        unoptimized
                    />
                )}
            </span>
        </span>
    );
}
