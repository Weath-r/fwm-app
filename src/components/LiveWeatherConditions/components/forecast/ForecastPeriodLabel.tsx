"use client";
import { useT } from "@/i18n/client";
import { ForecastPeriod } from "@/types";

export function ForecastPeriodLabel({ period }: { period: ForecastPeriod }) {
    const { i18n } = useT("forecasts");
    const selectedLanguage = i18n.language;
    return i18n.getFixedT(selectedLanguage, "forecasts")(`forecastPeriods.${period}`);
}
