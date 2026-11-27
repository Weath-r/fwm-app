import { daylightProgress, daypartAt, formatClockTime, sunPosition, sunTimes } from "../sunTimes";

const LAMIA = { latitude: 38.9, longitude: 22.43 };
const minutesUtc = (date: Date) => date.getUTCHours() * 60 + date.getUTCMinutes();

describe("sunTimes", () => {
    it("matches Lamia's summer solstice within a few minutes", () => {
        const { sunrise, sunset } = sunTimes(
            new Date("2026-06-21T12:00:00Z"),
            LAMIA.latitude,
            LAMIA.longitude
        );

        expect(Math.abs(minutesUtc(sunrise) - (3 * 60 + 5))).toBeLessThan(15);
        expect(Math.abs(minutesUtc(sunset) - (17 * 60 + 55))).toBeLessThan(15);
    });

    it("matches Lamia's winter solstice within a few minutes", () => {
        const { sunrise, sunset } = sunTimes(
            new Date("2026-12-21T12:00:00Z"),
            LAMIA.latitude,
            LAMIA.longitude
        );

        expect(Math.abs(minutesUtc(sunrise) - (5 * 60 + 35))).toBeLessThan(15);
        expect(Math.abs(minutesUtc(sunset) - (15 * 60 + 15))).toBeLessThan(15);
    });
});

describe("daypartAt", () => {
    const times = {
        sunrise: new Date("2026-11-26T05:20:00Z"),
        sunset: new Date("2026-11-26T15:10:00Z"),
    };

    it.each([
        ["2026-11-26T04:00:00Z", "night"],
        ["2026-11-26T05:30:00Z", "morning"],
        ["2026-11-26T10:00:00Z", "day"],
        ["2026-11-26T14:00:00Z", "golden"],
        ["2026-11-26T15:30:00Z", "night"],
    ])("at %s it is %s", (time, daypart) => {
        expect(daypartAt(new Date(time), times)).toBe(daypart);
    });
});

describe("sunPosition", () => {
    it("puts the sun due south and about 30° high at noon in late November", () => {
        const { azimuthDegrees, elevationDegrees } = sunPosition(
            new Date("2026-11-27T10:00:00Z"),
            38.9,
            22.43
        );

        expect(azimuthDegrees).toBeGreaterThan(170);
        expect(azimuthDegrees).toBeLessThan(185);
        expect(elevationDegrees).toBeCloseTo(30, 0);
    });

    it("climbs to about 71° at the summer solstice", () => {
        expect(
            sunPosition(new Date("2026-06-21T09:40:00Z"), 38.9, 22.43).elevationDegrees
        ).toBeCloseTo(71, 0);
    });

    it("rises in the south-east and sets in the south-west in winter", () => {
        expect(
            sunPosition(new Date("2026-11-27T06:30:00Z"), 38.9, 22.43).azimuthDegrees
        ).toBeLessThan(140);
        expect(
            sunPosition(new Date("2026-11-27T14:30:00Z"), 38.9, 22.43).azimuthDegrees
        ).toBeGreaterThan(220);
    });
});

describe("daylightProgress and formatClockTime", () => {
    it("measures how far the day has gone, clamped to 0–1", () => {
        expect(daylightProgress(150, 100, 200)).toBe(0.5);
        expect(daylightProgress(50, 100, 200)).toBe(0);
        expect(daylightProgress(250, 100, 200)).toBe(1);
    });

    it("formats times in Athens with a 24-hour clock", () => {
        expect(formatClockTime(Date.parse("2026-11-27T05:25:00Z"))).toBe("07:25");
        expect(formatClockTime(Date.parse("2026-11-27T15:10:00Z"))).toBe("17:10");
    });
});
