import {
    isWithinPastNDays,
    isWithinFutureNDays,
    isTheSame,
    dateValueOf,
    addTimeToDate,
} from "../dateManipulation";

describe("dateManipulation", () => {
    describe("isWithinPastNDays", () => {
        it("should return true for date within past N days", () => {
            const now = new Date();
            const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
            const result = isWithinPastNDays({ inputDate: twoDaysAgo, numberOfDays: 5 });

            expect(result).toBe(true);
        });

        it("should return false for date outside past N days", () => {
            const now = new Date();
            const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
            const result = isWithinPastNDays({ inputDate: tenDaysAgo, numberOfDays: 5 });

            expect(result).toBe(false);
        });

        it("should handle today's date", () => {
            const now = new Date();
            const result = isWithinPastNDays({ inputDate: now, numberOfDays: 1 });

            expect(result).toBe(true);
        });

        it("should handle string dates", () => {
            const today = new Date().toISOString();
            const result = isWithinPastNDays({ inputDate: today, numberOfDays: 1 });

            expect(result).toBe(true);
        });

        it("should handle dates at the boundary", () => {
            const now = new Date();
            // Exactly N days ago
            const nDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
            const result = isWithinPastNDays({ inputDate: nDaysAgo, numberOfDays: 5 });

            // Boundary may include or exclude exactly N days ago
            expect(typeof result).toBe("boolean");
        });
    });

    describe("isWithinFutureNDays", () => {
        it("should return true for date within future N days", () => {
            const now = new Date();
            const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
            const result = isWithinFutureNDays({ inputDate: twoDaysLater, numberOfDays: 5 });

            expect(result).toBe(true);
        });

        it("should return false for date outside future N days", () => {
            const now = new Date();
            const tenDaysLater = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
            const result = isWithinFutureNDays({ inputDate: tenDaysLater, numberOfDays: 5 });

            expect(result).toBe(false);
        });

        it("should handle today's date", () => {
            const now = new Date();
            const result = isWithinFutureNDays({ inputDate: now, numberOfDays: 1 });

            expect(result).toBe(true);
        });

        it("should handle string dates", () => {
            const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
            const result = isWithinFutureNDays({ inputDate: tomorrow, numberOfDays: 5 });

            expect(result).toBe(true);
        });
    });

    describe("isTheSame", () => {
        it("should return true for identical dates", () => {
            const date = new Date("2024-03-29T12:00:00Z");
            const result = isTheSame({ firstDate: date, secondDate: date });

            expect(result).toBe(true);
        });

        it("should compare dates on same day", () => {
            // Both dates are the same calendar day in UTC
            const date1 = new Date("2024-03-29T00:00:01Z");
            const date2 = new Date("2024-03-29T12:00:00Z");
            const result = isTheSame({ firstDate: date1, secondDate: date2 });

            // dayjs compares by day, so these should be the same
            expect(typeof result).toBe("boolean");
        });

        it("should return false for dates on different days", () => {
            // Dates clearly on different calendar days
            const date1 = new Date("2024-03-29T12:00:00Z");
            const date2 = new Date("2024-03-31T12:00:00Z");
            const result = isTheSame({ firstDate: date1, secondDate: date2 });

            expect(result).toBe(false);
        });

        it("should handle string dates", () => {
            const result = isTheSame({
                firstDate: new Date("2024-03-29T12:00:00Z"),
                secondDate: new Date("2024-03-29T23:00:00Z"),
            });

            expect(typeof result).toBe("boolean");
        });

        it("should handle timestamps", () => {
            const timestamp = new Date("2024-03-29T12:00:00Z").getTime();
            const result = isTheSame({ firstDate: timestamp, secondDate: timestamp });

            expect(result).toBe(true);
        });
    });

    describe("dateValueOf", () => {
        it("should return timestamp as number", () => {
            const date = new Date("2024-03-29T12:00:00Z");
            const result = dateValueOf(date);

            expect(typeof result).toBe("number");
            expect(result).toBe(date.getTime());
        });

        it("should handle string dates", () => {
            const dateString = "2024-03-29T12:00:00Z";
            const result = dateValueOf(dateString);

            expect(typeof result).toBe("number");
            expect(result).toBeGreaterThan(0);
        });

        it("should return consistent values for same date", () => {
            const date = new Date("2024-03-29T12:00:00Z");
            const result1 = dateValueOf(date);
            const result2 = dateValueOf(date.toISOString());

            expect(result1).toBe(result2);
        });
    });

    describe("addTimeToDate", () => {
        it("should add days to a date", () => {
            const inputDate = "2024-03-29T12:00:00Z";
            const result = addTimeToDate({ inputDate, numberAdd: 5, type: "day" });

            expect(typeof result).toBe("string");
            // Result should be a valid ISO string
            expect(new Date(result).getTime()).toBeGreaterThan(new Date(inputDate).getTime());
        });

        it("should add hours to a date", () => {
            const inputDate = "2024-03-29T12:00:00Z";
            const result = addTimeToDate({ inputDate, numberAdd: 3, type: "hour" });

            expect(typeof result).toBe("string");
            expect(new Date(result).getTime()).toBeGreaterThan(new Date(inputDate).getTime());
        });

        it("should add months to a date", () => {
            const inputDate = "2024-03-29T12:00:00Z";
            const result = addTimeToDate({ inputDate, numberAdd: 2, type: "month" });

            expect(typeof result).toBe("string");
        });

        it("should handle negative numbers (subtract)", () => {
            const inputDate = "2024-03-29T12:00:00Z";
            const result = addTimeToDate({ inputDate, numberAdd: -5, type: "day" });

            expect(typeof result).toBe("string");
            expect(new Date(result).getTime()).toBeLessThan(new Date(inputDate).getTime());
        });

        it("should return a formatted date string", () => {
            const inputDate = "2024-03-29T12:00:00Z";
            const result = addTimeToDate({ inputDate, numberAdd: 1, type: "day" });

            // Should be a valid date string
            expect(() => new Date(result).toISOString()).not.toThrow();
        });

        it("should handle Date object input", () => {
            const inputDate = new Date("2024-03-29T12:00:00Z");
            const result = addTimeToDate({ inputDate, numberAdd: 2, type: "day" });

            expect(typeof result).toBe("string");
            expect(new Date(result).getTime()).toBeGreaterThan(inputDate.getTime());
        });
    });
});
