"use client";
import { useState, type ReactNode } from "react";
import { useT } from "@/i18n/client";
import { Dialog, DialogClose, DialogContent } from "@/components/Common/CommonDialog";
import type { Daypart } from "@/utils/sky";
import styles from "../fthiotida.module.css";

type AreaSheetProps = {
    title: string;
    daypart: Daypart;
    onClose: () => void;
    children: ReactNode;
};

export default function AreaSheet({ title, daypart, onClose, children }: AreaSheetProps) {
    const { t } = useT("fthiotida");
    const [opener] = useState(() => document.activeElement as HTMLElement | null);
    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                variant="sheet"
                flush
                dialogTitle={title}
                className={styles.sheet}
                data-daypart={daypart}
                onCloseAutoFocus={(event) => {
                    event.preventDefault();
                    opener?.focus();
                }}
            >
                <div className={styles.sheetTop}>
                    <span className={styles.sheetHandle} aria-hidden="true" />
                    <DialogClose asChild>
                        <button
                            type="button"
                            className={styles.sheetClose}
                            aria-label={t("card.close")}
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
                    </DialogClose>
                </div>
                {children}
            </DialogContent>
        </Dialog>
    );
}
