import { parseForecastRecords, selectForecastDays } from "../forecastDays";

const record = (id: number, forecastDate: string | null, data: Record<string, unknown> = {}) => ({
    id,
    forecast: { dates: { forecast_date: forecastDate }, data },
});

describe("parseForecastRecords", () => {
    beforeEach(() => {
        jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("keeps the newest record per forecast date, newest date first", () => {
        const days = parseForecastRecords([
            record(10, "25/11/2026"),
            record(12, "25/11/2026"),
            record(11, "26/11/2026"),
        ]);

        expect(days.map((day) => [day.forecastDate, day.id])).toEqual([
            ["2026-11-26", 11],
            ["2026-11-25", 12],
        ]);
    });

    it("drops records without a valid forecast date", () => {
        const days = parseForecastRecords([
            record(1, null),
            record(2, "2026-11-26"),
            record(3, "31/02/2026"),
            { id: 4 },
            record(5, "26/11/2026"),
        ]);

        expect(days.map((day) => day.id)).toEqual([5]);
    });

    it("coerces numbers and leaves unusable values undefined", () => {
        const [day] = parseForecastRecords([
            record(1, "26/11/2026", {
                Lamia: {
                    tmax: "16",
                    tmin: null,
                    precipProbability: "",
                    snow: "abc",
                    windDirection: 45,
                },
            }),
        ]);

        expect(day.entries.Lamia).toMatchObject({ tmax: 16, windDirection: 45 });
        expect(day.entries.Lamia.tmin).toBeUndefined();
        expect(day.entries.Lamia.precipProbability).toBeUndefined();
        expect(day.entries.Lamia.snow).toBeUndefined();
    });

    it("keeps an area when only its condition or location is malformed", () => {
        const [day] = parseForecastRecords([
            record(1, "26/11/2026", {
                Oiti: { tmax: 9, weatherConditions: { label: "Χιόνι" }, location: "bad" },
            }),
        ]);

        expect(day.entries.Oiti.tmax).toBe(9);
        expect(day.entries.Oiti.weatherConditions).toBeUndefined();
        expect(day.entries.Oiti.location).toBeUndefined();
    });

    it("skips entries that are not objects and keeps unknown fields", () => {
        const [day] = parseForecastRecords([
            record(1, "26/11/2026", { Lamia: null, Oiti: { tmax: 4, futureField: "kept" } }),
        ]);

        expect(Object.keys(day.entries)).toEqual(["Oiti"]);
        expect(day.entries.Oiti.futureField).toBe("kept");
    });
});

describe("selectForecastDays", () => {
    const days = parseForecastRecords([record(1, "25/11/2026"), record(2, "26/11/2026")]);

    it("picks today and tomorrow by the Athens date", () => {
        const selection = selectForecastDays(days, new Date("2026-11-25T21:30:00Z"));

        expect(selection.today?.id).toBe(1);
        expect(selection.tomorrow?.id).toBe(2);
    });

    it("rolls over at Athens midnight, not UTC midnight", () => {
        const selection = selectForecastDays(days, new Date("2026-11-25T22:30:00Z"));

        expect(selection.today?.id).toBe(2);
        expect(selection.tomorrow).toBeNull();
    });
});
