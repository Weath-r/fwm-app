"use client";
import Link from "next/link";
import { useT } from "@/i18n/client";
import styles from "../fthiotida.module.css";

type DormantPanelProps = {
    lng: string;
};

export default function DormantPanel({ lng }: DormantPanelProps) {
    const { t } = useT("fthiotida");
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex items-start gap-3.5">
                <span className={`${styles.breathingDot} mt-2.5 shrink-0`} aria-hidden="true" />
                <div className="flex flex-col gap-1">
                    <h3 className="m-0 text-xl font-bold leading-tight tracking-tight">
                        {t("dormant.heading")}
                    </h3>
                    <p className={`${styles.muted} m-0 text-[15px] leading-relaxed`}>
                        {t("dormant.body")}
                    </p>
                </div>
            </div>
            <Link href={`/${lng}/weather-map`} className={`${styles.pillButton} shrink-0`}>
                {t("dormant.live")}
            </Link>
        </div>
    );
}
