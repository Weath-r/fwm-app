import { windDirectionCalc } from "../windDirectionCalculator";

describe("windDirectionCalculator", () => {
    describe("windDirectionCalc", () => {
        it("should be a function", () => {
            expect(typeof windDirectionCalc).toBe("function");
        });

        it("should return a string", () => {
            const result = windDirectionCalc(0);
            expect(typeof result).toBe("string");
        });

        it("should convert 0 degrees to North (N)", () => {
            const result = windDirectionCalc(0);
            expect(result).toBe("N");
        });

        it("should convert 45 degrees to NE", () => {
            const result = windDirectionCalc(45);
            expect(result).toBe("NE");
        });

        it("should convert 90 degrees to East (E)", () => {
            const result = windDirectionCalc(90);
            expect(result).toBe("E");
        });

        it("should convert 135 degrees to SE", () => {
            const result = windDirectionCalc(135);
            expect(result).toBe("SE");
        });

        it("should convert 180 degrees to South (S)", () => {
            const result = windDirectionCalc(180);
            expect(result).toBe("S");
        });

        it("should convert 225 degrees to SW", () => {
            const result = windDirectionCalc(225);
            expect(result).toBe("SW");
        });

        it("should convert 270 degrees to West (W)", () => {
            const result = windDirectionCalc(270);
            expect(result).toBe("W");
        });

        it("should convert 315 degrees to NW", () => {
            const result = windDirectionCalc(315);
            expect(result).toBe("NW");
        });

        it("should handle degrees just before 360", () => {
            const result = windDirectionCalc(359);
            expect(result).toBe("N");
        });

        it("should handle all cardinal directions", () => {
            const cardinals = ["N", "E", "S", "W"];
            const degrees = [0, 90, 180, 270];

            degrees.forEach((degree, index) => {
                const result = windDirectionCalc(degree);
                expect(result).toBe(cardinals[index]);
            });
        });

        it("should handle all intercardinal directions", () => {
            const intercardinals = ["NE", "SE", "SW", "NW"];
            const degrees = [45, 135, 225, 315];

            degrees.forEach((degree, index) => {
                const result = windDirectionCalc(degree);
                expect(result).toBe(intercardinals[index]);
            });
        });

        it("should handle degrees in between cardinal points", () => {
            const result = windDirectionCalc(22.5);
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle degrees between intercardinal points", () => {
            const result = windDirectionCalc(67.5);
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle negative degrees (wrapping)", () => {
            const result = windDirectionCalc(-45);
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle degrees greater than 360 (wrapping)", () => {
            const result = windDirectionCalc(405);
            expect(result).toBe("NE");
        });

        it("should handle decimal degrees", () => {
            const result = windDirectionCalc(45.5);
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        });

        it("should return 8-character compass direction", () => {
            const directions = new Set();

            for (let degree = 0; degree < 360; degree += 45) {
                const result = windDirectionCalc(degree);
                directions.add(result);
            }

            expect(directions.size).toBe(8);
        });

        it("should consistently map same degree to same direction", () => {
            const degree = 123.45;
            const result1 = windDirectionCalc(degree);
            const result2 = windDirectionCalc(degree);

            expect(result1).toBe(result2);
        });

        it("should handle edge case of exactly 360 degrees", () => {
            const result = windDirectionCalc(360);
            expect(result).toBe("N");
        });

        it("should handle common wind degree readings", () => {
            const windReadings = [0, 45, 90, 135, 180, 225, 270, 315, 22.5, 67.5];

            windReadings.forEach((degree) => {
                const result = windDirectionCalc(degree);
                expect(typeof result).toBe("string");
                expect(result.length).toBeGreaterThan(0);
                expect(result.length).toBeLessThanOrEqual(2);
            });
        });

        it("should be case sensitive with capital letters", () => {
            const result = windDirectionCalc(0);
            expect(result).toBe(result.toUpperCase());
        });

        it("should not return invalid directions", () => {
            const validDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

            for (let degree = 0; degree < 360; degree += 5) {
                const result = windDirectionCalc(degree);
                expect(validDirections).toContain(result);
            }
        });
    });
});
