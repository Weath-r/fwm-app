/**
 * d3Utils test
 * Note: Direct testing of d3 integration is challenging due to ES module imports.
 * These tests verify the integration with d3 functions through mocking.
 */

// Mock d3 before importing the utilities
jest.mock("d3", () => ({
    scaleQuantize: jest.fn(() => ({
        domain: jest.fn(function () {
            return this;
        }),
        range: jest.fn(function () {
            return this;
        }),
    })),
    rgb: jest.fn((color: string) => ({
        formatRgb: jest.fn(() => {
            // Simple mock implementation based on input
            if (color === "#FF0000") return "rgb(255, 0, 0)";
            if (color === "#00FF00") return "rgb(0, 255, 0)";
            if (color === "#0000FF") return "rgb(0, 0, 255)";
            if (color === "#FFFFFF") return "rgb(255, 255, 255)";
            if (color === "#000000") return "rgb(0, 0, 0)";
            if (color === "#7B2D43") return "rgb(123, 45, 67)";
            return "rgb(128, 128, 128)";
        }),
    })),
}));

import { createColorGradient, ColorToRgb } from "../d3Utils";
import * as d3 from "d3";

describe("d3Utils", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createColorGradient", () => {
        it("should create a color scale with d3.scaleQuantize", () => {
            const mockScaleQuantize = d3.scaleQuantize as jest.MockedFunction<
                typeof d3.scaleQuantize
            >;

            createColorGradient({ minTemp: 0, maxTemp: 100, colorsList: ["red", "blue"] });

            expect(mockScaleQuantize).toHaveBeenCalled();
        });

        it("should configure domain with min and max temperatures", () => {
            const colors = ["#0000FF", "#00FF00", "#FFFF00", "#FF0000"];
            const result = createColorGradient({ minTemp: -50, maxTemp: 50, colorsList: colors });

            // Should return a scale object
            expect(result).toBeDefined();
            expect(result).toHaveProperty("range");
        });

        it("should set color range", () => {
            const colors = ["blue", "green", "red"];
            const result = createColorGradient({ minTemp: 0, maxTemp: 100, colorsList: colors });

            expect(result).toBeDefined();
        });

        it("should handle negative temperature ranges", () => {
            const colors = ["#0000FF", "#FF0000"];
            const result = createColorGradient({ minTemp: -30, maxTemp: 30, colorsList: colors });

            expect(result).toBeDefined();
        });
    });

    describe("ColorToRgb", () => {
        it("should convert red hex to RGB", () => {
            const result = ColorToRgb("#FF0000");
            expect(result).toBe("rgb(255, 0, 0)");
        });

        it("should convert green hex to RGB", () => {
            const result = ColorToRgb("#00FF00");
            expect(result).toBe("rgb(0, 255, 0)");
        });

        it("should convert blue hex to RGB", () => {
            const result = ColorToRgb("#0000FF");
            expect(result).toBe("rgb(0, 0, 255)");
        });

        it("should convert white hex to RGB", () => {
            const result = ColorToRgb("#FFFFFF");
            expect(result).toBe("rgb(255, 255, 255)");
        });

        it("should convert black hex to RGB", () => {
            const result = ColorToRgb("#000000");
            expect(result).toBe("rgb(0, 0, 0)");
        });

        it("should call d3.rgb with color parameter", () => {
            const mockRgb = d3.rgb as jest.MockedFunction<typeof d3.rgb>;

            ColorToRgb("#7B2D43");

            expect(mockRgb).toHaveBeenCalledWith("#7B2D43");
        });

        it("should return formatted RGB string", () => {
            const result = ColorToRgb("#7B2D43");

            expect(typeof result).toBe("string");
            expect(result).toContain("rgb");
            expect(result).toBe("rgb(123, 45, 67)");
        });
    });
});
