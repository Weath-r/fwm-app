import {
    daylightMinutes,
    daylightProgress,
    daypartAt,
    formatClockTime,
    moonLitPath,
    moonPass,
    moonPhase,
    moonPhaseName,
    signedMinutes,
    sunPosition,
    sunTimes,
} from "../sky";

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

describe("moonPhase", () => {
    it("is full on 24 November 2026", () => {
        const moon = moonPhase(new Date("2026-11-24T15:00:00Z"));

        expect(moon.illumination).toBeGreaterThan(0.99);
        expect(moon.phase).toBeCloseTo(0.5, 2);
    });

    it("is new on 9 December 2026", () => {
        expect(moonPhase(new Date("2026-12-09T00:00:00Z")).illumination).toBeLessThan(0.01);
    });
});

describe("moonLitPath", () => {
    it("lights the right half at first quarter", () => {
        expect(moonLitPath(0.25, 12)).toBe("M12 0 A12 12 0 0 1 12 24 A0 12 0 0 0 12 0 Z");
    });

    it("lights the left half at last quarter", () => {
        expect(moonLitPath(0.75, 12)).toBe("M12 0 A12 12 0 0 0 12 24 A0 12 0 0 1 12 0 Z");
    });

    it("bulges the terminator outwards for a waxing crescent and inwards for a waxing gibbous", () => {
        expect(moonLitPath(0.1, 12)).toMatch(/0 0 0 12 0 Z$/);
        expect(moonLitPath(0.4, 12)).toMatch(/0 0 1 12 0 Z$/);
    });

    it("covers the whole disk at full moon", () => {
        expect(moonLitPath(0.5, 12)).toBe("M12 0 A12 12 0 0 0 12 24 A12 12 0 0 0 12 0 Z");
    });
});

describe("moonPhaseName", () => {
    it.each([
        [0.01, "new"],
        [0.1, "waxingCrescent"],
        [0.25, "firstQuarter"],
        [0.4, "waxingGibbous"],
        [0.5, "full"],
        [0.66, "waningGibbous"],
        [0.75, "lastQuarter"],
        [0.9, "waningCrescent"],
        [0.99, "new"],
    ])("names phase %s as %s", (phase, name) => {
        expect(moonPhaseName(phase)).toBe(name);
    });
});

describe("moonPass", () => {
    it("follows the moon from yesterday's rise to tomorrow's set", () => {
        const pass = moonPass(new Date("2026-11-24T22:00:00Z"), 38.9, 22.43);

        expect(pass?.rise.toISOString().slice(0, 16)).toBe("2026-11-24T14:42");
        expect(pass?.set.toISOString().slice(0, 16)).toBe("2026-11-25T06:29");
        expect(pass?.peakElevationDegrees).toBeGreaterThan(60);
    });

    it("returns nothing while the moon is below the horizon", () => {
        expect(moonPass(new Date("2026-11-28T18:00:00Z"), 38.9, 22.43)).toBeNull();
    });
});

describe("daylightMinutes and signedMinutes", () => {
    it("gives Lamia about 9 h 44 min of daylight on 27 November", () => {
        expect(
            Math.round(daylightMinutes(sunTimes(new Date("2026-11-27T12:00:00Z"), 38.9, 22.43)))
        ).toBe(584);
    });

    it("signs a change and hides one that rounds to zero", () => {
        expect(signedMinutes(-1.6)).toBe("−2");
        expect(signedMinutes(1.2)).toBe("+1");
        expect(signedMinutes(0.3)).toBeNull();
    });
});
