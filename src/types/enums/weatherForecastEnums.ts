export enum SignalScope {
    DAY = "day", // general signals that apply to the whole day
    PERIOD = "period", // signals that apply to specific periods (e.g., morning, afternoon)
}

export enum SignalCategory {
    TEMPERATURE = "temperature",
    WIND = "wind",
    PRECIPITATION = "precipitation",
    CLOUD = "cloud",
    CHANGE = "change",
}

export enum ForecastPeriod {
    NIGHT = "night", // 00–06
    MORNING = "morning", // 06–12
    AFTERNOON = "afternoon", // 12–18
    EVENING = "evening", // 18–24
}

export enum TemperatureSignal {
    // Day-level
    DAY_COLD = "temp_day_cold",
    DAY_WARM = "temp_day_warm",
    TEMP_DAY_HOT = "temp_dat_hot",
    TEMP_DAY_VHOT = "temp_day_vhot",
    DAY_LARGE_RANGE = "temp_day_large_range", //????
    DAY_SMALL_RANGE = "temp_day_small_range", //????
    RAPID_RISE = "temp_rapid_rise",
    RAPID_DROP = "temp_rapid_drop",
    FROST_RISK = "temp_frost_risk",

    // Period-level
    PERIOD_COLD = "temp_period_cold",
    PERIOD_WARM = "temp_period_warm",
    PERIOD_STEADY = "temp_period_steady",
    PERIOD_RISING = "temp_period_rising",
    PERIOD_FALLING = "temp_period_falling",
}

export enum WindSignal {
    // Day-level
    DAY_MODERATE = "wind_day_moderate",
    DAY_STRONG = "wind_day_strong",
    DAY_SEVERE = "wind_day_severe",
    INCREASING = "wind_increasing",
    DECREASING = "wind_decreasing",
    DIRECTION_DOMINANT = "wind_direction_dominant",
    SHIFT_SIGNIFICANT = "wind_shift_significant",

    // Period-level
    PERIOD_CALM = "wind_period_calm",
    PERIOD_MODERATE = "wind_period_moderate",
    PERIOD_STRONG = "wind_period_strong",
    PERIOD_PEAK = "wind_period_peak",
}

export enum PrecipitationSignal {
    // Day-level
    NONE = "precip_none",
    PRESENT = "precip_present",
    PERSISTENT = "precip_persistent",
    INTERMITTENT = "precip_intermittent",
    HEAVY = "precip_heavy",
    DOMINANT_TYPE = "precip_dominant_type",
    WINDOW_CONFINED = "precip_window_confined",

    // Period-level
    PERIOD_NONE = "precip_period_none",
    PERIOD_BRIEF = "precip_period_brief",
    PERIOD_PERSISTENT = "precip_period_persistent",
    PERIOD_HEAVY = "precip_period_heavy",
}

export enum CloudSignal {
    MOSTLY_CLEAR = "cloud_mostly_clear",
    MOSTLY_CLOUDY = "cloud_mostly_cloudy",
    CLOUDY = "cloudy",
}

export enum ChangeSignal {
    TEMP_PEAK_TIME = "change_temp_peak_time",
    WIND_PEAK_TIME = "change_wind_peak_time",
    PRECIP_ONSET = "change_precip_onset",
    PRECIP_END = "change_precip_end",
}

export type WindDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type PrecipitationType = "rain" | "snow" | "mixed";

export type AnySignalType =
    | TemperatureSignal
    | WindSignal
    | PrecipitationSignal
    | CloudSignal
    | ChangeSignal;
