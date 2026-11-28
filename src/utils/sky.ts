import * as SunCalc from "suncalc";

export type SunTimes = {
    sunrise: Date;
    sunset: Date;
    solarNoon: Date;
};

export type Daypart = "morning" | "day" | "golden" | "night";

export type SunPosition = {
    azimuthDegrees: number;
    elevationDegrees: number;
};

export type MoonPhase = {
    illumination: number;
    phase: number;
};

const MORNING_MILLISECONDS = 3 * 60 * 60 * 1000;
const GOLDEN_HOUR_MILLISECONDS = 90 * 60 * 1000;

export const sunTimes = (date: Date, latitude: number, longitude: number): SunTimes => {
    const noon = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12)
    );
    const { sunrise, sunset, solarNoon, nadir } = SunCalc.getTimes(noon, latitude, longitude);
    return { sunrise: sunrise ?? nadir, sunset: sunset ?? nadir, solarNoon };
};

export const sunPosition = (date: Date, latitude: number, longitude: number): SunPosition => {
    const { azimuth, altitude } = SunCalc.getPosition(date, latitude, longitude);
    return { azimuthDegrees: azimuth, elevationDegrees: altitude };
};

export const moonPhase = (date: Date): MoonPhase => {
    const { fraction, phase } = SunCalc.getMoonIllumination(date);
    return { illumination: fraction, phase };
};

export const daypartAt = (
    now: Date,
    { sunrise, sunset }: Pick<SunTimes, "sunrise" | "sunset">
): Daypart => {
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

export const formatClockTime = (timestamp: number): string =>
    new Intl.DateTimeFormat("el-GR", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: "Europe/Athens",
    }).format(timestamp);

export const daylightProgress = (now: number, sunrise: number, sunset: number): number =>
    Math.min(1, Math.max(0, (now - sunrise) / (sunset - sunrise)));

export const moonLitPath = (phase: number, radius: number): string => {
    const terminator = Number((radius * Math.abs(Math.cos(2 * Math.PI * phase))).toFixed(2));
    const waxing = phase < 0.5;
    const gibbous = phase > 0.25 && phase < 0.75;
    const top = `${radius} 0`;
    const bottom = `${radius} ${radius * 2}`;
    const limbSweep = waxing ? 1 : 0;
    const terminatorSweep = waxing === gibbous ? 1 : 0;
    return `M${top} A${radius} ${radius} 0 0 ${limbSweep} ${bottom} A${terminator} ${radius} 0 0 ${terminatorSweep} ${top} Z`;
};

export type MoonPass = {
    rise: Date;
    set: Date;
    peakElevationDegrees: number;
};

export type MoonPhaseName =
    | "new"
    | "waxingCrescent"
    | "firstQuarter"
    | "waxingGibbous"
    | "full"
    | "waningGibbous"
    | "lastQuarter"
    | "waningCrescent";

const MOON_PHASE_NAMES: MoonPhaseName[] = [
    "new",
    "waxingCrescent",
    "firstQuarter",
    "waxingGibbous",
    "full",
    "waningGibbous",
    "lastQuarter",
    "waningCrescent",
];

const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export const moonPhaseName = (phase: number): MoonPhaseName =>
    MOON_PHASE_NAMES[Math.round(phase * MOON_PHASE_NAMES.length) % MOON_PHASE_NAMES.length];

export const moonPass = (now: Date, latitude: number, longitude: number): MoonPass | null => {
    if (SunCalc.getMoonPosition(now, latitude, longitude).altitude <= 0) {
        return null;
    }
    const days = [-1, 0, 1].map((offset) =>
        SunCalc.getMoonTimes(
            new Date(now.getTime() + offset * DAY_MILLISECONDS),
            latitude,
            longitude
        )
    );
    const rises = days.flatMap(({ rise }) => (rise && rise <= now ? [rise.getTime()] : []));
    const sets = days.flatMap(({ set }) => (set && set > now ? [set.getTime()] : []));
    if (rises.length === 0 || sets.length === 0) {
        return null;
    }
    const rise = new Date(Math.max(...rises));
    const set = new Date(Math.min(...sets));
    const middle = new Date((rise.getTime() + set.getTime()) / 2);
    return {
        rise,
        set,
        peakElevationDegrees: SunCalc.getMoonPosition(middle, latitude, longitude).altitude,
    };
};

export const daylightMinutes = ({
    sunrise,
    sunset,
}: Pick<SunTimes, "sunrise" | "sunset">): number => (sunset.getTime() - sunrise.getTime()) / 60000;

export const signedMinutes = (minutes: number): string | null => {
    const rounded = Math.round(minutes);
    if (rounded === 0) {
        return null;
    }
    return `${rounded > 0 ? "+" : "−"}${Math.abs(rounded)}`;
};
