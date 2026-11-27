export type SunTimes = {
    sunrise: Date;
    sunset: Date;
};

export type Daypart = "morning" | "day" | "golden" | "night";

const RADIANS = Math.PI / 180;
const DAY_MILLISECONDS = 86_400_000;
const UNIX_EPOCH_JULIAN_DATE = 2_440_587.5;
const J2000 = 2_451_545;
const MORNING_MILLISECONDS = 3 * 60 * 60 * 1000;
const GOLDEN_HOUR_MILLISECONDS = 90 * 60 * 1000;

const toJulianDate = (date: Date) => date.getTime() / DAY_MILLISECONDS + UNIX_EPOCH_JULIAN_DATE;
const fromJulianDate = (julianDate: number) =>
    new Date((julianDate - UNIX_EPOCH_JULIAN_DATE) * DAY_MILLISECONDS);

export const sunTimes = (date: Date, latitude: number, longitude: number): SunTimes => {
    const noon = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12)
    );
    const dayNumber = Math.round(toJulianDate(noon) - J2000);
    const meanSolarTime = dayNumber - longitude / 360;
    const meanAnomaly = (357.5291 + 0.98560028 * meanSolarTime) % 360;
    const centre =
        1.9148 * Math.sin(meanAnomaly * RADIANS) +
        0.02 * Math.sin(2 * meanAnomaly * RADIANS) +
        0.0003 * Math.sin(3 * meanAnomaly * RADIANS);
    const eclipticLongitude = (meanAnomaly + centre + 180 + 102.9372) % 360;
    const transit =
        J2000 +
        meanSolarTime +
        0.0053 * Math.sin(meanAnomaly * RADIANS) -
        0.0069 * Math.sin(2 * eclipticLongitude * RADIANS);
    const declination = Math.asin(
        Math.sin(eclipticLongitude * RADIANS) * Math.sin(23.4397 * RADIANS)
    );
    const hourAngle = Math.acos(
        (Math.sin(-0.833 * RADIANS) - Math.sin(latitude * RADIANS) * Math.sin(declination)) /
            (Math.cos(latitude * RADIANS) * Math.cos(declination))
    );
    const halfDay = hourAngle / RADIANS / 360;
    return {
        sunrise: fromJulianDate(transit - halfDay),
        sunset: fromJulianDate(transit + halfDay),
    };
};

export const daypartAt = (now: Date, { sunrise, sunset }: SunTimes): Daypart => {
    const time = now.getTime();
    if (time < sunrise.getTime() || time >= sunset.getTime()) {
        return "night";
    }
    if (time < sunrise.getTime() + MORNING_MILLISECONDS) {
        return "morning";
    }
    if (time >= sunset.getTime() - GOLDEN_HOUR_MILLISECONDS) {
        return "golden";
    }
    return "day";
};

export type SunPosition = {
    azimuthDegrees: number;
    elevationDegrees: number;
};

export const sunPosition = (date: Date, latitude: number, longitude: number): SunPosition => {
    const julianDate = toJulianDate(date);
    const daysSinceJ2000 = julianDate - J2000;
    const meanAnomaly = (357.5291 + 0.98560028 * daysSinceJ2000) % 360;
    const centre =
        1.9148 * Math.sin(meanAnomaly * RADIANS) +
        0.02 * Math.sin(2 * meanAnomaly * RADIANS) +
        0.0003 * Math.sin(3 * meanAnomaly * RADIANS);
    const eclipticLongitude = (meanAnomaly + centre + 180 + 102.9372) % 360;
    const declination = Math.asin(
        Math.sin(eclipticLongitude * RADIANS) * Math.sin(23.4397 * RADIANS)
    );
    const rightAscension = Math.atan2(
        Math.sin(eclipticLongitude * RADIANS) * Math.cos(23.4397 * RADIANS),
        Math.cos(eclipticLongitude * RADIANS)
    );
    const siderealTime = (280.16 + 360.9856235 * daysSinceJ2000 + longitude) * RADIANS;
    const hourAngle = siderealTime - rightAscension;
    const latitudeRadians = latitude * RADIANS;
    const elevation = Math.asin(
        Math.sin(latitudeRadians) * Math.sin(declination) +
            Math.cos(latitudeRadians) * Math.cos(declination) * Math.cos(hourAngle)
    );
    const azimuthFromSouth = Math.atan2(
        Math.sin(hourAngle),
        Math.cos(hourAngle) * Math.sin(latitudeRadians) -
            Math.tan(declination) * Math.cos(latitudeRadians)
    );
    return {
        azimuthDegrees: (((azimuthFromSouth / RADIANS + 180) % 360) + 360) % 360,
        elevationDegrees: elevation / RADIANS,
    };
};

export const formatClockTime = (timestamp: number): string =>
    new Intl.DateTimeFormat("el-GR", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: "Europe/Athens",
    }).format(timestamp);

export const daylightProgress = (now: number, sunrise: number, sunset: number): number =>
    Math.min(1, Math.max(0, (now - sunrise) / (sunset - sunrise)));
