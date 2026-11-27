import {
    BILLBOARD_OFFSETS,
    WIND_PILL_OFFSETS,
    placeBoxes,
    type PlacementRequest,
    type ScreenBox,
} from "../screenPlacement";

const bounds: ScreenBox = { left: 0, top: 0, right: 800, bottom: 600 };
const request = (centreX: number, centreY: number, width = 70, height = 24): PlacementRequest => ({
    centreX,
    centreY,
    scale: 1,
    width,
    height,
});
const intersects = (first: ScreenBox, second: ScreenBox) =>
    first.left < second.right &&
    first.right > second.left &&
    first.top < second.bottom &&
    first.bottom > second.top;

describe("placeBoxes", () => {
    it("keeps a pill just below its wind zone when that spot is free", () => {
        const [placement] = placeBoxes([request(400, 300)], [], bounds, WIND_PILL_OFFSETS);

        expect([placement.centreX, placement.centreY]).toEqual([400, 322]);
    });

    it("leaves a billboard on its anchor when nothing is in the way", () => {
        const [placement] = placeBoxes(
            [request(400, 300, 110, 124)],
            [],
            bounds,
            BILLBOARD_OFFSETS
        );

        expect([placement.centreX, placement.centreY]).toEqual([400, 300]);
    });

    it("moves a box off an obstacle that covers the preferred spot", () => {
        const obstacle: ScreenBox = { left: 340, top: 200, right: 460, bottom: 340 };
        const [placement] = placeBoxes([request(400, 300)], [obstacle], bounds, WIND_PILL_OFFSETS);

        expect(intersects(placement.box, obstacle)).toBe(false);
    });

    it("nudges a later billboard off one placed before it", () => {
        const [front, back] = placeBoxes(
            [request(400, 300, 110, 124), request(430, 290, 110, 124)],
            [],
            bounds,
            BILLBOARD_OFFSETS
        );

        expect([front.centreX, front.centreY]).toEqual([400, 300]);
        expect(back.centreX === 430 && back.centreY === 290).toBe(false);
    });

    it("keeps boxes from overlapping each other", () => {
        const [first, second] = placeBoxes(
            [request(400, 300), request(400, 300)],
            [],
            bounds,
            WIND_PILL_OFFSETS
        );

        expect(intersects(first.box, second.box)).toBe(false);
    });

    it("keeps boxes inside the stage", () => {
        const [placement] = placeBoxes([request(790, 590)], [], bounds, WIND_PILL_OFFSETS);

        expect(placement.box.right).toBeLessThanOrEqual(bounds.right);
        expect(placement.box.bottom).toBeLessThanOrEqual(bounds.bottom);
    });

    it("falls back to the least overlapping spot when every spot is blocked", () => {
        const wall: ScreenBox = { left: 0, top: 0, right: 800, bottom: 600 };

        expect(placeBoxes([request(400, 300)], [wall], bounds, WIND_PILL_OFFSETS)).toHaveLength(1);
    });
});
