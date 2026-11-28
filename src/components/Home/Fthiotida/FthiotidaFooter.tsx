"use client";
import Link from "next/link";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types";
import type { Sky } from "@/hooks/useSky";
import DaylightBar from "./DaylightBar";
import styles from "./fthiotida.module.css";

type FthiotidaFooterProps = {
    lng: string;
    sky: Sky;
    showWindLegend: boolean;
};

export default function FthiotidaFooter({ lng, sky, showWindLegend }: FthiotidaFooterProps) {
    const { t } = useT("fthiotida");
    return (
        <footer className={styles.footer}>
            <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2">
                {showWindLegend && (
                    <span className="flex min-w-0 items-center gap-2">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="shrink-0"
                        >
                            <path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7" />
                        </svg>
                        {t("footer.windLegend", { unit: Measurements.BFT })}
                    </span>
                )}
                <span className="sm:hidden">
                    <DaylightBar sky={sky} />
                </span>
            </div>
            <Link href={`/${lng}/fthiotida-forecast`} className={styles.footerLink}>
                {t("footer.archive")}
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </Link>
        </footer>
    );
}
