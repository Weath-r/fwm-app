import Link from "next/link";
import OffGridStationScene from "./OffGridStationScene";
import styles from "./NotFound.module.css";

type NotFoundPageProps = {
    lng: string;
    t: (key: string) => string;
};

export default function NotFoundPage({ lng, t }: Readonly<NotFoundPageProps>) {
    return (
        <main className="flex min-h-[calc(100vh_-_var(--header-height))] items-center justify-center p-[clamp(28px,5vw,64px)]">
            <div className="grid w-full max-w-[1120px] grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(28px,4vw,56px)] max-[900px]:grid-cols-1 max-[900px]:gap-2">
                <div className="max-[900px]:order-2 max-[900px]:text-center">
                    <span className="mb-[22px] inline-flex items-center gap-[9px] text-[13px] font-semibold uppercase tracking-[1.5px] text-danger max-[900px]:justify-center">
                        <span className={`size-[9px] rounded-full bg-danger ${styles.ring}`}></span>
                        <span>{t("eyebrow")}</span>
                    </span>
                    <div className="mb-[14px] bg-gradient-to-br from-primary to-accent bg-clip-text text-[clamp(84px,15vw,156px)] font-bold leading-[0.9] tracking-[-4px] text-transparent">
                        404
                    </div>
                    <h1 className="mb-4 text-[clamp(24px,3.2vw,34px)] text-primary font-semibold leading-[1.15]">
                        {t("title")}
                    </h1>
                    <p className="mb-[26px] max-w-[460px] text-[clamp(15px,1.6vw,17px)] font-light leading-[1.65] text-[#4a5b66] max-[900px]:mx-auto">
                        {t("body")}
                    </p>

                    <div className="mb-[22px] flex flex-wrap gap-[14px] max-[900px]:justify-center">
                        <Link
                            className="inline-flex items-center gap-[9px] rounded-[10px] bg-primary px-6 py-[13px] text-[15px] font-semibold text-secondary no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16232b] hover:shadow-[0_10px_24px_rgba(43,61,73,0.25)]"
                            href={`/${lng}`}
                        >
                            <svg
                                className="size-[17px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 12l9-9 9 9" />
                                <path d="M5 10v10h14V10" />
                            </svg>
                            <span>{t("primaryCta")}</span>
                        </Link>
                        <Link
                            className="inline-flex items-center gap-[9px] rounded-[10px] border-[1.5px] border-primary/20 px-6 py-[13px] text-[15px] font-semibold text-primary no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                            href={`/${lng}/weather-map`}
                        >
                            <svg
                                className="size-[17px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
                                <path d="M9 3v15M15 6v15" />
                            </svg>
                            <span>{t("secondaryCta")}</span>
                        </Link>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[13.5px] italic text-gray max-[900px]:justify-center">
                        <svg
                            className="size-4 opacity-80"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 18a5 5 0 0 0-10 0" />
                            <line x1="12" y1="2" x2="12" y2="9" />
                            <line x1="4.2" y1="10.2" x2="5.6" y2="11.6" />
                            <line x1="1" y1="18" x2="3" y2="18" />
                            <line x1="21" y1="18" x2="23" y2="18" />
                            <line x1="18.4" y1="10.2" x2="19.8" y2="8.8" />
                        </svg>
                        <span>{t("forecast")}</span>
                    </span>
                </div>

                <div className="relative aspect-[1/0.92] overflow-hidden rounded-[24px] bg-[radial-gradient(120%_120%_at_70%_10%,#33485704_0%,transparent_40%),linear-gradient(165deg,#2b3d49_0%,#1c2c35_55%,#16232b_100%)] shadow-[0_30px_60px_-20px_rgba(22,35,43,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] max-[900px]:order-1">
                    <span className="absolute left-[22px] top-5 z-[3] font-mono text-[11px] tracking-[0.5px] text-gray/70">
                        {t("coordinates")}
                    </span>
                    <OffGridStationScene />
                    <div className="absolute bottom-[22px] left-[22px] z-[3] rounded-[12px] border border-accent/25 bg-[rgba(10,18,23,0.72)] px-4 py-3 font-mono shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                        <div className="mb-1 text-[9.5px] uppercase tracking-[1.5px] text-[#7c96a3]">
                            {t("readoutLabel")}
                        </div>
                        <div className="text-[22px] font-semibold tracking-[2px] text-accent">
                            {t("readoutValue")}
                        </div>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[1px] text-danger">
                            <span
                                className={`size-1.5 rounded-full bg-danger ${styles.blink}`}
                            ></span>
                            <span>{t("status")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
