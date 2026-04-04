import { urlStationName, properStationName } from "../createStationName";

describe("createStationName", () => {
    describe("urlStationName", () => {
        it("should be a function", () => {
            expect(typeof urlStationName).toBe("function");
        });

        it("should return a string", () => {
            const result = urlStationName("Athens");
            expect(typeof result).toBe("string");
        });

        it("should replace spaces with underscores", () => {
            const result = urlStationName("New York");
            expect(result).toBe("New_York");
        });

        it("should handle single word name", () => {
            const result = urlStationName("Athens");
            expect(result).toBe("Athens");
        });

        it("should handle multiple spaces", () => {
            const result = urlStationName("New  York");
            expect(result.includes("_")).toBe(true);
        });

        it("should preserve case", () => {
            const result = urlStationName("New York");
            expect(result).toContain("New");
            expect(result).toContain("York");
        });

        it("should handle empty string", () => {
            const result = urlStationName("");
            expect(typeof result).toBe("string");
        });

        it("should handle name starting with space", () => {
            const result = urlStationName(" Athens");
            expect(typeof result).toBe("string");
        });

        it("should handle name ending with space", () => {
            const result = urlStationName("Athens ");
            expect(typeof result).toBe("string");
        });

        it("should handle special characters", () => {
            const result = urlStationName("Saint-Denis");
            expect(typeof result).toBe("string");
        });

        it("should be reversible with properStationName", () => {
            const original = "New York";
            const urlVersion = urlStationName(original);
            const proper = properStationName(urlVersion);

            expect(proper).toBe(original);
        });

        it("should handle three-word location", () => {
            const result = urlStationName("San Francisco Bay");
            expect(result).toContain("_");
            expect(result).toContain("San");
            expect(result).toContain("Francisco");
            expect(result).toContain("Bay");
        });
    });

    describe("properStationName", () => {
        it("should be a function", () => {
            expect(typeof properStationName).toBe("function");
        });

        it("should return a string", () => {
            const result = properStationName("Athens");
            expect(typeof result).toBe("string");
        });

        it("should replace underscores with spaces", () => {
            const result = properStationName("New_York");
            expect(result).toBe("New York");
        });

        it("should handle single word name", () => {
            const result = properStationName("Athens");
            expect(result).toBe("Athens");
        });

        it("should preserve case", () => {
            const result = properStationName("New_York");
            expect(result).toContain("New");
            expect(result).toContain("York");
        });

        it("should handle empty string", () => {
            const result = properStationName("");
            expect(typeof result).toBe("string");
        });

        it("should handle multiple underscores", () => {
            const result = properStationName("New__York");
            expect(result.includes(" ")).toBe(true);
        });

        it("should handle name starting with underscore", () => {
            const result = properStationName("_Athens");
            expect(typeof result).toBe("string");
        });

        it("should handle name ending with underscore", () => {
            const result = properStationName("Athens_");
            expect(typeof result).toBe("string");
        });

        it("should handle special characters", () => {
            const result = properStationName("Saint-Denis");
            expect(typeof result).toBe("string");
        });

        it("should reverse urlStationName transformation", () => {
            const urlVersion = "San_Francisco_Bay";
            const result = properStationName(urlVersion);

            expect(result).toBe("San Francisco Bay");
        });

        it("should handle three-word location", () => {
            const result = properStationName("San_Francisco_Bay");
            expect(result).toContain(" ");
            expect(result).toContain("San");
            expect(result).toContain("Francisco");
            expect(result).toContain("Bay");
        });
    });

    describe("round-trip conversions", () => {
        it("should convert single word unchanged", () => {
            const original = "Athens";
            expect(properStationName(urlStationName(original))).toBe(original);
        });

        it("should convert multi-word location correctly", () => {
            const original = "New York";
            expect(properStationName(urlStationName(original))).toBe(original);
        });

        it("should handle Greek location names", () => {
            const original = "Thessaloniki";
            expect(properStationName(urlStationName(original))).toBe(original);
        });

        it("should handle hyphenated names", () => {
            const original = "Saint-Denis";
            const urlVersion = urlStationName(original);
            const proper = properStationName(urlVersion);

            expect(typeof proper).toBe("string");
        });

        it("should maintain consistency across multiple conversions", () => {
            const original = "Los Angeles";
            const conversion1 = properStationName(urlStationName(original));
            const conversion2 = properStationName(urlStationName(conversion1));

            expect(conversion1).toBe(conversion2);
        });
    });
});
