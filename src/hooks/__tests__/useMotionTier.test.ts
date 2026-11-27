import { detectMotionTier, type MotionEnvironment } from "../useMotionTier";

const capable: MotionEnvironment = {
    reducedMotion: false,
    reducedData: false,
    saveData: false,
    deviceMemory: 8,
    hardwareConcurrency: 8,
};

describe("detectMotionTier", () => {
    it("is full on capable devices", () => {
        expect(detectMotionTier(capable)).toBe("full");
    });

    it("is full when the browser exposes no device hints", () => {
        expect(
            detectMotionTier({
                ...capable,
                deviceMemory: undefined,
                hardwareConcurrency: undefined,
            })
        ).toBe("full");
    });

    it.each([
        ["low memory", { deviceMemory: 4 }],
        ["few cores", { hardwareConcurrency: 4 }],
        ["save data", { saveData: true }],
        ["reduced data", { reducedData: true }],
    ])("is lite with %s", (_label, override) => {
        expect(detectMotionTier({ ...capable, ...override })).toBe("lite");
    });

    it("is still with reduced motion, whatever the device", () => {
        expect(detectMotionTier({ ...capable, reducedMotion: true, deviceMemory: 2 })).toBe(
            "still"
        );
    });
});
