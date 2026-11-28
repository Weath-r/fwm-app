import { useSyncExternalStore } from "react";
import {
    daylightMinutes,
    daypartAt,
    moonPass,
    moonPhase,
    sunPosition,
    sunTimes,
    type Daypart,
    type MoonPhase,
} from "@/utils/sky";

const LAMIA_LATITUDE = 38.9;
const LAMIA_LONGITUDE = 22.43;
const REFRESH_MILLISECONDS = 10 * 60 * 1000;
const MINUTE_MILLISECONDS = 60 * 1000;
const DAY_MILLISECONDS = 24 * 60 * MINUTE_MILLISECONDS;

export type Sky = {
    daypart: Daypart;
    noonElevationDegrees: number;
    now: number;
    sunrise: number;
    sunset: number;
    nextSunrise: number;
    moon: MoonPhase;
    moonRise: number;
    moonSet: number;
    moonPeakElevationDegrees: number;
    daylightMinutes: number;
    daylightChangeMinutes: number;
};

const subscribe = (onChange: () => void) => {
    const timer = window.setInterval(onChange, REFRESH_MILLISECONDS);
    return () => window.clearInterval(timer);
};

const readSky = (): string => {
    const now = new Date();
    const { sunrise, sunset, solarNoon } = sunTimes(now, LAMIA_LATITUDE, LAMIA_LONGITUDE);
    const moon = moonPhase(now);
    const pass = moonPass(now, LAMIA_LATITUDE, LAMIA_LONGITUDE);
    const today = daylightMinutes({ sunrise, sunset });
    const yesterday = daylightMinutes(
        sunTimes(new Date(now.getTime() - DAY_MILLISECONDS), LAMIA_LATITUDE, LAMIA_LONGITUDE)
    );
    const nextSunrise =
        now.getTime() < sunrise.getTime()
            ? sunrise
            : sunTimes(new Date(now.getTime() + DAY_MILLISECONDS), LAMIA_LATITUDE, LAMIA_LONGITUDE)
                  .sunrise;
    return [
        daypartAt(now, { sunrise, sunset }),
        sunPosition(solarNoon, LAMIA_LATITUDE, LAMIA_LONGITUDE).elevationDegrees.toFixed(1),
        Math.floor(now.getTime() / MINUTE_MILLISECONDS) * MINUTE_MILLISECONDS,
        sunrise.getTime(),
        sunset.getTime(),
        nextSunrise.getTime(),
        moon.illumination.toFixed(3),
        moon.phase.toFixed(3),
        pass?.rise.getTime() ?? 0,
        pass?.set.getTime() ?? 0,
        pass?.peakElevationDegrees.toFixed(1) ?? 0,
        Math.round(today),
        (today - yesterday).toFixed(2),
    ].join("|");
};

const serverSky = (): string => "day|30|0|0|0|0|0.5|0.5|0|0|0|0|0";

export const useSky = (): Sky => {
    const [
        daypart,
        noonElevation,
        now,
        sunrise,
        sunset,
        nextSunrise,
        illumination,
        phase,
        moonRise,
        moonSet,
        moonPeak,
        daylight,
        daylightChange,
    ] = useSyncExternalStore(subscribe, readSky, serverSky).split("|");
    return {
        daypart: daypart as Daypart,
        noonElevationDegrees: Number(noonElevation),
        now: Number(now),
        sunrise: Number(sunrise),
        sunset: Number(sunset),
        nextSunrise: Number(nextSunrise),
        moon: { illumination: Number(illumination), phase: Number(phase) },
        moonRise: Number(moonRise),
        moonSet: Number(moonSet),
        moonPeakElevationDegrees: Number(moonPeak),
        daylightMinutes: Number(daylight),
        daylightChangeMinutes: Number(daylightChange),
    };
};
