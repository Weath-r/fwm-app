import { CloudSignal, SignalCategory, BaseSignal, BasePayload } from "@/types";
import { createDaySignal } from "@/helpers/forecastSignals/generalSignalCalculations";

type HourlyCloudData = {
    period: string;
    cloudcover: number;
    hour: number;
};

export const detectCloudinessSignals = (data: HourlyCloudData[]) => {
    const signals: BaseSignal<BasePayload>[] = [];

    if (data.length === 0) return signals;
    const totalHours = data.length;

    let clearHours = 0;
    let mostlyCloudyHours = 0;
    let cloudyHours = 0;

    for (const hour of data) {
        const cloudiness = hour.cloudcover;

        if (cloudiness <= 25) {
            clearHours++;
        }

        if (cloudiness >= 50 && cloudiness <= 85) {
            mostlyCloudyHours++;
        }

        if (cloudiness >= 85) {
            cloudyHours++;
        }
    }

    const clearRatio = Math.round((clearHours / totalHours) * 10) / 10;
    const mostlyCloudyRatio = Math.round((mostlyCloudyHours / totalHours) * 10) / 10;
    const cloudyRatio = Math.round((cloudyHours / totalHours) * 10) / 10;

    const threshold = 0.6;

    if (cloudyRatio >= threshold) {
        signals.push(
            createDaySignal(SignalCategory.CLOUD, CloudSignal.CLOUDY, 3, { ratio: cloudyRatio })
        );
        return signals;
    }

    if (mostlyCloudyRatio >= threshold) {
        signals.push(
            createDaySignal(SignalCategory.CLOUD, CloudSignal.MOSTLY_CLOUDY, 2, {
                ratio: mostlyCloudyRatio,
            })
        );
        return signals;
    }

    if (clearRatio >= threshold) {
        signals.push(
            createDaySignal(SignalCategory.CLOUD, CloudSignal.MOSTLY_CLEAR, 1, {
                ratio: clearRatio,
            })
        );
    }
    return signals;
};
