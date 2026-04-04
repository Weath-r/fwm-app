import { convertCelciusKelvin } from "../mathUtils";

describe("mathUtils", () => {
    describe("convertCelciusKelvin", () => {
        it("should convert 273.15 Kelvin to 0 Celsius", () => {
            expect(convertCelciusKelvin(273.15)).toBe(0);
        });

        it("should convert 293.15 Kelvin to 20 Celsius", () => {
            expect(convertCelciusKelvin(293.15)).toBe(20);
        });

        it("should convert 373.15 Kelvin to 100 Celsius", () => {
            expect(convertCelciusKelvin(373.15)).toBe(100);
        });

        it("should convert 0 Kelvin to -273.15 Celsius", () => {
            expect(convertCelciusKelvin(0)).toBe(-273.15);
        });

        it("should handle negative Celsius values", () => {
            expect(convertCelciusKelvin(253.15)).toBe(-20);
        });

        it("should round to 2 decimal places", () => {
            const result = convertCelciusKelvin(300.25);
            expect(result).toEqual(expect.any(Number));
            // Check that it has at most 2 decimal places
            expect((result.toString().split(".")[1] || "").length).toBeLessThanOrEqual(2);
        });

        it("should handle very high temperatures", () => {
            const result = convertCelciusKelvin(5778); // Sun's surface temp
            expect(result).toBeCloseTo(5504.85, 2);
        });

        it("should handle fractional Kelvin values", () => {
            const result = convertCelciusKelvin(273.16); // Precise water triple point
            expect(result).toBeCloseTo(0.01, 2);
        });
    });
});
