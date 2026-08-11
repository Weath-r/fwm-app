import {
    SignalCategory,
    SignalScope,
    AnySignalType,
    TemperatureSignal,
    WindSignal,
    WindDirection,
    PrecipitationType,
    PrecipitationSignal,
    CloudSignal,
    ChangeSignal,
    ForecastPeriod,
} from "./enums/weatherForecastEnums";

type GfsForecastObject = {
    data: number[];
    header: {
        category: string;
    };
};

export type ForecastGFSData = {
    [k: string]: GfsForecastObject[];
};

type ForecastHourlyUnits = {
    time: string;
    temperature_2m: string;
    pressure_msl: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
    rain: string;
    showers: string;
    snowfall: string;
    dew_point_2m: string;
    cloud_cover: string;
};

export type ForecastHourly = {
    time: string[];
    temperature_2m: number[];
    forecastIcon: string[];
    pressure_msl: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    rain: number[];
    showers: number[];
    snowfall: number[];
    dew_point_2m: number[];
    cloud_cover: number[];
};

export type ForecastDailyUnits = {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    rain_sum: string;
    snowfall_sum: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    wind_direction_10m_dominant: string;
    showers_sum: string;
    precipitation_probability_max: string;
};

export type ForecastDaily = {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    forecastIcon: string[];
    rain_sum: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[];
    showers_sum: number[];
    precipitation_probability_max: number[];
};

export type ForecastStructure = {
    hourly_units: ForecastHourlyUnits;
    hourly: ForecastHourly;
    daily_units: ForecastDailyUnits;
    daily: ForecastDaily;
};

export type WeatherForecastResponse = {
    station_id: number;
    full_forecast: ForecastStructure;
};

export type TemperatureLayerData = {
    lat: number;
    lng: number;
    temp: number;
    elevation: number;
};

export type ElevationKnownPoints = {
    lng: number;
    lat: number;
    elevation: number;
};
export interface BasePayload {
    period?: ForecastPeriod;
    tempMax?: number;
    tempDelta?: number;
    hour?: number;
    dominantDir?: string;
    dominantType?: string;
    windMax?: number;
    possiblePeakHour?: number;
    possibleCalmHour?: number;
    meanWind?: number;
    ratio?: number;
    totalWetHours?: number;
    totalHeavyHours?: number;
    maxConsecutiveWet?: number;
    startHour?: number;
    endHour?: number;
    heavyHours?: number;
    wetHours?: number;
}

export interface BaseSignal<T = BasePayload> {
    id: string;
    scope: SignalScope;
    category: SignalCategory;
    type: string;
    importance: number; // 1-5 scale
    payload?: T;
}

export interface TemperatureSignalInstance extends BaseSignal<{
    min?: number;
    max?: number;
    delta?: number;
}> {
    category: SignalCategory.TEMPERATURE;
    type: TemperatureSignal;
}

export interface WindSignalInstance extends BaseSignal<{
    maxWind?: number;
    maxGust?: number;
    direction?: WindDirection;
}> {
    category: SignalCategory.WIND;
    type: WindSignal;
}

export interface PrecipitationSignalInstance extends BaseSignal<{
    total?: number;
    intensity?: number;
    type?: PrecipitationType;
}> {
    category: SignalCategory.PRECIPITATION;
    type: PrecipitationSignal;
}

export interface CloudSignalInstance extends BaseSignal {
    category: SignalCategory.CLOUD;
    type: CloudSignal;
}

export interface ChangeSignalInstance extends BaseSignal<{
    hour: number;
}> {
    category: SignalCategory.CHANGE;
    type: ChangeSignal;
}

export type ForecastSignal =
    | TemperatureSignalInstance
    | WindSignalInstance
    | PrecipitationSignalInstance
    | CloudSignalInstance
    | ChangeSignalInstance;

export interface PeriodSummary {
    period: ForecastPeriod;
    tempMin: number;
    tempMax: number;
    maxWind: number;
    maxGust?: number;
    dominantWindDir?: WindDirection;
    totalPrecip: number;
    precipType?: PrecipitationType;
    signals: ForecastSignal[];
}

export interface DayForecastSummary {
    date: string;
    signals: ForecastSignal;
    periods: PeriodSummary[];
}

export interface CreateSignalParams<TPayload = unknown> {
    scope: SignalScope;
    category: SignalCategory;
    type: AnySignalType;
    importance: number;
    payload?: TPayload;
}
