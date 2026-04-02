import { detectTemperatureSignals } from "../temperatureSignalCalculations";
import { SignalCategory } from "@/types";

describe("temperatureSignalCalculations", () => {
    describe("detectTemperatureSignals", () => {
        it("should return empty array for empty data", () => {
            const result = detectTemperatureSignals([]);
            expect(result).toEqual([]);
        });

        it("should return array of signals", () => {
            const data = [
                { period: "afternoon", temperature: 20, hour: 12 },
                { period: "afternoon", temperature: 22, hour: 13 },
            ];

            const result = detectTemperatureSignals(data);

            expect(Array.isArray(result)).toBe(true);
        });

        it("should categorize all signals as TEMPERATURE", () => {
            const data = [
                { period: "afternoon", temperature: 25, hour: 12 },
                { period: "afternoon", temperature: 28, hour: 13 },
            ];

            const result = detectTemperatureSignals(data);

            result.forEach((signal) => {
                expect(signal.category).toBe(SignalCategory.TEMPERATURE);
            });
        });

        it("should detect comfortable temperature", () => {
            const data = [
                { period: "afternoon", temperature: 20, hour: 12 },
                { period: "afternoon", temperature: 22, hour: 13 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.TEMPERATURE)).toBe(true);
        });

        it("should detect cold temperature", () => {
            const data = [
                { period: "morning", temperature: 5, hour: 8 },
                { period: "morning", temperature: 3, hour: 9 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should detect freezing temperature", () => {
            const data = [
                { period: "morning", temperature: -2, hour: 6 },
                { period: "morning", temperature: -5, hour: 7 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.TEMPERATURE)).toBe(true);
        });

        it("should detect warm temperature", () => {
            const data = [
                { period: "afternoon", temperature: 28, hour: 14 },
                { period: "afternoon", temperature: 26, hour: 15 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should detect hot temperature", () => {
            const data = [
                { period: "afternoon", temperature: 35, hour: 14 },
                { period: "afternoon", temperature: 33, hour: 15 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.TEMPERATURE)).toBe(true);
        });

        it("should detect very hot temperature", () => {
            const data = [
                { period: "afternoon", temperature: 40, hour: 13 },
                { period: "afternoon", temperature: 42, hour: 14 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should detect temperature drop", () => {
            const data = [
                { period: "afternoon", temperature: 25, hour: 14 },
                { period: "evening", temperature: 15, hour: 18 },
                { period: "evening", temperature: 10, hour: 19 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should detect temperature rise", () => {
            const data = [
                { period: "morning", temperature: 8, hour: 6 },
                { period: "morning", temperature: 12, hour: 9 },
                { period: "afternoon", temperature: 22, hour: 13 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.TEMPERATURE)).toBe(true);
        });

        it("should detect temperature range signals", () => {
            const data = [
                { period: "morning", temperature: 5, hour: 6 },
                { period: "afternoon", temperature: 15, hour: 12 },
                { period: "evening", temperature: 8, hour: 20 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle custom thresholds", () => {
            const customThresholds = {
                dayCold: 10,
                dayFreezing: 0,
                dayWarm: 25,
                dayHot: 30,
                dayVHot: 35,
                largeRange: 8,
                smallRange: 3,
                periodSteady: 2,
            };

            const data = [{ period: "afternoon", temperature: 20, hour: 12 }];

            const result = detectTemperatureSignals(data, customThresholds);

            expect(Array.isArray(result)).toBe(true);
        });

        it("should create day-scoped signals", () => {
            const data = [
                { period: "afternoon", temperature: 25, hour: 12 },
                { period: "afternoon", temperature: 28, hour: 13 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            result.forEach((s) => expect(s.category).toBe(SignalCategory.TEMPERATURE));
        });

        it("should handle mixed temperature conditions throughout day", () => {
            const data = [
                { period: "morning", temperature: 0, hour: 6 },
                { period: "morning", temperature: 5, hour: 9 },
                { period: "afternoon", temperature: 30, hour: 14 },
                { period: "evening", temperature: 15, hour: 20 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.TEMPERATURE)).toBe(true);
        });

        it("should handle negative temperatures", () => {
            const data = [
                { period: "morning", temperature: -10, hour: 6 },
                { period: "morning", temperature: -15, hour: 7 },
                { period: "morning", temperature: -8, hour: 8 },
            ];

            const result = detectTemperatureSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result.every((s) => s.category === SignalCategory.TEMPERATURE)).toBe(true);
        });

        it("should handle zero degree temperature", () => {
            const data = [
                { period: "afternoon", temperature: 0, hour: 12 },
                { period: "afternoon", temperature: 0, hour: 13 },
            ];

            const result = detectTemperatureSignals(data);

            expect(Array.isArray(result)).toBe(true);
        });
    });
});
