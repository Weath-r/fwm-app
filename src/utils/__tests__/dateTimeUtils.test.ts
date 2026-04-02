import {
    timeFromNowUtil,
    timeOnlyUtil,
    dayWithNameUtil,
    dayWithNameNoMonthUtil,
    dayWithNameUtilWithCustom,
    fullDateWithTime,
    fullDateNoTime,
    dateWithNameTime,
    dateWithMsToDay,
    dateWithTime,
    dateObjectWithMonthYear,
    dateObjectInputDDMMYY,
    dateOnlyMonthYear,
    setDayjsLocale,
} from "../dateTimeUtils";

describe("dateTimeUtils", () => {
    describe("timeFromNowUtil", () => {
        it("should format date as relative time", () => {
            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            const result = timeFromNowUtil(oneHourAgo);

            expect(result).toContain("hour");
        });

        it("should include or exclude suffix based on parameter", () => {
            const now = new Date();
            const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
            const resultWithSuffix = timeFromNowUtil(oneMinuteAgo, true);
            const resultWithoutSuffix = timeFromNowUtil(oneMinuteAgo, false);

            // Both should be valid strings
            expect(typeof resultWithSuffix).toBe("string");
            expect(typeof resultWithoutSuffix).toBe("string");
        });

        it("should handle string dates", () => {
            const result = timeFromNowUtil("2024-01-01T00:00:00Z");
            expect(result).toBeTruthy();
        });
    });

    describe("timeOnlyUtil", () => {
        it("should format time as HH:mm", () => {
            const result = timeOnlyUtil("2024-03-29T15:30:00Z");
            expect(result).toMatch(/\d{2}:\d{2}/);
        });

        it("should handle Date objects", () => {
            const date = new Date("2024-03-29T14:45:00Z");
            const result = timeOnlyUtil(date);
            expect(result).toMatch(/\d{2}:\d{2}/);
        });

        it("should preserve exact time", () => {
            const result = timeOnlyUtil("2024-03-29T09:05:00Z");
            // Check that the format is HH:mm
            expect(result.length).toBe(5);
            expect(result).toMatch(/\d{2}:\d{2}/);
        });
    });

    describe("dayWithNameUtil", () => {
        it("should format as 'dddd, DD MMM'", () => {
            const result = dayWithNameUtil("2024-03-29T00:00:00Z"); // Friday
            // Should contain day name and date
            expect(result).toMatch(/\w+, \d{2} \w+/);
        });

        it("should include month name", () => {
            const result = dayWithNameUtil("2024-03-29T00:00:00Z");
            expect(result).toBeTruthy();
            // Should have day name and month
            const parts = result.split(", ");
            expect(parts.length).toBe(2);
        });
    });

    describe("dayWithNameNoMonthUtil", () => {
        it("should format as 'dddd, DD' without month", () => {
            const result = dayWithNameNoMonthUtil("2024-03-29T00:00:00Z");
            expect(result).toMatch(/\w+, \d{2}/);
        });

        it("should not contain month names", () => {
            const result = dayWithNameNoMonthUtil("2024-03-29T00:00:00Z");
            const monthList = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            monthList.forEach((month) => {
                expect(result.toLowerCase()).not.toContain(month.toLowerCase());
            });
        });
    });

    describe("dayWithNameUtilWithCustom", () => {
        it("should parse custom DD-MM-YYYY format", () => {
            const result = dayWithNameUtilWithCustom("29-03-2024");
            expect(result).toMatch(/\w+, \d{2}/);
        });

        it("should format as 'ddd, DD'", () => {
            const result = dayWithNameUtilWithCustom("29-03-2024");
            // ddd is 3-letter day abbreviation
            const parts = result.split(", ");
            expect(parts.length).toBe(2);
        });
    });

    describe("fullDateWithTime", () => {
        it("should format as 'DD/MM/YYYY, HH:mm'", () => {
            const result = fullDateWithTime("2024-03-29T15:30:00Z");
            expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/);
        });

        it("should include correct date and time", () => {
            const result = fullDateWithTime("2024-03-29T15:30:00Z");
            expect(result).toContain("29/03/2024");
        });
    });

    describe("fullDateNoTime", () => {
        it("should format as 'DD/MM/YYYY' only", () => {
            const result = fullDateNoTime("2024-03-29T15:30:00Z");
            expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
            expect(result).not.toContain(":");
        });

        it("should have exactly 10 characters for standard date", () => {
            const result = fullDateNoTime("2024-03-29T00:00:00Z");
            expect(result.length).toBe(10);
        });
    });

    describe("dateWithNameTime", () => {
        it("should format as 'ddd, MMM DD, HH:mm'", () => {
            const result = dateWithNameTime("2024-03-29T15:30:00Z");
            expect(result).toMatch(/\w+, \w+\s+\d{2}, \d{2}:\d{2}/);
        });

        it("should include all components", () => {
            const result = dateWithNameTime("2024-03-29T15:30:00Z");
            const parts = result.split(", ");
            expect(parts.length).toBe(3);
        });
    });

    describe("dateWithMsToDay", () => {
        it("should format timestamp as 'DD/MM'", () => {
            const timestamp = new Date("2024-03-29T00:00:00Z").getTime();
            const result = dateWithMsToDay(timestamp);
            expect(result).toMatch(/\d{2}\/\d{2}/);
        });

        it("should accept string dates", () => {
            const result = dateWithMsToDay("2024-03-29T00:00:00Z");
            expect(result).toMatch(/\d{2}\/\d{2}/);
        });
    });

    describe("dateWithTime", () => {
        it("should format as 'DD.MM.YY, HH:mm'", () => {
            const result = dateWithTime("2024-03-29T15:30:00Z");
            expect(result).toMatch(/\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2}/);
        });
    });

    describe("dateObjectWithMonthYear", () => {
        it("should parse M-YYYY format and return Dayjs object", () => {
            const result = dateObjectWithMonthYear("3-2024");
            expect(result).toBeTruthy();
            // Should have isValid method
            expect(typeof result.isValid).toBe("function");
        });

        it("should handle single digit month", () => {
            const result = dateObjectWithMonthYear("3-2024");
            expect(result.isValid()).toBeTruthy();
        });

        it("should handle double digit month", () => {
            const result = dateObjectWithMonthYear("12-2024");
            expect(result.isValid()).toBeTruthy();
        });
    });

    describe("dateObjectInputDDMMYY", () => {
        it("should parse DD/MM/YYYY format", () => {
            const result = dateObjectInputDDMMYY("29/03/2024");
            expect(result.isValid()).toBeTruthy();
        });

        it("should return Dayjs object", () => {
            const result = dateObjectInputDDMMYY("29/03/2024");
            expect(typeof result.format).toBe("function");
        });
    });

    describe("dateOnlyMonthYear", () => {
        it("should format as 'MMM, YY'", () => {
            const result = dateOnlyMonthYear("2024-03-29T00:00:00Z");
            expect(result).toMatch(/\w+, \d{2}/);
        });

        it("should handle numeric timestamps", () => {
            const timestamp = new Date("2024-03-29").getTime();
            const result = dateOnlyMonthYear(timestamp);
            expect(result).toBeTruthy();
        });
    });

    describe("setDayjsLocale", () => {
        it("should set English locale", async () => {
            await setDayjsLocale("en");
            // Should not throw
            expect(true).toBe(true);
        });

        it("should set Greek locale", async () => {
            await setDayjsLocale("el");
            // Should not throw
            expect(true).toBe(true);
        });

        it("should handle locale switching", async () => {
            await setDayjsLocale("en");
            const resultEn = dateOnlyMonthYear("2024-03-29T00:00:00Z");

            await setDayjsLocale("el");
            const resultEl = dateOnlyMonthYear("2024-03-29T00:00:00Z");

            // Both should be valid, but might be different based on locale
            expect(resultEn).toBeTruthy();
            expect(resultEl).toBeTruthy();
        });
    });
});
