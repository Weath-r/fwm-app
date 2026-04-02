import { detectPrecipSignals } from "../precipSignalCalculations";
import { SignalCategory, SignalScope, ForecastPeriod } from "@/types";

describe("precipSignalCalculations", () => {
    describe("detectPrecipSignals", () => {
        it("should return empty array for empty data", () => {
            const result = detectPrecipSignals([]);
            expect(result).toEqual([]);
        });

        it("should return array of signals for data with precipitation", () => {
            const data = [
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0.5,
                    snow: 0,
                    accumulated_rain: 0.5,
                    hour: 9,
                },
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0.3,
                    snow: 0,
                    accumulated_rain: 0.8,
                    hour: 10,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        it("should categorize all signals as PRECIPITATION", () => {
            const data = [
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0.5,
                    snow: 0,
                    accumulated_rain: 0.5,
                    hour: 9,
                },
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0.3,
                    snow: 0,
                    accumulated_rain: 0.8,
                    hour: 10,
                },
            ];

            const result = detectPrecipSignals(data);

            result.forEach((signal) => {
                expect(signal.category).toBe(SignalCategory.PRECIPITATION);
            });
        });

        it("should handle dry conditions with no precipitation", () => {
            const data = [
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0,
                    snow: 0,
                    accumulated_rain: 0,
                    hour: 9,
                },
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0,
                    snow: 0,
                    accumulated_rain: 0,
                    hour: 10,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.PRECIPITATION)).toBe(true);
        });

        it("should handle moderate precipitation", () => {
            const data = [
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.5,
                    snow: 0,
                    accumulated_rain: 0.5,
                    hour: 13,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.6,
                    snow: 0,
                    accumulated_rain: 1.1,
                    hour: 14,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.4,
                    snow: 0,
                    accumulated_rain: 1.5,
                    hour: 15,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.PRECIPITATION)).toBe(true);
        });

        it("should handle heavy precipitation", () => {
            const data = [
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 4.0,
                    snow: 0,
                    accumulated_rain: 4.0,
                    hour: 13,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 3.5,
                    snow: 0,
                    accumulated_rain: 7.5,
                    hour: 14,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 3.2,
                    snow: 0,
                    accumulated_rain: 10.7,
                    hour: 15,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle mixed wet and dry hours", () => {
            const data = [
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.5,
                    snow: 0,
                    accumulated_rain: 0.5,
                    hour: 14,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0,
                    snow: 0,
                    accumulated_rain: 0.5,
                    hour: 15,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.3,
                    snow: 0,
                    accumulated_rain: 0.8,
                    hour: 16,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.PRECIPITATION)).toBe(true);
        });

        it("should handle snow presence", () => {
            const data = [
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 2,
                    snow: 1.5,
                    accumulated_rain: 0.5,
                    hour: 14,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 2,
                    snow: 1.8,
                    accumulated_rain: 0.2,
                    hour: 15,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.PRECIPITATION)).toBe(true);
        });

        it("should return signals with valid scope", () => {
            const data = [
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0.5,
                    snow: 0,
                    accumulated_rain: 0.5,
                    hour: 9,
                },
                {
                    period: ForecastPeriod.MORNING,
                    precip: 0.3,
                    snow: 0,
                    accumulated_rain: 0.8,
                    hour: 10,
                },
            ];

            const result = detectPrecipSignals(data);

            result.forEach((s) => {
                expect([SignalScope.DAY, SignalScope.PERIOD]).toContain(s.scope);
            });
        });

        it("should handle data with different precipitation amounts", () => {
            const data = [
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.1,
                    snow: 0,
                    accumulated_rain: 0.1,
                    hour: 14,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 2.5,
                    snow: 0,
                    accumulated_rain: 2.6,
                    hour: 15,
                },
                {
                    period: ForecastPeriod.AFTERNOON,
                    precip: 0.05,
                    snow: 0,
                    accumulated_rain: 2.65,
                    hour: 16,
                },
            ];

            const result = detectPrecipSignals(data);

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle multiple hours of rain data", () => {
            const data = Array.from({ length: 6 }, (_, i) => ({
                period: ForecastPeriod.AFTERNOON,
                precip: i % 2 === 0 ? 0 : 0.8,
                snow: 0,
                accumulated_rain: 0.8 * i,
                hour: 12 + i,
            }));

            const result = detectPrecipSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.PRECIPITATION)).toBe(true);
        });
    });
});
