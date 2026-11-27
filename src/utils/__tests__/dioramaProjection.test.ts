import { createCamera, projectToScreen, slabTransform } from "../dioramaProjection";

describe("dioramaProjection", () => {
    const resting = createCamera(820);

    it("derives the slab height and perspective from the width", () => {
        expect(resting.height).toBeCloseTo(543, 0);
        expect(resting.perspective).toBeCloseTo(2600, 5);
    });

    it("leaves the slab centre in place", () => {
        expect(projectToScreen({ x: 0.5, y: 0.5 }, resting)).toEqual({
            left: 410,
            top: resting.height / 2,
            scale: 1,
        });
    });

    it("shrinks and lifts points at the back of the tilted slab", () => {
        const back = projectToScreen({ x: 0.5, y: 0 }, resting);

        expect(back.scale).toBeCloseTo(0.9476, 3);
        expect(back.top).toBeCloseTo(53.3, 0);
    });

    it("enlarges points at the front", () => {
        expect(projectToScreen({ x: 0.5, y: 1 }, resting).scale).toBeGreaterThan(1);
    });

    it("brings a focused point to the centre", () => {
        const focus = { x: 0.3, y: 0.7 };
        const point = projectToScreen(focus, createCamera(820, focus));

        expect(point.left).toBeCloseTo(410, 5);
        expect(point.top).toBeCloseTo(createCamera(820).height / 2, 5);
    });

    it("builds the matching CSS transform", () => {
        expect(slabTransform(resting)).toBe("rotateX(32deg) scale(1) translate(0px, 0px)");
        expect(slabTransform(createCamera(820, { x: 0.5, y: 0.5 }))).toBe(
            "rotateX(40deg) scale(1.55) translate(0px, 0px)"
        );
    });
});
