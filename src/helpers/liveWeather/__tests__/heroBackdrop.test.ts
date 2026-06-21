jest.mock("@/helpers/assetsHandling", () => ({
    assetUrl: (asset: string) => `ASSET:${asset}`,
}));

import { resolveBackdrop } from "../heroBackdrop";

describe("resolveBackdrop", () => {
    it("returns 'none' for missing / empty / whitespace values", () => {
        expect(resolveBackdrop()).toEqual({ kind: "none" });
        expect(resolveBackdrop(null)).toEqual({ kind: "none" });
        expect(resolveBackdrop("")).toEqual({ kind: "none" });
        expect(resolveBackdrop("   ")).toEqual({ kind: "none" });
    });

    it("returns 'color' for hex values (trimmed)", () => {
        expect(resolveBackdrop("#ffffff")).toEqual({ kind: "color", value: "#ffffff" });
        expect(resolveBackdrop("  #2B3D49 ")).toEqual({ kind: "color", value: "#2B3D49" });
    });

    it("returns 'image' for asset ids, routed through assetUrl", () => {
        expect(resolveBackdrop("00598e50-7ad3-4397")).toEqual({
            kind: "image",
            value: "ASSET:00598e50-7ad3-4397",
        });
        expect(resolveBackdrop("  some-file.jpg ")).toEqual({
            kind: "image",
            value: "ASSET:some-file.jpg",
        });
    });
});
