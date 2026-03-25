import { PrecipitationSignal, SignalCategory, BaseSignal, BasePayload } from "@/types";
import {
    hourToPeriod,
    createDaySignal,
    createPeriodSignal,
} from "@/helpers/forecastSignals/generalSignalCalculations";

type HourlyPrecipData = {
    period: string;
    precip: number;
    snow: number;
    accumulated_rain: number;
    hour: number;
};

const DEFAULT_THRESHOLDS = {
    wetHour: 0.2,
    heavyHour: 3.0,
    persistentHours: 3,
    confinedWindowHours: 6,
    briefPeriodMaxHours: 2,
};

export const detectPrecipSignals = (data: HourlyPrecipData[], thresholds = DEFAULT_THRESHOLDS) => {
    const signals: BaseSignal<BasePayload>[] = [];

    if (data.length === 0) return signals;

    const wetHours = data.filter((h) => h.precip > thresholds.wetHour);
    const heavyHours = data.filter((h) => h.precip >= thresholds.heavyHour);

    const totalWetHours = wetHours.length;
    const totalHeavyHours = heavyHours.length;

    const totalRain = data.reduce((sum, h) => sum + h.precip, 0);
    const totalSnow = data.reduce((sum, h) => sum + h.snow, 0);

    let maxConsecutiveWet = 0;
    let currentStreak = 0;

    for (const hour of data) {
        if (hour.precip > thresholds.wetHour) {
            currentStreak++;
            maxConsecutiveWet = Math.max(maxConsecutiveWet, currentStreak);
        } else {
            currentStreak = 0;
        }
    }

    // Day based signals
    if (totalWetHours === 0) {
        signals.push(createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.NONE, 1));
        return signals;
    }

    signals.push(
        createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.PRESENT, 2, {
            totalWetHours,
        })
    );

    if (totalHeavyHours > 0) {
        signals.push(
            createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.HEAVY, 4, {
                totalHeavyHours,
            })
        );
    }

    if (maxConsecutiveWet >= thresholds.persistentHours) {
        signals.push(
            createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.PERSISTENT, 4, {
                maxConsecutiveWet,
            })
        );
    } else if (totalWetHours > 0) {
        signals.push(
            createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.INTERMITTENT, 3, {
                totalWetHours,
            })
        );
    }

    if (totalRain > 0 || totalSnow > 0) {
        const dominantType = totalSnow > totalRain ? "snow" : "rain";

        signals.push(
            createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.DOMINANT_TYPE, 2, {
                dominantType,
            })
        );
    }

    if (totalWetHours <= thresholds.confinedWindowHours) {
        const firstWet = wetHours[0]?.hour;
        const lastWet = wetHours[wetHours.length - 1]?.hour;

        signals.push(
            createDaySignal(SignalCategory.PRECIPITATION, PrecipitationSignal.WINDOW_CONFINED, 3, {
                startHour: firstWet,
                endHour: lastWet,
            })
        );
    }

    // Period based signals

    const periods = data.map((d) => hourToPeriod(d.hour));
    const uniquePeriods = new Set(periods);
    const dataPerPeriod = data.reduce(
        (acc, curr) => {
            const period = curr.period;
            if (!acc[period]) {
                acc[period] = [];
            }
            acc[period].push(curr);
            return acc;
        },
        {} as Record<string, HourlyPrecipData[]>
    );

    uniquePeriods.forEach((period) => {
        const periodData = dataPerPeriod[period];
        const wetInPeriod = periodData.filter((h) => h.precip > thresholds.wetHour);
        const heavyInPeriod = periodData.filter((h) => h.precip >= thresholds.heavyHour);

        if (wetInPeriod.length === 0) {
            return signals.push(
                createPeriodSignal(
                    period as any,
                    SignalCategory.PRECIPITATION,
                    PrecipitationSignal.PERIOD_NONE,
                    1
                )
            );
        }

        if (heavyInPeriod.length > 0) {
            signals.push(
                createPeriodSignal(
                    period as any,
                    SignalCategory.PRECIPITATION,
                    PrecipitationSignal.PERIOD_HEAVY,
                    4,
                    { heavyHours: heavyInPeriod.length }
                )
            );
        }

        if (wetInPeriod.length <= thresholds.briefPeriodMaxHours) {
            signals.push(
                createPeriodSignal(
                    period as any,
                    SignalCategory.PRECIPITATION,
                    PrecipitationSignal.PERIOD_BRIEF,
                    2,
                    { wetHours: wetInPeriod.length }
                )
            );
        } else {
            signals.push(
                createPeriodSignal(
                    period as any,
                    SignalCategory.PRECIPITATION,
                    PrecipitationSignal.PERIOD_PERSISTENT,
                    3,
                    { wetHours: wetInPeriod.length }
                )
            );
        }
    });

    return signals;
};
