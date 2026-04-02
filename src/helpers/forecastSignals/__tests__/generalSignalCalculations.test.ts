import {
    hourToPeriod,
    timestampToHour,
    createSignal,
    createDaySignal,
    createPeriodSignal,
} from "../generalSignalCalculations";
import {
    SignalCategory,
    SignalScope,
    TemperatureSignal,
    WindSignal,
    PrecipitationSignal,
    ForecastPeriod,
} from "@/types/enums/weatherForecastEnums";

describe("generalSignalCalculations", () => {
    describe("hourToPeriod", () => {
        it("should return NIGHT for hours 0-5", () => {
            expect(hourToPeriod(0)).toBe(ForecastPeriod.NIGHT);
            expect(hourToPeriod(3)).toBe(ForecastPeriod.NIGHT);
            expect(hourToPeriod(5)).toBe(ForecastPeriod.NIGHT);
        });

        it("should return MORNING for hours 6-11", () => {
            expect(hourToPeriod(6)).toBe(ForecastPeriod.MORNING);
            expect(hourToPeriod(9)).toBe(ForecastPeriod.MORNING);
            expect(hourToPeriod(11)).toBe(ForecastPeriod.MORNING);
        });

        it("should return AFTERNOON for hours 12-17", () => {
            expect(hourToPeriod(12)).toBe(ForecastPeriod.AFTERNOON);
            expect(hourToPeriod(15)).toBe(ForecastPeriod.AFTERNOON);
            expect(hourToPeriod(17)).toBe(ForecastPeriod.AFTERNOON);
        });

        it("should return EVENING for hours 18-23", () => {
            expect(hourToPeriod(18)).toBe(ForecastPeriod.EVENING);
            expect(hourToPeriod(21)).toBe(ForecastPeriod.EVENING);
            expect(hourToPeriod(23)).toBe(ForecastPeriod.EVENING);
        });
    });

    describe("timestampToHour", () => {
        it("should return a number", () => {
            const timestamp = Date.now();
            const result = timestampToHour(timestamp);
            expect(typeof result).toBe("number");
        });

        it("should return hour between 0 and 23", () => {
            const timestamp = Date.now();
            const result = timestampToHour(timestamp);

            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(24);
        });

        it("should return integer hour", () => {
            const timestamp = Date.now();
            const result = timestampToHour(timestamp);

            expect(Number.isInteger(result)).toBe(true);
        });

        it("should extract hour from current timestamp", () => {
            // Get current hour to verify we're getting the right timezone
            const now = new Date();
            const currentHour = now.getHours();

            const result = timestampToHour(Date.now());
            // Result should be very close to current hour (within 1 hour for test execution time)
            expect(Math.abs(result - currentHour)).toBeLessThan(2);
        });
    });

    describe("createSignal", () => {
        it("should create signal with all properties", () => {
            const signal = createSignal({
                scope: SignalScope.DAY,
                category: SignalCategory.WIND,
                type: TemperatureSignal.DAY_COLD,
                importance: 3,
                payload: { value: 25 },
            });

            expect(signal.scope).toBe(SignalScope.DAY);
            expect(signal.category).toBe(SignalCategory.WIND);
            expect(signal.type).toBe(TemperatureSignal.DAY_COLD);
            expect(signal.importance).toBe(3);
            expect(signal.payload).toEqual({ value: 25 });
            expect(signal.id).toBeDefined();
        });

        it("should generate unique IDs", () => {
            const signal1 = createSignal({
                scope: SignalScope.DAY,
                category: SignalCategory.WIND,
                type: WindSignal.DAY_MODERATE,
                importance: 1,
            });

            const signal2 = createSignal({
                scope: SignalScope.DAY,
                category: SignalCategory.WIND,
                type: TemperatureSignal.DAY_COLD,
                importance: 1,
            });

            expect(signal1.id).not.toBe(signal2.id);
        });

        it("should handle undefined payload", () => {
            const signal = createSignal({
                scope: SignalScope.DAY,
                category: SignalCategory.TEMPERATURE,
                type: TemperatureSignal.DAY_WARM,
                importance: 2,
            });

            expect(signal.payload).toBeUndefined();
        });
    });

    describe("createDaySignal", () => {
        it("should create signal with DAY scope", () => {
            const signal = createDaySignal(SignalCategory.WIND, WindSignal.DAY_MODERATE, 3, {
                value: 30,
            });

            expect(signal.scope).toBe(SignalScope.DAY);
            expect(signal.category).toBe(SignalCategory.WIND);
            expect(signal.importance).toBe(3);
        });

        it("should create signal without payload", () => {
            const signal = createDaySignal(
                SignalCategory.PRECIPITATION,
                PrecipitationSignal.DOMINANT_TYPE,
                2
            );

            expect(signal.payload).toBeUndefined();
            expect(signal.scope).toBe(SignalScope.DAY);
        });
    });

    describe("createPeriodSignal", () => {
        it("should create signal with PERIOD scope", () => {
            const signal = createPeriodSignal(
                ForecastPeriod.AFTERNOON,
                SignalCategory.TEMPERATURE,
                TemperatureSignal.DAY_WARM,
                2,
                { maxTemp: 28 }
            );

            expect(signal.scope).toBe(SignalScope.PERIOD);
            expect(signal.payload).toEqual({ period: ForecastPeriod.AFTERNOON, maxTemp: 28 });
        });

        it("should include period in payload", () => {
            const signal = createPeriodSignal(
                ForecastPeriod.MORNING,
                SignalCategory.WIND,
                WindSignal.PERIOD_CALM,
                1
            );

            expect(signal.payload?.period).toBe(ForecastPeriod.MORNING);
        });

        it("should merge period with additional payload", () => {
            const additionalPayload = { windSpeedMean: 15 };
            const signal = createPeriodSignal(
                ForecastPeriod.EVENING,
                SignalCategory.WIND,
                WindSignal.PERIOD_MODERATE,
                2,
                additionalPayload
            );

            const payload = signal.payload as any;
            expect(payload.period).toBe(ForecastPeriod.EVENING);
            expect(payload.windSpeedMean).toBe(15);
        });
    });
});
