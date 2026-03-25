import {
    ForecastPeriod,
    CreateSignalParams,
    AnySignalType,
    SignalCategory,
    SignalScope,
    BaseSignal,
    BasePayload,
} from "@/types";
import dayjs from "@/utils/dateTimeUtils";

export function hourToPeriod(hour: number): ForecastPeriod {
    if (hour < 6) return ForecastPeriod.NIGHT;
    if (hour < 12) return ForecastPeriod.MORNING;
    if (hour < 18) return ForecastPeriod.AFTERNOON;
    return ForecastPeriod.EVENING;
}

export const timestampToHour = (timestamp: number): number => {
    const date = dayjs(timestamp);
    return date.hour();
};

export function createSignal<TPayload = BasePayload>(
    params: CreateSignalParams<TPayload>
): BaseSignal<TPayload> {
    return {
        id: crypto.randomUUID(),
        scope: params.scope,
        category: params.category,
        type: params.type,
        importance: params.importance,
        payload: params.payload,
    };
}

export function createDaySignal<TPayload = BasePayload>(
    category: SignalCategory,
    type: AnySignalType,
    importance: number,
    payload?: TPayload
) {
    return createSignal({
        scope: SignalScope.DAY,
        category,
        type,
        importance,
        payload,
    });
}

export function createPeriodSignal<TPayload = BasePayload>(
    period: ForecastPeriod,
    category: SignalCategory,
    type: AnySignalType,
    importance: number,
    payload?: TPayload
) {
    return createSignal({
        scope: SignalScope.PERIOD,
        category,
        type,
        importance,
        payload: {
            period,
            ...payload,
        } as TPayload,
    });
}
