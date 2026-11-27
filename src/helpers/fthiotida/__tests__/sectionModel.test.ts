import { isInsideOutline } from "@/utils/geoToSlab";
import { buildDayModel, placeholderAreas } from "../sectionModel";
import type { FthiotidaForecastDay } from "../forecastDays";

const day: FthiotidaForecastDay = {
    id: 1,
    forecastDate: "2026-11-26",
    entries: {
        Lamia: {
            location: [22.434891, 38.903708],
            tmax: 16,
            tmin: 8,
            weatherConditions: {
                icon: "icon-id",
                label: "Σχεδόν αίθριος",
                value: "intermittent_clouds",
            },
            snow: 0,
        },
        Oiti: {
            location: [22.311391, 38.783776],
            tmax: 4,
            tmin: -2,
            weatherConditions: { label: "Άγνωστο", value: "clear_night" },
            snow: 1600,
        },
        Kamena: { tmax: 17, tmin: 9 },
        Maliakos: {
            location: [22.60516214148766, 38.86432332239475],
            wmin: 2,
            wmax: 3,
            windDirection: 45,
        },
        Evvoikos: { location: [23.160864151144647, 38.74918031933272], wmin: 3 },
    },
};

describe("buildDayModel", () => {
    const model = buildDayModel(day);

    it("keeps areas and wind zones with a location", () => {
        expect(model.areas.map((area) => area.key)).toEqual(["Lamia", "Oiti"]);
        expect(model.winds.map((wind) => wind.key)).toEqual(["Maliakos"]);
    });

    it("resolves conditions and falls back to the stored icon for unknown keys", () => {
        const lamia = model.areas.find((area) => area.key === "Lamia");
        const oiti = model.areas.find((area) => area.key === "Oiti");

        expect(lamia?.appearance).toEqual({ object: "sunWithWisp", groundEffect: "sunlight" });
        expect(lamia?.conditionIcon).toBe("icon-id");
        expect(oiti?.appearance).toBeNull();
    });

    it("treats a zero snow level as none and fades caps by the area's level", () => {
        expect(model.areas.find((area) => area.key === "Lamia")?.snowLevel).toBeUndefined();
        expect(model.areas.find((area) => area.key === "Oiti")?.snowLevel).toBe(1600);
        expect(model.snowCaps).toEqual([
            { id: "oiti", anchor: expect.any(Object), opacity: expect.closeTo(0.613, 3) },
        ]);
    });

    it("anchors from real coordinates, the marker nudge and the outline snap", () => {
        const lamia = model.areas.find((area) => area.key === "Lamia");

        expect(lamia?.anchor.x).toBeCloseTo(0.415, 2);
        expect(lamia?.anchor.y).toBeCloseTo(0.599, 2);
    });

    it("snaps areas on the border inside the outline", () => {
        const oiti = model.areas.find((area) => area.key === "Oiti");

        expect(oiti && isInsideOutline(oiti.anchor)).toBe(true);
    });
});

describe("placeholderAreas", () => {
    it("places all nine areas on land for the empty state", () => {
        const placeholders = placeholderAreas();

        expect(placeholders.map((placeholder) => placeholder.key)).toEqual([
            "Lamia",
            "North",
            "Orthris",
            "East",
            "West",
            "Kamena",
            "Oiti",
            "Amfikleia",
            "Lokrida",
        ]);
        placeholders.forEach((placeholder) => {
            expect(isInsideOutline(placeholder.anchor)).toBe(true);
        });
    });
});
