"use client";
import { useState } from "react";
import { useT } from "@/i18n/client";

export default function HomepageAboutSection() {
    const { t } = useT("homepage");
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="bg-white rounded-lg w-full p-6 text-primary/70 text-sm leading-relaxed">
            <h2 className="text-primary font-bold text-base mb-3">{t("about.heading")}</h2>
            <p className="mb-3">{t("about.intro")}</p>

            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 overflow-hidden transition-all duration-300 ${
                    expanded ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
                }`}
                aria-hidden={!expanded}
            >
                <div>
                    <h3 className="font-semibold text-primary mb-1">{t("about.networkHeading")}</h3>
                    <p>{t("about.networkText")}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-primary mb-1">
                        {t("about.forecastsHeading")}
                    </h3>
                    <p>{t("about.forecastsText")}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-primary mb-1">
                        {t("about.warningsHeading")}
                    </h3>
                    <p>{t("about.warningsText")}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-primary mb-1">
                        {t("about.coverageHeading")}
                    </h3>
                    <p>{t("about.coverageText")}</p>
                </div>
            </div>

            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-3 text-primary font-medium hover:underline focus:outline-none"
                aria-expanded={expanded}
            >
                {expanded ? t("about.showLess") : t("about.showMore")}
            </button>
        </section>
    );
}
