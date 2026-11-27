import { geoToSlab, isInsideOutline, nudgeSlabPoint, snapInsideOutline } from "../geoToSlab";

const LAMIA: [number, number] = [22.434891, 38.903708];
const LOKRIDA: [number, number] = [23.034462, 38.650973];
const DOMOKOS: [number, number] = [22.462680353076728, 39.085151037874574];
const OITI: [number, number] = [22.311391, 38.783776];
const MALIAKOS: [number, number] = [22.60516214148766, 38.86432332239475];

describe("geoToSlab", () => {
    it("places Lamia just west of the Maliakos gulf head", () => {
        const lamia = geoToSlab(LAMIA);

        expect(lamia.x).toBeCloseTo(0.374, 2);
        expect(lamia.y).toBeCloseTo(0.477, 2);
    });

    it("keeps east to the right and north to the top", () => {
        const lamia = geoToSlab(LAMIA);

        expect(geoToSlab(LOKRIDA).x).toBeGreaterThan(lamia.x);
        expect(geoToSlab(LOKRIDA).y).toBeGreaterThan(lamia.y);
        expect(geoToSlab(DOMOKOS).y).toBeLessThan(lamia.y);
    });

    it("puts land areas on the outline and the gulf wind zone off it", () => {
        expect(isInsideOutline(geoToSlab(LAMIA))).toBe(true);
        expect(isInsideOutline(geoToSlab(LOKRIDA))).toBe(true);
        expect(isInsideOutline(geoToSlab(MALIAKOS))).toBe(false);
    });
});

describe("snapInsideOutline", () => {
    it("leaves points that are already inside untouched", () => {
        const lamia = geoToSlab(LAMIA);

        expect(snapInsideOutline(lamia)).toBe(lamia);
    });

    it("moves a border point such as Mt. Oiti just inside the outline", () => {
        const oiti = geoToSlab(OITI);
        const snapped = snapInsideOutline(oiti);

        expect(isInsideOutline(oiti)).toBe(false);
        expect(isInsideOutline(snapped)).toBe(true);
        expect(Math.hypot((snapped.x - oiti.x) * 1480, (snapped.y - oiti.y) * 980)).toBeLessThan(
            80
        );
    });
});

describe("nudgeSlabPoint", () => {
    it("moves a point by map pixels", () => {
        expect(nudgeSlabPoint({ x: 0.5, y: 0.5 }, { right: 148, down: -98 })).toEqual({
            x: 0.6,
            y: 0.4,
        });
    });

    it("returns the same point without a nudge", () => {
        const point = { x: 0.3, y: 0.3 };

        expect(nudgeSlabPoint(point)).toBe(point);
    });
});
