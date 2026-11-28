import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./fthiotida.module.css";

type FthiotidaHeaderProps = {
    eyebrow: ReactNode;
    title: string;
    subtitle?: string;
    creditPrefix: string;
    titleId?: string;
    actions?: ReactNode;
    placeholder?: boolean;
};

export default function FthiotidaHeader({
    eyebrow,
    title,
    subtitle,
    creditPrefix,
    titleId,
    actions,
    placeholder = false,
}: FthiotidaHeaderProps) {
    const Title = placeholder ? "p" : "h2";
    return (
        <header
            className={`${styles.header} flex flex-wrap items-start justify-between gap-5 px-4 pt-6 md:px-12 md:pt-10`}
        >
            <div className="flex flex-col gap-2">
                <p
                    className={`${styles.muted} m-0 text-xs font-semibold uppercase tracking-[0.12em]`}
                >
                    {eyebrow}
                </p>
                <Title
                    id={titleId}
                    className="m-0 text-3xl font-bold leading-tight tracking-tight md:text-5xl"
                >
                    {title}
                </Title>
                {subtitle && <p className={`${styles.muted} m-0 text-base`}>{subtitle}</p>}
            </div>
            <div className="flex flex-wrap items-start justify-end gap-3">
                {actions}
                <a
                    href="https://fthiotida-meteogroup.gr/"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.credit} flex min-h-11 items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 no-underline`}
                >
                    <Image
                        className={styles.markLight}
                        src="/assets/fthiotida/meteogroup-mark-light.svg"
                        alt=""
                        width={48}
                        height={32}
                        unoptimized
                    />
                    <Image
                        className={styles.markDark}
                        src="/assets/fthiotida/meteogroup-mark-dark.svg"
                        alt=""
                        width={48}
                        height={32}
                        unoptimized
                    />
                    <span className="flex flex-col leading-tight">
                        <span className={`${styles.muted} text-[11px]`}>{creditPrefix}</span>
                        <span className="text-sm font-semibold">Fthiotida Meteogroup</span>
                    </span>
                </a>
            </div>
        </header>
    );
}
