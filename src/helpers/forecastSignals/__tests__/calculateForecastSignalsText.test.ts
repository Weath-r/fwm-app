import {
    calculateSignalsImportance,
    resolveDaySummary,
    resolvePeriodSummaries,
} from "../calculateForecastSignalsText";
import { SignalCategory, ForecastPeriod, SignalScope, BaseSignal } from "@/types";

describe("calculateForecastSignalsText", () => {
    describe("calculateSignalsImportance", () => {
        it("should sort signals by importance descending", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.TEMPERATURE,
                    type: "test",
                    importance: 1,
                },
                {
                    id: "2",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                },
                {
                    id: "3",
                    scope: SignalScope.DAY,
                    category: SignalCategory.PRECIPITATION,
                    type: "test",
                    importance: 2,
                },
            ];

            const result = calculateSignalsImportance(signals);

            expect(result[0].importance).toBe(3);
            expect(result[1].importance).toBe(2);
            expect(result[2].importance).toBe(1);
        });

        it("should sort by category weight when importance is equal", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.CLOUD,
                    type: "test",
                    importance: 1,
                },
                {
                    id: "2",
                    scope: SignalScope.DAY,
                    category: SignalCategory.PRECIPITATION,
                    type: "test",
                    importance: 1,
                },
            ];

            const result = calculateSignalsImportance(signals);

            // Precipitation should come before Cloud
            expect(result[0].category).toBe(SignalCategory.PRECIPITATION);
            expect(result[1].category).toBe(SignalCategory.CLOUD);
        });

        it("should handle empty signal array", () => {
            const result = calculateSignalsImportance([]);
            expect(result).toEqual([]);
        });

        it("should handle single signal", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 2,
                },
            ];

            const result = calculateSignalsImportance(signals);
            expect(result.length).toBe(1);
            expect(result[0].id).toBe("1");
        });
    });

    describe("resolveDaySummary", () => {
        it("should select top signals from day scope", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.PRECIPITATION,
                    type: "test",
                    importance: 4,
                },
                {
                    id: "2",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                },
            ];

            const result = resolveDaySummary(signals);

            expect(result.length).toBeLessThanOrEqual(3);
            expect(result[0].id).toBe("1");
        });

        it("should avoid duplicate categories", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 4,
                },
                {
                    id: "2",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                },
            ];

            const result = resolveDaySummary(signals);

            expect(result.length).toBe(1);
            expect(result[0].id).toBe("1");
        });

        it("should respect maxSignals parameter", () => {
            const signals: BaseSignal[] = Array.from({ length: 10 }, (_, i) => ({
                id: `${i}`,
                scope: SignalScope.DAY,
                category: SignalCategory.TEMPERATURE,
                type: "test",
                importance: 10 - i,
            }));

            const result = resolveDaySummary(signals, 2);

            expect(result.length).toBeLessThanOrEqual(2);
        });

        it("should return empty array for no day signals", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.PERIOD,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                },
            ];

            const result = resolveDaySummary(signals);

            expect(result).toEqual([]);
        });

        it("should always include the top importance signal", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.PRECIPITATION,
                    type: "test",
                    importance: 5,
                },
                {
                    id: "2",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 1,
                },
            ];

            const result = resolveDaySummary(signals);

            expect(result[0].id).toBe("1");
        });
    });

    describe("resolvePeriodSummaries", () => {
        it("should group signals by period", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.PERIOD,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                    payload: { period: ForecastPeriod.MORNING },
                },
                {
                    id: "2",
                    scope: SignalScope.PERIOD,
                    category: SignalCategory.TEMPERATURE,
                    type: "test",
                    importance: 2,
                    payload: { period: ForecastPeriod.AFTERNOON },
                },
            ];

            const result = resolvePeriodSummaries(signals);

            expect(result.size).toBe(2);
            expect(result.has(ForecastPeriod.MORNING)).toBe(true);
            expect(result.has(ForecastPeriod.AFTERNOON)).toBe(true);
        });

        it("should not exceed maxSignalsPerPeriod", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.PERIOD,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                    payload: { period: ForecastPeriod.MORNING },
                },
                {
                    id: "2",
                    scope: SignalScope.PERIOD,
                    category: SignalCategory.TEMPERATURE,
                    type: "test",
                    importance: 2,
                    payload: { period: ForecastPeriod.MORNING },
                },
                {
                    id: "3",
                    scope: SignalScope.PERIOD,
                    category: SignalCategory.PRECIPITATION,
                    type: "test",
                    importance: 1,
                    payload: { period: ForecastPeriod.MORNING },
                },
            ];

            const result = resolvePeriodSummaries(signals, 2);

            expect(result.get(ForecastPeriod.MORNING)!.length).toBeLessThanOrEqual(2);
        });

        it("should return empty map for no period signals", () => {
            const signals: BaseSignal[] = [
                {
                    id: "1",
                    scope: SignalScope.DAY,
                    category: SignalCategory.WIND,
                    type: "test",
                    importance: 3,
                },
            ];

            const result = resolvePeriodSummaries(signals);

            expect(result.size).toBe(0);
        });
    });
});
