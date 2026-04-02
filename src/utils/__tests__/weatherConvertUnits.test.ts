import { calculateWindToBft } from "../weatherConvertUnits";

jest.mock("@/helpers/graphHelpers", () => ({
    windPlotBands: [
        { from: 0, to: 1, label: { text: "0" } },
        { from: 1, to: 6, label: { text: "1" } },
        { from: 6, to: 12, label: { text: "2" } },
        { from: 12, to: 20, label: { text: "3" } },
        { from: 20, to: 29, label: { text: "4" } },
        { from: 29, to: 39, label: { text: "5" } },
        { from: 39, to: 50, label: { text: "6" } },
        { from: 50, to: 62, label: { text: "7" } },
        { from: 62, to: 75, label: { text: "8" } },
        { from: 75, to: 89, label: { text: "9" } },
        { from: 89, to: 103, label: { text: "10" } },
        { from: 103, to: 118, label: { text: "11" } },
        { from: 118, to: 200, label: { text: "12" } },
    ],
}));

describe("weatherConvertUnits", () => {
    describe("calculateWindToBft", () => {
        it("should return 0 for calm wind (0-1 m/s)", () => {
            expect(calculateWindToBft(0)).toBe(0);
            expect(calculateWindToBft(0.5)).toBe(0);
        });

        it("should return 1 for light air (1-6 m/s)", () => {
            expect(calculateWindToBft(1)).toBe(1);
            expect(calculateWindToBft(3)).toBe(1);
            expect(calculateWindToBft(5.9)).toBe(1);
        });

        it("should return 2 for light breeze (6-12 m/s)", () => {
            expect(calculateWindToBft(6)).toBe(2);
            expect(calculateWindToBft(9)).toBe(2);
            expect(calculateWindToBft(11.9)).toBe(2);
        });

        it("should return 3 for gentle breeze (12-20 m/s)", () => {
            expect(calculateWindToBft(12)).toBe(3);
            expect(calculateWindToBft(16)).toBe(3);
            expect(calculateWindToBft(19.9)).toBe(3);
        });

        it("should return 4 for moderate breeze (20-29 m/s)", () => {
            expect(calculateWindToBft(20)).toBe(4);
            expect(calculateWindToBft(25)).toBe(4);
            expect(calculateWindToBft(28.9)).toBe(4);
        });

        it("should return 5 for fresh breeze (29-39 m/s)", () => {
            expect(calculateWindToBft(29)).toBe(5);
            expect(calculateWindToBft(34)).toBe(5);
        });

        it("should return 6 for strong breeze (39-50 m/s)", () => {
            expect(calculateWindToBft(39)).toBe(6);
            expect(calculateWindToBft(45)).toBe(6);
        });

        it("should return 7 for near gale (50-62 m/s)", () => {
            expect(calculateWindToBft(50)).toBe(7);
            expect(calculateWindToBft(56)).toBe(7);
        });

        it("should return 8 for gale (62-75 m/s)", () => {
            expect(calculateWindToBft(62)).toBe(8);
            expect(calculateWindToBft(70)).toBe(8);
        });

        it("should return 9 for strong gale (75-89 m/s)", () => {
            expect(calculateWindToBft(75)).toBe(9);
            expect(calculateWindToBft(80)).toBe(9);
        });

        it("should return 10 for storm (89-103 m/s)", () => {
            expect(calculateWindToBft(89)).toBe(10);
            expect(calculateWindToBft(95)).toBe(10);
        });

        it("should return 11 for violent storm (103-118 m/s)", () => {
            expect(calculateWindToBft(103)).toBe(11);
            expect(calculateWindToBft(110)).toBe(11);
        });

        it("should return 12 for hurricane (118+ m/s)", () => {
            expect(calculateWindToBft(118)).toBe(12);
            expect(calculateWindToBft(150)).toBe(12);
        });

        it("should return 0 for wind outside range", () => {
            // Greater than 200 m/s
            expect(calculateWindToBft(201)).toBe(0);
        });
    });
});
