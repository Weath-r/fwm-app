import {
    areaWind,
    compassPoint,
    formatOrdinal,
    highsComparison,
    nearestWind,
    rangeBar,
    regionalRange,
    temperatureColour,
} from "../areaSummary";
import type { DioramaArea, DioramaWind } from "../sectionModel";

const area = (key: string, high?: number, low?: number, x = 0.5, y = 0.5): DioramaArea =>
    ({ key, translationKey: key, anchor: { x, y }, appearance: null, high, low }) as DioramaArea;

const wind = (key: string, x: number, y: number): DioramaWind =>
    ({
        key,
        translationKey: key,
        anchor: { x, y },
        directionDegrees: 0,
        beaufortMax: 3,
    }) as DioramaWind;

const areas = [
    area("Lamia", 16, 8),
    area("Oiti", 4, -2),
    area("Kamena", 18, 10),
    area("Lokrida", 16, 9),
    area("North"),
];

describe("regionalRange and rangeBar", () => {
    it("spans the coldest low to the warmest high", () => {
        expect(regionalRange(areas)).toEqual({ min: -2, max: 18 });
    });

    it("returns null without temperatures", () => {
        expect(regionalRange([area("North")])).toBeNull();
    });

    it("places an area's range on the shared scale", () => {
        expect(rangeBar(8, 16, { min: -2, max: 18 })).toEqual({ left: 50, width: 40 });
    });

    it("keeps a minimum visible width", () => {
        expect(rangeBar(5, 5, { min: -2, max: 18 }).width).toBe(4);
    });
});

describe("highsComparison", () => {
    it("ranks the selected area against areas with a high", () => {
        const comparison = highsComparison(areas, "Lamia");

        expect(comparison).toMatchObject({
            low: 4,
            high: 18,
            warmerCount: 1,
            colderCount: 1,
            total: 4,
        });
        expect(comparison?.dots.find((dot) => dot.selected)?.key).toBe("Lamia");
    });

    it("returns null when the selected area has no high", () => {
        expect(highsComparison(areas, "North")).toBeNull();
    });
});

describe("helpers", () => {
    it("maps temperatures to the shared colour scale", () => {
        expect(temperatureColour(-20)).toBe("#8ab4ff");
        expect(temperatureColour(16)).toBe("#e8d26a");
        expect(temperatureColour(30)).toBe("#ec7f4f");
    });

    it.each([
        [0, "N"],
        [44, "NE"],
        [135, "SE"],
        [225, "SW"],
        [359, "N"],
        [-90, "W"],
    ])("names %s° as %s", (degrees, point) => {
        expect(compassPoint(degrees)).toBe(point);
    });

    it("finds the wind zone nearest to an area", () => {
        const lamia = area("Lamia", 16, 8, 0.37, 0.48);
        const winds = [wind("Maliakos", 0.47, 0.52), wind("Evvoikos", 0.77, 0.67)];

        expect(nearestWind(lamia, winds)?.key).toBe("Maliakos");
        expect(nearestWind(lamia, [])).toBeNull();
    });

    it("uses the assigned wind zone even when another zone is nearer", () => {
        const kamena = { ...area("Kamena", 17, 9, 0.6, 0.7), windZone: "Maliakos" } as DioramaArea;
        const winds = [wind("Parnasos", 0.6, 0.72), wind("Maliakos", 0.47, 0.52)];

        expect(areaWind(kamena, winds)?.key).toBe("Maliakos");
    });

    it("falls back to the nearest zone when the assigned one is missing", () => {
        const kamena = { ...area("Kamena", 17, 9, 0.6, 0.7), windZone: "Maliakos" } as DioramaArea;

        expect(areaWind(kamena, [wind("Parnasos", 0.6, 0.72)])?.key).toBe("Parnasos");
    });

    it.each([
        [1, "en", "1st"],
        [2, "en", "2nd"],
        [3, "en", "3rd"],
        [4, "en", "4th"],
        [2, "el", "2η"],
    ])("formats position %s in %s as %s", (position, language, expected) => {
        expect(formatOrdinal(position, language)).toBe(expected);
    });
});
