"use client";
import { ForecastData, BaseSignal, BasePayload, ForecastPeriod } from "@/types";
import { useT } from "@/i18n/client";

import { detectTemperatureSignals } from "@/helpers/forecastSignals/temperatureSignalCalculations";
import { detectWindSignals } from "@/helpers/forecastSignals/windSignalCalculations";
import { detectPrecipSignals } from "@/helpers/forecastSignals/precipSignalCalculations";
import { detectCloudinessSignals } from "@/helpers/forecastSignals/cloudinessSignalCalculations";
import { timestampToHour, hourToPeriod } from "@/helpers/forecastSignals/generalSignalCalculations";
import {
    calculateSignalsImportance,
    resolveDaySummary,
    resolvePeriodSummaries,
} from "@/helpers/forecastSignals/calculateForecastSignalsText";
import { windDirectionCalc } from "@/helpers/windDirectionCalculator";
import { fullDateNoTime } from "@/utils/dateTimeUtils";
import { ForecastSignalTranslationText } from "./ForecastSignalTranslationText";

type ForecastSummaryProps = {
    forecast: Partial<Record<string, ForecastData[]>>;
    activeDate: string;
};

export function ForecastSummary({ forecast, activeDate }: ForecastSummaryProps) {
    const daySummary = new Map<string, BaseSignal<BasePayload>[]>();
    const periodSummaries = new Map<string, Map<ForecastPeriod, BaseSignal<BasePayload>[]>>();
    const dateNow = new Date();
    const currentPeriodToday = hourToPeriod(dateNow.getHours());
    const dateToday = fullDateNoTime(dateNow);

    for (const date in forecast) {
        if (!forecast[date]) break;
        const temperatures = forecast[date].map((item) => {
            return {
                hour: timestampToHour(item.time),
                temperature: item.temperature,
                period: hourToPeriod(timestampToHour(item.time)),
            };
        });
        const windData = forecast[date].map((item) => {
            return {
                hour: timestampToHour(item.time),
                windspd: item.windspd,
                winddir: windDirectionCalc(item.winddir),
                period: hourToPeriod(timestampToHour(item.time)),
            };
        });
        const precipData = forecast[date].map((item) => {
            return {
                hour: timestampToHour(item.time),
                precip: item.percipitation,
                accumulated_rain: item.accumulated_rain,
                snow: item.snow,
                period: hourToPeriod(timestampToHour(item.time)),
            };
        });

        const cloudData = forecast[date].map((item) => {
            return {
                hour: timestampToHour(item.time),
                cloudcover: item.cloudcover,
                period: hourToPeriod(timestampToHour(item.time)),
            };
        });
        const signalsTemp = detectTemperatureSignals(temperatures);
        const signalsWind = detectWindSignals(windData);
        const signalsPrecip = detectPrecipSignals(precipData);
        const signalsCloudiness = detectCloudinessSignals(cloudData);

        const allSignals = [...signalsTemp, ...signalsWind, ...signalsCloudiness, ...signalsPrecip];
        const sortedSignals = calculateSignalsImportance(allSignals);

        const daySummaryForDate = resolveDaySummary(sortedSignals);
        const periodSummaryForDate = resolvePeriodSummaries(sortedSignals);

        daySummary.set(date, daySummaryForDate);
        periodSummaries.set(date, periodSummaryForDate);
    }
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;

    return (
        <div>
            <h2 className="text-primary font-bold text-sm">
                {i18n.getFixedT(selectedLanguage, "stationModal")("daySummary")}
            </h2>
            <p className="text-primary text-sm">
                {daySummary.get(activeDate)?.map((signal, index) => {
                    return (
                        <ForecastSignalTranslationText
                            key={index}
                            signalType={signal.type}
                            signalPayload={signal.payload}
                        />
                    );
                })}
            </p>
            {periodSummaries.get(activeDate) && (
                <div className="mt-2">
                    {activeDate === dateToday && (
                        <>
                            <h2 className="text-primary font-bold text-sm">
                                {i18n.getFixedT(selectedLanguage, "stationModal")("nextFewHours")}
                            </h2>
                            <p className="text-primary text-sm">
                                {Array.from(periodSummaries.get(activeDate)!.entries())
                                    .filter(([period]) => period === currentPeriodToday)
                                    .map(([period, signals]) => {
                                        return (
                                            <span key={period}>
                                                {signals.map((signal, index) => (
                                                    <span key={index}>
                                                        <ForecastSignalTranslationText
                                                            signalType={signal.type}
                                                            signalPayload={signal.payload}
                                                        />
                                                    </span>
                                                ))}
                                            </span>
                                        );
                                    })}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
