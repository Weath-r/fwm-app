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

export type ForecastData = {
    temperature: number;
    dewpoint?: number;
    windspd: number;
    winddir: number;
    windgust?: number;
    percipitation: number;
    accumulated_rain: number;
    accumulated_snow: number;
    snow: number;
    cloudcover: number;
    time: number;
    forecastIcon: string;
};

type GfsForecastObject = {
    data: number[];
    header: {
        category: string;
    };
};

export type ForecastGFSData = {
    [k: string]: GfsForecastObject[];
};

export type ForecastLayerData = {
    lat: number;
    lng: number;
    temp: number;
    elevation: number;
};

export type WeatherForecastResponse = {
    station_id: number;
    full_forecast: ForecastData[];
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
