"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { DataService } from "@/services/DataService";
import { WeatherWarnings } from "@/types";
import { useT } from "@/i18n/client";
import { translatedContent } from "@/utils/transformTranslations";
import { timeOnlyUtil } from "@/utils/dateTimeUtils";
import HazardIcon from "@/components/Warnings/components/HazardIcon";

function normalizeWarnings(warnings: WeatherWarnings[], language: string): WeatherWarnings[] {
    return warnings.map((w) => {
        const [hazard] = translatedContent({ data: [w.hazard_id], selectedLanguage: language });
        const [level] = translatedContent({ data: [w.level_id], selectedLanguage: language });
        const [location] = translatedContent({
            data: [w.warning_location_id],
            selectedLanguage: language,
        });
        return {
            ...w,
            hazard_id: { ...w.hazard_id, asset: hazard.asset || "", label: hazard.label },
            level_id: {
                ...w.level_id,
                color: level.color || "",
                label: level.label,
                id: level.id ?? w.level_id.id,
            },
            warning_location_id: { ...w.warning_location_id, label: location.label },
        };
    });
}

type LocationSummary = {
    label: string;
    color: string;
    level: string;
    levelId: number;
};

export default function HomepageWarningsSection() {
    const [warnings, setWarnings] = useState<WeatherWarnings[]>([]);
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useT("homepage");
    const lng = i18n.language;

    useEffect(() => {
        const dataService = new DataService();
        dataService
            .fetchWeatherWarningsByCreatedDate("")
            .then((data) => setWarnings(normalizeWarnings(data, lng)))
            .catch(() => setWarnings([]))
            .finally(() => setLoading(false));
    }, [lng]);

    const activeWarnings = warnings.filter((w) => w.level_id.id > 1);

    const locationSummaries = activeWarnings.reduce<Record<string, LocationSummary>>(
        (locationMap, warning) => {
            const locationLabel = warning.warning_location_id.label;
            if (
                !locationMap[locationLabel] ||
                warning.level_id.id > locationMap[locationLabel].levelId
            ) {
                locationMap[locationLabel] = {
                    label: locationLabel,
                    color: warning.level_id.color,
                    level: warning.level_id.label,
                    levelId: warning.level_id.id,
                };
            }
            return locationMap;
        },
        {}
    );

    return (
        <div className="bg-white rounded-lg p-4 w-full">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-primary font-bold text-lg">{t("warnings.heading")}</h2>
                <Link
                    href={`/${lng}/warnings`}
                    className="text-sm text-primary/60 hover:text-primary transition-colors"
                >
                    {t("warnings.viewAll")}
                </Link>
            </div>

            {loading ? (
                <div className="flex flex-col gap-2">
                    <div className="h-10 animate-pulse rounded-lg bg-secondary" />
                    <div className="h-10 animate-pulse rounded-lg bg-secondary" />
                </div>
            ) : activeWarnings.length === 0 ? (
                <div className="flex items-center gap-3 rounded-lg border border-success/25 bg-success/10 p-4">
                    <ShieldCheckIcon className="size-6 shrink-0 text-success" />
                    <div>
                        <p className="text-sm font-medium text-primary">
                            {t("warnings.noWarnings")}
                        </p>
                        <p className="text-xs text-primary/60">{t("warnings.allClear")}</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                        {Object.values(locationSummaries).map((loc) => (
                            <div
                                key={loc.label}
                                className="flex items-center gap-2 rounded-full border px-3 py-1.5"
                                style={{
                                    borderColor: `${loc.color}50`,
                                    backgroundColor: `${loc.color}18`,
                                }}
                            >
                                <span
                                    className="size-2 shrink-0 rounded-full"
                                    style={{ backgroundColor: loc.color }}
                                />
                                <span className="text-xs font-semibold text-primary">
                                    {loc.label}
                                </span>
                                <span className="text-xs text-primary/60">{loc.level}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        {activeWarnings.map((warning) => (
                            <div
                                key={warning.id}
                                className="flex items-center gap-3 rounded-lg border-l-4 bg-secondary/50 px-4 py-3"
                                style={{ borderLeftColor: warning.level_id.color }}
                            >
                                <div
                                    className="size-9 shrink-0 rounded-lg p-2"
                                    style={{ backgroundColor: warning.level_id.color }}
                                >
                                    {warning.hazard_id.asset && (
                                        <HazardIcon
                                            asset={warning.hazard_id.asset}
                                            label={warning.hazard_id.label}
                                            className="fill-white"
                                        />
                                    )}
                                </div>

                                <div className="flex min-w-0 flex-col">
                                    <p className="truncate text-sm font-semibold text-primary leading-tight">
                                        {warning.hazard_id.label}
                                    </p>
                                    <p className="text-xs text-primary/60">
                                        {warning.warning_location_id.label} ·{" "}
                                        {warning.level_id.label}
                                    </p>
                                </div>

                                <div className="ml-auto flex shrink-0 items-center gap-1 text-xs text-primary/50">
                                    <ClockIcon className="size-3" />
                                    <span>
                                        {timeOnlyUtil(warning.start_date)} –{" "}
                                        {timeOnlyUtil(warning.end_date)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
