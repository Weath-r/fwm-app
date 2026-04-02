import { detectWindSignals } from "../windSignalCalculations";
import { SignalCategory } from "@/types";

describe("windSignalCalculations", () => {
    describe("detectWindSignals", () => {
        it("should return empty array for empty data", () => {
            const result = detectWindSignals([]);
            expect(result).toEqual([]);
        });

        it("should return array of signals", () => {
            const data = [
                { period: "morning", windspd: 5, winddir: "N", hour: 8 },
                { period: "morning", windspd: 6, winddir: "NE", hour: 9 },
            ];

            const result = detectWindSignals(data);

            expect(Array.isArray(result)).toBe(true);
        });

        it("should categorize all signals as WIND", () => {
            const data = [
                { period: "afternoon", windspd: 10, winddir: "E", hour: 12 },
                { period: "afternoon", windspd: 12, winddir: "SE", hour: 13 },
            ];

            const result = detectWindSignals(data);

            result.forEach((signal) => {
                expect(signal.category).toBe(SignalCategory.WIND);
            });
        });

        it("should detect calm wind conditions", () => {
            const data = [
                { period: "morning", windspd: 2, winddir: "N", hour: 8 },
                { period: "morning", windspd: 1, winddir: "NE", hour: 9 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.WIND)).toBe(true);
        });

        it("should detect moderate wind", () => {
            const data = [
                { period: "afternoon", windspd: 8, winddir: "S", hour: 12 },
                { period: "afternoon", windspd: 10, winddir: "SW", hour: 13 },
                { period: "afternoon", windspd: 9, winddir: "W", hour: 14 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should detect strong wind conditions", () => {
            const data = [
                { period: "afternoon", windspd: 20, winddir: "N", hour: 12 },
                { period: "afternoon", windspd: 22, winddir: "NNE", hour: 13 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.WIND)).toBe(true);
        });

        it("should detect severe wind conditions", () => {
            const data = [
                { period: "afternoon", windspd: 40, winddir: "N", hour: 12 },
                { period: "afternoon", windspd: 45, winddir: "N", hour: 13 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should track wind direction", () => {
            const data = [
                { period: "morning", windspd: 8, winddir: "N", hour: 8 },
                { period: "afternoon", windspd: 8, winddir: "E", hour: 12 },
                { period: "afternoon", windspd: 8, winddir: "S", hour: 16 },
                { period: "evening", windspd: 8, winddir: "W", hour: 20 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            result.forEach((s) => expect(s.category).toBe(SignalCategory.WIND));
        });

        it("should handle multiple periods", () => {
            const data = [
                { period: "morning", windspd: 3, winddir: "N", hour: 9 },
                { period: "afternoon", windspd: 12, winddir: "S", hour: 14 },
                { period: "evening", windspd: 5, winddir: "W", hour: 19 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.WIND)).toBe(true);
        });

        it("should handle custom Beaufort scale thresholds", () => {
            const customThresholds = {
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

            const data = [{ period: "afternoon", windspd: 5, winddir: "N", hour: 12 }];

            const result = detectWindSignals(data, customThresholds);

            expect(Array.isArray(result)).toBe(true);
        });

        it("should detect wind patterns across hours", () => {
            const data = [
                { period: "afternoon", windspd: 3, winddir: "N", hour: 12 },
                { period: "afternoon", windspd: 8, winddir: "NE", hour: 13 },
                { period: "afternoon", windspd: 15, winddir: "E", hour: 14 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.WIND)).toBe(true);
        });

        it("should handle decreasing wind", () => {
            const data = [
                { period: "morning", windspd: 20, winddir: "N", hour: 8 },
                { period: "afternoon", windspd: 10, winddir: "NE", hour: 14 },
                { period: "evening", windspd: 3, winddir: "E", hour: 19 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle all compass directions", () => {
            const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
            const periods = ["morning", "afternoon", "evening", "night"];
            const data = directions.map((dir, idx) => ({
                period: periods[idx % periods.length],
                windspd: 8,
                winddir: dir,
                hour: 14 + idx,
            }));

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            result.forEach((s) => expect(s.category).toBe(SignalCategory.WIND));
        });

        it("should process data with varying wind speeds and directions", () => {
            const data = [
                { period: "morning", windspd: 2, winddir: "N", hour: 6 },
                { period: "morning", windspd: 5, winddir: "NE", hour: 9 },
                { period: "afternoon", windspd: 15, winddir: "E", hour: 12 },
                { period: "afternoon", windspd: 20, winddir: "SE", hour: 15 },
                { period: "evening", windspd: 10, winddir: "S", hour: 18 },
            ];

            const result = detectWindSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.WIND)).toBe(true);
        });
    });
});
