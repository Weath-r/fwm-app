"use client";
import { useT } from "@/i18n/client";
import { BasePayload } from "@/types";
type ForecastSignalTranslationTextProps = {
    signalType: string;
    signalPayload?: BasePayload;
};

export function ForecastSignalTranslationText({
    signalType,
    signalPayload,
}: ForecastSignalTranslationTextProps) {
    const { i18n } = useT("forecasts");
    const selectedLanguage = i18n.language;
    const { i18n: i18n_conditions } = useT("weather_conditions");
    const winddir = i18n.getFixedT(
        selectedLanguage,
        "forecasts"
    )(`windDirectionsForecast.${signalPayload?.dominantDir}`);
    const dominantType = i18n_conditions.getFixedT(
        selectedLanguage,
        "weather_conditions"
    )(`windDir.${signalPayload?.dominantType}`);

    return i18n.getFixedT(selectedLanguage, "forecasts")(`forecastSignals.${signalType}`, {
        direction: winddir,
        type: dominantType,
        hour: signalPayload?.hour || signalPayload?.startHour || signalPayload?.endHour,
    });
}
