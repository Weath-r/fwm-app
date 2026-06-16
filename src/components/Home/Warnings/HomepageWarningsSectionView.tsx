"use client";
import Link from "next/link";
import { ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { WeatherWarnings } from "@/types";
import { useT } from "@/i18n/client";
import { timeOnlyUtil } from "@/utils/dateTimeUtils";
import HazardIcon from "@/components/Warnings/components/HazardIcon";

export type LocationSummary = {
    label: string;
    color: string;
    level: string;
    levelId: number;
};

type HomepageWarningsSectionViewProps = {
    lng: string;
    activeWarnings: WeatherWarnings[];
    locationSummaries: LocationSummary[];
};

export default function HomepageWarningsSectionView({
    lng,
    activeWarnings,
    locationSummaries,
}: HomepageWarningsSectionViewProps) {
    const { t } = useT("homepage");

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

            {activeWarnings.length === 0 ? (
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
                        {locationSummaries.map((location) => (
                            <div
                                key={location.label}
                                className="flex items-center gap-2 rounded-full border px-3 py-1.5"
                                style={{
                                    borderColor: `${location.color}50`,
                                    backgroundColor: `${location.color}18`,
                                }}
                            >
                                <span
                                    className="size-2 shrink-0 rounded-full"
                                    style={{ backgroundColor: location.color }}
                                />
                                <span className="text-xs font-semibold text-primary">
                                    {location.label}
                                </span>
                                <span className="text-xs text-primary/60">{location.level}</span>
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
