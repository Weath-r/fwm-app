"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useT } from "@/i18n/client";
import styles from "../fthiotida.module.css";

type AreaSheetProps = {
    titleId: string;
    onClose: () => void;
    children: ReactNode;
};

export default function AreaSheet({ titleId, onClose, children }: AreaSheetProps) {
    const { t } = useT("fthiotida");
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        closeRef.current?.focus({ preventScroll: true });
    }, []);

    return (
        <div role="dialog" aria-labelledby={titleId} className={styles.sheet}>
            <div className={styles.sheetTop}>
                <span className={styles.sheetHandle} aria-hidden="true" />
                <button
                    ref={closeRef}
                    type="button"
                    className={styles.sheetClose}
                    aria-label={t("card.close")}
                    onClick={onClose}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            </div>
            {children}
        </div>
    );
}
