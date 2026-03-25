import { TemperatureSignal, SignalCategory, BaseSignal, BasePayload } from "@/types";
import {
    hourToPeriod,
    createDaySignal,
    createPeriodSignal,
} from "@/helpers/forecastSignals/generalSignalCalculations";

type HourlyTemperatureData = {
    period: string;
    temperature: number;
    hour: number;
};

const DEFAULT_THRESHOLDS = {
    dayCold: 10,
    dayFreezing: 0,
    dayWarm: 25,
    dayHot: 30,
    dayVHot: 35,
    largeRange: 8,
    smallRange: 3,
    periodSteady: 2,
};

export const detectTemperatureSignals = (
    data: HourlyTemperatureData[],
    thresholds = DEFAULT_THRESHOLDS
): BaseSignal<BasePayload>[] => {
    const signals: BaseSignal<BasePayload>[] = [];
    if (data.length === 0) return signals;

    // Calculate general functions
    const tempMin = Math.min(...data.map((d) => d.temperature));
    const tempMax = Math.max(...data.map((d) => d.temperature));
    const tempDelta = Math.round(tempMax - tempMin);

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
        {} as Record<string, HourlyTemperatureData[]>
    );

    // Day based signals
    if (tempMax < thresholds.dayCold && tempMax > thresholds.dayFreezing) {
        signals.push(
            createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.DAY_COLD, 1, { tempMax })
        );
    }
    if (tempMax > thresholds.dayWarm && tempMax <= thresholds.dayHot) {
        signals.push(
            createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.DAY_WARM, 1, { tempMax })
        );
    }
    if (tempMax > thresholds.dayHot && tempMax <= thresholds.dayVHot) {
        signals.push(
            createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.TEMP_DAY_HOT, 1, {
                tempMax,
            })
        );
    }
    if (tempMax > thresholds.dayVHot) {
        signals.push(
            createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.TEMP_DAY_VHOT, 1, {
                tempMax,
            })
        );
    }
    if (tempMax <= thresholds.dayFreezing) {
        signals.push(createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.FROST_RISK, 1));
    }
    if (tempDelta >= thresholds.largeRange) {
        signals.push(
            createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.DAY_LARGE_RANGE, 2, {
                tempDelta,
            })
        );
    }
    if (tempDelta <= thresholds.smallRange) {
        signals.push(
            createDaySignal(SignalCategory.TEMPERATURE, TemperatureSignal.DAY_SMALL_RANGE, 1)
        );
    }

    // Period based signals

    uniquePeriods.forEach((period) => {
        const periodData = dataPerPeriod[period];
        const periodTempMin = Math.min(...periodData.map((d) => d.temperature));
        const periodTempMax = Math.max(...periodData.map((d) => d.temperature));
        const periodTempDelta = periodTempMax - periodTempMin;
        const endTemp = periodData[periodData.length - 1].temperature;
        const startTemp = periodData[0].temperature;

        if (periodTempMax > thresholds.dayWarm && periodTempMax <= thresholds.dayHot) {
            signals.push(
                createPeriodSignal(
                    period,
                    SignalCategory.TEMPERATURE,
                    TemperatureSignal.PERIOD_WARM,
                    1
                )
            );
        }
        if (periodTempMin <= thresholds.dayFreezing) {
            signals.push(
                createPeriodSignal(
                    period,
                    SignalCategory.TEMPERATURE,
                    TemperatureSignal.PERIOD_COLD,
                    1
                )
            );
        }

        if (periodTempDelta < thresholds.periodSteady) {
            signals.push(
                createPeriodSignal(
                    period,
                    SignalCategory.TEMPERATURE,
                    TemperatureSignal.PERIOD_STEADY,
                    1
                )
            );
        } else if (endTemp > startTemp) {
            signals.push(
                createPeriodSignal(
                    period,
                    SignalCategory.TEMPERATURE,
                    TemperatureSignal.PERIOD_RISING,
                    1
                )
            );
        } else {
            signals.push(
                createPeriodSignal(
                    period,
                    SignalCategory.TEMPERATURE,
                    TemperatureSignal.PERIOD_FALLING,
                    1
                )
            );
        }
    });
    return signals;
};
