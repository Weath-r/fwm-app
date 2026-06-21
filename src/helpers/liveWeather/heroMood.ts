/**
 * Computes the live-weather hero "mood": a gradient (composited on top of the
 * station backdrop to guarantee text contrast and inject weather feeling) plus
 * a backdrop CSS filter, derived from the current weather condition and the
 * time of day.
 *
 * Same data as today — `weatherDescription` (a `weather_icons` key) and
 * `dateCreated`. Real sunrise/sunset is intentionally out of scope; day/night
 * is a tunable hour threshold.
 */

export type HeroMood = {
    gradient: string;
    backdropFilter: string;
    isNight: boolean;
};

type MoodCategory = "clear" | "partly" | "cloudy" | "rain" | "snow";

// Tunable day/night boundaries (local hour).
const DAY_START = 7;
const NIGHT_START = 20;

// `weather_icons` keys -> mood category.
const CONDITION_CATEGORY: Record<string, MoodCategory> = {
    sunny: "clear",
    clear: "clear",
    hazy_sunshine: "clear",
    partly_sunny: "partly",
    partly_cloudy: "partly",
    intermittent_clouds: "partly",
    cloudy: "cloudy",
    mostly_cloudy: "cloudy",
    rain: "rain",
    showers: "rain",
    mostly_cloudy_w_showers: "rain",
    partly_sunny_w_showers: "rain",
    "t-storms": "rain",
    freezing_rain: "rain",
    snow: "snow",
    flurries: "snow",
    sleet: "snow",
    rain_and_snow: "snow",
};

const FALLBACK_CATEGORY: MoodCategory = "partly";

type MoodPreset = Omit<HeroMood, "isNight">;

const PRESETS: Record<string, MoodPreset> = {
    "clear-day": {
        gradient:
            "linear-gradient(to top, rgba(43,61,73,.94) 0%, rgba(43,61,73,.5) 38%, rgba(255,178,84,.32) 100%)",
        backdropFilter: "saturate(1.08) brightness(1.02)",
    },
    "clear-night": {
        gradient:
            "linear-gradient(to top, rgba(14,20,30,.96) 0%, rgba(26,34,58,.62) 42%, rgba(58,46,120,.4) 100%)",
        backdropFilter: "saturate(.85) brightness(.6)",
    },
    "partly-day": {
        gradient:
            "linear-gradient(to top, rgba(43,61,73,.94) 0%, rgba(43,61,73,.5) 38%, rgba(159,179,191,.3) 100%)",
        backdropFilter: "saturate(.9) brightness(.95)",
    },
    "partly-night": {
        gradient:
            "linear-gradient(to top, rgba(14,20,30,.96) 0%, rgba(26,34,58,.6) 44%, rgba(70,84,110,.34) 100%)",
        backdropFilter: "saturate(.7) brightness(.6)",
    },
    "cloudy-day": {
        gradient:
            "linear-gradient(to top, rgba(43,61,73,.95) 0%, rgba(70,86,98,.6) 45%, rgba(159,179,191,.45) 100%)",
        backdropFilter: "saturate(.7) brightness(.82)",
    },
    "cloudy-night": {
        gradient:
            "linear-gradient(to top, rgba(18,26,36,.96) 0%, rgba(46,58,72,.62) 46%, rgba(90,104,118,.4) 100%)",
        backdropFilter: "saturate(.6) brightness(.55)",
    },
    "rain-day": {
        gradient:
            "linear-gradient(to top, rgba(24,38,52,.96) 0%, rgba(40,64,86,.7) 45%, rgba(70,110,140,.5) 100%)",
        backdropFilter: "saturate(.8) brightness(.7)",
    },
    "rain-night": {
        gradient:
            "linear-gradient(to top, rgba(12,22,32,.97) 0%, rgba(28,46,64,.7) 46%, rgba(48,78,104,.46) 100%)",
        backdropFilter: "saturate(.7) brightness(.5)",
    },
    "snow-day": {
        gradient:
            "linear-gradient(to top, rgba(34,52,66,.95) 0%, rgba(120,150,165,.5) 48%, rgba(214,236,240,.55) 100%)",
        backdropFilter: "saturate(.65) brightness(1.05)",
    },
    "snow-night": {
        gradient:
            "linear-gradient(to top, rgba(20,32,44,.96) 0%, rgba(70,92,108,.55) 48%, rgba(150,172,186,.45) 100%)",
        backdropFilter: "saturate(.55) brightness(.7)",
    },
};

export const getHeroMood = (
    weatherDescription: string,
    dateCreated: string | number | Date
): HeroMood => {
    const hour = new Date(dateCreated).getHours();
    const isNight = hour < DAY_START || hour >= NIGHT_START;

    const category =
        CONDITION_CATEGORY[weatherDescription?.toLowerCase()] ?? FALLBACK_CATEGORY;
    const preset = PRESETS[`${category}-${isNight ? "night" : "day"}`];

    return { ...preset, isNight };
};
