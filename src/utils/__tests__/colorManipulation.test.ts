import { rgbToRgba, hexToRgba } from "../colorManipulation";

describe("colorManipulation", () => {
    describe("rgbToRgba", () => {
        it("should convert RGB string to RGBA with alpha", () => {
            const result = rgbToRgba("rgb(255, 128, 0)", 0.5);
            expect(result).toBe("rgba(255, 128, 0, 0.5)");
        });

        it("should handle RGB values with spaces", () => {
            const result = rgbToRgba("rgb( 100 , 150 , 200 )", 0.8);
            expect(result).toBe("rgba(100, 150, 200, 0.8)");
        });

        it("should handle alpha values from 0 to 1", () => {
            const rgb = "rgb(50, 100, 150)";
            expect(rgbToRgba(rgb, 0)).toBe("rgba(50, 100, 150, 0)");
            expect(rgbToRgba(rgb, 1)).toBe("rgba(50, 100, 150, 1)");
        });

        it("should throw error for invalid RGB format without numbers", () => {
            expect(() => rgbToRgba("invalid", 0.5)).toThrow("Invalid RGB format");
        });

        it("should throw error for RGB with wrong number of values", () => {
            expect(() => rgbToRgba("rgb(255, 128)", 0.5)).toThrow("Invalid RGB format");
        });

        it("should throw error for RGB with 4 values", () => {
            expect(() => rgbToRgba("rgb(255, 128, 0, 100)", 0.5)).toThrow("Invalid RGB format");
        });
    });

    describe("hexToRgba", () => {
        it("should convert 6-digit hex to RGBA", () => {
            const result = hexToRgba("#FF8000", 0.5);
            expect(result).toBe("rgba(255, 128, 0, 0.5)");
        });

        it("should convert hex without # prefix", () => {
            const result = hexToRgba("FF8000", 0.5);
            expect(result).toBe("rgba(255, 128, 0, 0.5)");
        });

        it("should convert 3-digit hex to RGBA", () => {
            const result = hexToRgba("#ABC", 0.5);
            expect(result).toBe("rgba(170, 187, 204, 0.5)");
        });

        it("should convert 3-digit hex without # prefix", () => {
            const result = hexToRgba("ABC", 0.5);
            expect(result).toBe("rgba(170, 187, 204, 0.5)");
        });

        it("should handle alpha from 0 to 1", () => {
            const hex = "#FF0000";
            expect(hexToRgba(hex, 0)).toBe("rgba(255, 0, 0, 0)");
            expect(hexToRgba(hex, 1)).toBe("rgba(255, 0, 0, 1)");
        });

        it("should convert black hex correctly", () => {
            const result = hexToRgba("#000000", 1);
            expect(result).toBe("rgba(0, 0, 0, 1)");
        });

        it("should convert white hex correctly", () => {
            const result = hexToRgba("#FFFFFF", 1);
            expect(result).toBe("rgba(255, 255, 255, 1)");
        });

        it("should throw error for invalid hex length", () => {
            expect(() => hexToRgba("#FF80", 0.5)).toThrow("Invalid HEX format");
            expect(() => hexToRgba("#FF80000", 0.5)).toThrow("Invalid HEX format");
        });
    });
});
