import { WindSignal, SignalCategory, BaseSignal, BasePayload } from "@/types";
import {
    hourToPeriod,
    createDaySignal,
    createPeriodSignal,
} from "@/helpers/forecastSignals/generalSignalCalculations";

type HourlyWindData = {
    period: string;
    windspd: number;
    winddir: string;
    hour: number;
};

const DEFAULT_THRESHOLDS = {
    dayModerate: 20,
    dayStrong: 35,
    daySever: 55,
    increasing: 15,
    decreasing: -15,
    increaseDelta: 15,
    decreaseDelta: -15,
    increaseHours: 4,
    periodCalm: 10,
    periodModerate: 25,
    periodStrong: 30,
};

export const detectWindSignals = (data: HourlyWindData[], thresholds = DEFAULT_THRESHOLDS) => {
    const signals: BaseSignal<BasePayload>[] = [];

    if (data.length === 0) return signals;

    // Calculate general functions
    const windMax = Math.max(...data.map((d) => d.windspd));

    const windDirectionsSummary = data.reduce(
        (acc, curr) => {
            acc[curr.winddir] = acc[curr.winddir] ? acc[curr.winddir] + 1 : 1;
            return acc;
        },
        {} as Record<string, number>
    );
    const dominantDir = Object.entries(windDirectionsSummary).sort((a, b) => b[1] - a[1])[0];
    const peakHour = data.reduce((a, b) => (b.windspd > a.windspd ? b : a)).hour;

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
        {} as Record<string, HourlyWindData[]>
    );

    // Day based signals

    signals.push(
        createDaySignal(SignalCategory.WIND, WindSignal.DIRECTION_DOMINANT, 2, {
            dominantDir: dominantDir[0],
        })
    );
    signals.push(
        createDaySignal(SignalCategory.WIND, WindSignal.PERIOD_PEAK, 2, { hour: peakHour })
    );

    if (windMax >= thresholds.dayModerate && windMax < thresholds.dayStrong) {
        signals.push(createDaySignal(SignalCategory.WIND, WindSignal.DAY_MODERATE, 3, { windMax }));
    }
    if (windMax >= thresholds.dayStrong && windMax < thresholds.daySever) {
        signals.push(createDaySignal(SignalCategory.WIND, WindSignal.DAY_STRONG, 4, { windMax }));
    }
    if (windMax >= thresholds.daySever) {
        signals.push(createDaySignal(SignalCategory.WIND, WindSignal.DAY_SEVERE, 5, { windMax }));
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[j].hour - data[i].hour > thresholds.increaseHours) break;

            const delta = Math.round(data[j].windspd - data[i].windspd);

            if (delta >= thresholds.increaseDelta) {
                signals.push(
                    createDaySignal(SignalCategory.WIND, WindSignal.INCREASING, 3, {
                        hour: data[j].hour,
                    })
                );
                i = j;
                break;
            }
            if (delta <= thresholds.decreaseDelta) {
                signals.push(
                    createDaySignal(SignalCategory.WIND, WindSignal.DECREASING, 3, {
                        hour: data[j].hour,
                    })
                );
                i = j;
                break;
            }
        }
    }

    // Period based signals

    uniquePeriods.forEach((period) => {
        const periodData = dataPerPeriod[period];
        const meanWind = Math.round(
            periodData.reduce((acc, curr) => acc + curr.windspd, 0) / periodData.length
        );

        if (meanWind < thresholds.periodModerate) {
            signals.push(
                createPeriodSignal(period, SignalCategory.WIND, WindSignal.PERIOD_CALM, 1, {
                    meanWind,
                })
            );
        } else if (meanWind >= thresholds.periodStrong) {
            signals.push(
                createPeriodSignal(period, SignalCategory.WIND, WindSignal.PERIOD_STRONG, 3, {
                    meanWind,
                })
            );
        } else {
            signals.push(
                createPeriodSignal(period, SignalCategory.WIND, WindSignal.PERIOD_MODERATE, 2, {
                    meanWind,
                })
            );
        }
    });

    return signals;
};
