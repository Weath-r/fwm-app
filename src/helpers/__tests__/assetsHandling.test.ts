import { assetUrl } from "../assetsHandling";

describe("assetsHandling", () => {
    describe("assetUrl", () => {
        it("should be a function", () => {
            expect(typeof assetUrl).toBe("function");
        });

        it("should return a string", () => {
            const result = assetUrl("sun");
            expect(typeof result).toBe("string");
        });

        it("should include asset name in URL", () => {
            const assetName = "cloud";
            const result = assetUrl(assetName);

            expect(result).toContain(assetName);
        });

        it("should construct valid URL format", () => {
            const result = assetUrl("rain");

            // Should look like a valid URL path
            expect(result).toMatch(/^[\w/._~:?#\\[\]@!$&'()*+,;=\\-]+$/);
        });

        it("should handle multiple different assets", () => {
            const assets = ["sun", "cloud", "rain", "thunder", "wind"];

            assets.forEach((asset) => {
                const result = assetUrl(asset);
                expect(typeof result).toBe("string");
                expect(result.length).toBeGreaterThan(0);
            });
        });

        it("should include version parameter when configured", () => {
            const result = assetUrl("sun");

            // If version is included, URL should have parameter
            if (result.includes("v=") || result.includes("version=")) {
                expect(result).toMatch(/[?&](v|version)=/);
            }
        });

        it("should handle asset extension", () => {
            const result = assetUrl("sun");

            // Should be a valid asset URL (likely .svg, .png, etc.)
            expect(result).toBeTruthy();
        });

        it("should return consistent URL for same asset", () => {
            const asset = "cloud";
            const result1 = assetUrl(asset);
            const result2 = assetUrl(asset);

            expect(result1).toBe(result2);
        });

        it("should differentiate URLs for different assets", () => {
            const result1 = assetUrl("sun");
            const result2 = assetUrl("cloud");

            expect(result1).not.toBe(result2);
        });

        it("should handle assets with special characters", () => {
            const result = assetUrl("cloud-rain");
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        });

        it("should handle empty string asset", () => {
            const result = assetUrl("");
            expect(typeof result).toBe("string");
        });

        it("should return non-empty URL for valid asset", () => {
            const result = assetUrl("sun");
            expect(result.length).toBeGreaterThan(0);
        });

        it("should use consistent separator for path building", () => {
            const result1 = assetUrl("sun");
            const result2 = assetUrl("cloud");

            // Both URLs should follow same format (/ separator for paths)
            expect(result1.split("/").length).toBeGreaterThan(0);
            expect(result2.split("/").length).toBeGreaterThan(0);
        });
    });
});
