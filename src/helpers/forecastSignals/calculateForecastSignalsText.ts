import { SignalCategory, ForecastPeriod, BaseSignal, BasePayload, SignalScope } from "@/types";

const SIGNAL_CATEGORY_WEIGHT: Record<SignalCategory, number> = {
    [SignalCategory.PRECIPITATION]: 4,
    [SignalCategory.WIND]: 3,
    [SignalCategory.TEMPERATURE]: 2,
    [SignalCategory.CLOUD]: 1,
    [SignalCategory.CHANGE]: 1,
};

const TEMPORAL_SIGNAL_WEIGHT = {
    NOW: 5,
    [ForecastPeriod.MORNING]: 4,
    [ForecastPeriod.AFTERNOON]: 3,
    [ForecastPeriod.EVENING]: 2,
    [ForecastPeriod.NIGHT]: 1,
};

const getTemporalScore = (signal: BaseSignal): number => {
    const period = signal.scope === "period" ? signal.payload?.period : "NOW";
    if (period) {
        return TEMPORAL_SIGNAL_WEIGHT[period];
    }
    return 0;
};

export const calculateSignalsImportance = (signals: BaseSignal<BasePayload>[]) => {
    return signals.sort((a, b) => {
        if (b.importance !== a.importance) {
            return b.importance - a.importance;
        }

        const categoryDiff =
            SIGNAL_CATEGORY_WEIGHT[b.category] - SIGNAL_CATEGORY_WEIGHT[a.category];

        if (categoryDiff !== 0) return categoryDiff;

        const timeDiff = getTemporalScore(a) - getTemporalScore(b);

        return timeDiff;
    });
};

export const resolveDaySummary = (ranked: BaseSignal<BasePayload>[], maxSignals = 3) => {
    const daySignals = ranked.filter((s) => s.scope === SignalScope.DAY);

    if (!daySignals.length) return [];

    const selected: BaseSignal<BasePayload>[] = [];
    const usedCategories = new Set<SignalCategory>();

    const topImportance = daySignals[0].importance;

    for (const signal of daySignals) {
        if (selected.length >= maxSignals) break;

        // Always include the top one
        if (selected.length === 0) {
            selected.push(signal);
            usedCategories.add(signal.category);
            continue;
        }

        // Skip weaker signals
        if (signal.importance < topImportance - 1) continue;

        // Avoid duplicate categories
        if (usedCategories.has(signal.category)) continue;

        selected.push(signal);
        usedCategories.add(signal.category);
    }

    return selected;
};

export const resolvePeriodSummaries = (
    ranked: BaseSignal<BasePayload>[],
    maxSignalsPerPeriod = 2
): Map<ForecastPeriod, BaseSignal<BasePayload>[]> => {
    const result = new Map<ForecastPeriod, BaseSignal<BasePayload>[]>();

    // Only PERIOD scope
    const periodSignals = ranked.filter((s) => s.scope === SignalScope.PERIOD);

    for (const signal of periodSignals) {
        const period = signal.payload?.period;
        if (!period) continue;

        if (!result.has(period)) {
            result.set(period, []);
        }

        const selected = result.get(period)!;

        if (selected.length === 0) {
            // Always take first (highest ranked for that period)
            selected.push(signal);
            continue;
        }

        if (selected.length >= maxSignalsPerPeriod) continue;

        const topImportance = selected[0].importance;

        // Only allow if close in importance
        if (signal.importance < topImportance - 1) continue;

        // Avoid duplicate categories
        if (selected.some((s) => s.category === signal.category)) continue;

        selected.push(signal);
    }

    return result;
};
