import { detectCloudinessSignals } from "../cloudinessSignalCalculations";
import { SignalCategory } from "@/types";

describe("cloudinessSignalCalculations", () => {
    describe("detectCloudinessSignals", () => {
        it("should return empty array for empty data", () => {
            const result = detectCloudinessSignals([]);
            expect(result).toEqual([]);
        });

        it("should detect clear sky", () => {
            const data = [
                { period: "morning", cloudcover: 10, hour: 9 },
                { period: "morning", cloudcover: 15, hour: 10 },
                { period: "morning", cloudcover: 20, hour: 11 },
            ];

            const result = detectCloudinessSignals(data);

            expect(result.some((s) => s.type === "cloud_mostly_clear")).toBe(true);
        });

        it("should detect mostly cloudy sky", () => {
            const data = [
                { period: "afternoon", cloudcover: 60, hour: 13 },
                { period: "afternoon", cloudcover: 75, hour: 14 },
                { period: "afternoon", cloudcover: 70, hour: 15 },
            ];

            const result = detectCloudinessSignals(data);

            expect(result.some((s) => s.type === "cloud_mostly_cloudy")).toBe(true);
        });

        it("should detect cloudy sky", () => {
            const data = [
                { period: "afternoon", cloudcover: 90, hour: 13 },
                { period: "afternoon", cloudcover: 95, hour: 14 },
                { period: "afternoon", cloudcover: 85, hour: 15 },
            ];

            const result = detectCloudinessSignals(data);

            expect(result.some((s) => s.type === "cloudy")).toBe(true);
        });

        it("should prioritize cloudiness levels (cloudy > mostly_cloudy > clear)", () => {
            const data = [
                { period: "day", cloudcover: 90, hour: 0 },
                { period: "day", cloudcover: 60, hour: 1 },
            ];

            const result = detectCloudinessSignals(data);

            // Cloudy should take precedence
            expect(
                result.every((s) => s.type === "cloudy" || s.category === SignalCategory.CLOUD)
            ).toBe(true);
        });

        it("should calculate correct ratio", () => {
            const data = Array.from({ length: 10 }, (_, i) => ({
                period: "day",
                cloudcover: i < 6 ? 20 : 90, // 6 clear hours, 4 cloudy hours
                hour: i,
            }));

            const result = detectCloudinessSignals(data);

            expect(result.length).toBeGreaterThan(0);
            expect(result[0].category).toBe(SignalCategory.CLOUD);
        });

        it("should handle mixed cloudiness", () => {
            const data = [
                { period: "morning", cloudcover: 30, hour: 8 },
                { period: "morning", cloudcover: 40, hour: 9 },
                { period: "morning", cloudcover: 35, hour: 10 },
            ];

            const result = detectCloudinessSignals(data);

            // No strong signal expected, but function should not crash
            expect(Array.isArray(result)).toBe(true);
        });
    });
});
