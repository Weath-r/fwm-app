"use client";
import { useT } from "@/i18n/client";
import FthiotidaHeader from "./FthiotidaHeader";
import styles from "./fthiotida.module.css";

const SKELETON_ROWS = 9;

export default function FthiotidaSkeleton() {
    const { t } = useT("fthiotida");
    return (
        <div className={styles.section} aria-hidden="true">
            <FthiotidaHeader
                eyebrow={
                    <>
                        {t("eyebrow.tomorrow")} -{" "}
                        <span className="inline-block h-2.5 w-36 animate-pulse rounded-full bg-white/60 align-middle" />
                    </>
                }
                placeholder
                title={t("title")}
                creditPrefix={t("creditPrefix")}
                actions={<span className={`${styles.dayToggle} w-52 animate-pulse`} />}
            />
            <div className={styles.body}>
                <div className={styles.stage}>
                    <div className="absolute inset-x-[8%] bottom-[10%] top-[18%] animate-pulse rounded-[40%] bg-white/40" />
                </div>
                <div className={`${styles.railStrip} hidden lg:block`}>
                    <div className={`${styles.railList} gap-y-2`}>
                        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
                            <span
                                key={index}
                                className="h-10 animate-pulse rounded-lg bg-white/40"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="lg:hidden">
                <div className={styles.chips}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <span key={index} className={`${styles.chip} animate-pulse`} />
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <span className="h-4 w-64 animate-pulse rounded-full bg-white/40" />
            </div>
        </div>
    );
}
