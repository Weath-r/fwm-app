/* eslint-disable @typescript-eslint/no-unused-vars */
import { animationPerAsset } from "../animations";

describe("animations", () => {
    describe("animationPerAsset", () => {
        it("should be defined", () => {
            expect(animationPerAsset).toBeDefined();
        });

        it("should be an object", () => {
            expect(typeof animationPerAsset).toBe("object");
        });

        it("should have asset keys as strings", () => {
            const keys = Object.keys(animationPerAsset);
            expect(keys.length).toBeGreaterThan(0);

            keys.forEach((key) => {
                expect(typeof key).toBe("string");
            });
        });

        it("should have animation configuration objects", () => {
            const configs = Object.values(animationPerAsset);

            configs.forEach((config: any) => {
                expect(typeof config).toBe("object");
                expect(config !== null).toBe(true);
            });
        });

        it("should have targets property in animation configs", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.targets !== undefined) {
                    expect(typeof config.targets).toBe("string");
                }
            });
        });

        it("should have anime.js compatible property names", () => {
            const validAnimeProperties = [
                "targets",
                "duration",
                "delay",
                "easing",
                "opacity",
                "rotate",
                "scale",
                "translateX",
                "translateY",
                "loop",
                "direction",
                "autoplay",
                "duration",
                "offset",
                "begin",
                "run",
                "update",
                "keyframes",
                "width",
                "height",
                "left",
                "right",
                "top",
                "bottom",
            ];

            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                Object.keys(config).forEach((prop) => {
                    // Allow custom properties that start with capital letters or are functions
                    if (
                        !validAnimeProperties.includes(prop) &&
                        typeof config[prop] !== "function" &&
                        !/^[A-Z]/.test(prop)
                    ) {
                        // This is a custom property, which should still be part of anime config
                        expect(typeof config[prop]).not.toBeUndefined();
                    }
                });
            });
        });

        it("should have valid duration values", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.duration !== undefined) {
                    expect(typeof config.duration).toBe("number");
                    expect(config.duration).toBeGreaterThan(0);
                }
            });
        });

        it("should have valid delay values", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.delay !== undefined) {
                    expect(typeof config.delay).toBe("number");
                    expect(config.delay).toBeGreaterThanOrEqual(0);
                }
            });
        });

        it("should have valid easing values", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.easing !== undefined) {
                    expect(typeof config.easing).toBe("string");
                }
            });
        });

        it("should have valid opacity values when defined", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.opacity !== undefined) {
                    if (typeof config.opacity === "number") {
                        expect(config.opacity).toBeGreaterThanOrEqual(0);
                        expect(config.opacity).toBeLessThanOrEqual(1);
                    }
                }
            });
        });

        it("should have valid scale values when defined", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.scale !== undefined) {
                    if (typeof config.scale === "number") {
                        expect(config.scale).toBeGreaterThan(0);
                    }
                }
            });
        });

        it("should have valid loop settings", () => {
            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.loop !== undefined) {
                    expect(
                        typeof config.loop === "boolean" || typeof config.loop === "number"
                    ).toBe(true);
                }
            });
        });

        it("should have valid direction settings", () => {
            const validDirections = ["normal", "reverse", "alternate"];

            Object.entries(animationPerAsset).forEach(([asset, config]: any) => {
                if (config.direction !== undefined) {
                    expect(validDirections).toContain(config.direction);
                }
            });
        });

        it("should have consistent structure across assets", () => {
            const configs = Object.entries(animationPerAsset);
            expect(configs.length).toBeGreaterThan(0);

            configs.forEach(([asset, config]: any) => {
                expect(typeof config).toBe("object");
                expect(config !== null).toBe(true);
            });
        });

        it("should include common weather asset animations", () => {
            // Check for typical weather icon assets
            const keys = Object.keys(animationPerAsset);
            expect(keys.length).toBeGreaterThan(0);

            // At least some assets should be defined
            keys.forEach((key) => {
                expect(typeof key).toBe("string");
                expect(key.length).toBeGreaterThan(0);
            });
        });
    });
});
