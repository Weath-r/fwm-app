import { useSyncExternalStore } from "react";
import { daypartAt, sunPosition, sunTimes, type Daypart } from "@/utils/sunTimes";

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
};

const subscribe = (onChange: () => void) => {
    const timer = window.setInterval(onChange, REFRESH_MILLISECONDS);
    return () => window.clearInterval(timer);
};

const readSky = (): string => {
    const now = new Date();
    const { sunrise, sunset } = sunTimes(now, LAMIA_LATITUDE, LAMIA_LONGITUDE);
    const noon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
    const nextSunrise =
        now.getTime() < sunrise.getTime()
            ? sunrise
            : sunTimes(new Date(now.getTime() + DAY_MILLISECONDS), LAMIA_LATITUDE, LAMIA_LONGITUDE)
                  .sunrise;
    return [
        daypartAt(now, { sunrise, sunset }),
        sunPosition(noon, LAMIA_LATITUDE, LAMIA_LONGITUDE).elevationDegrees.toFixed(1),
        Math.floor(now.getTime() / MINUTE_MILLISECONDS) * MINUTE_MILLISECONDS,
        sunrise.getTime(),
        sunset.getTime(),
        nextSunrise.getTime(),
    ].join("|");
};

const serverSky = (): string => "day|30|0|0|0|0";

export const useSky = (): Sky => {
    const [daypart, noonElevation, now, sunrise, sunset, nextSunrise] = useSyncExternalStore(
        subscribe,
        readSky,
        serverSky
    ).split("|");
    return {
        daypart: daypart as Daypart,
        noonElevationDegrees: Number(noonElevation),
        now: Number(now),
        sunrise: Number(sunrise),
        sunset: Number(sunset),
        nextSunrise: Number(nextSunrise),
    };
};

export const useDaypart = (): Daypart => useSky().daypart;
