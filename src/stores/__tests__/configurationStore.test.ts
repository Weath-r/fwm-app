import { useConfigurationStore } from "../configurationStore";
import { FeatureFlags, MenuLink } from "@/types";

describe("useConfigurationStore", () => {
    const initialMenu: MenuLink[] = [
        { pathName: "", text: "Weather Map", value: "map" },
        { pathName: "stations", text: "Stations", value: "stationslist" },
        { pathName: "warnings", text: "Warnings", value: "warnings" },
        { pathName: "fthiotida-forecast", text: "Fthiotida Forecast", value: "fthiotidaforecast" },
        { pathName: "about-us", text: "About Us", value: "aboutus" },
    ];

    beforeEach(() => {
        useConfigurationStore.setState({
            featureFlags: {},
            menu: initialMenu,
        });
    });

    describe("Initial State", () => {
        it("should initialize with empty feature flags", () => {
            const state = useConfigurationStore.getState();
            expect(state.featureFlags).toEqual({});
        });

        it("should initialize with default menu", () => {
            const state = useConfigurationStore.getState();
            expect(state.menu).toEqual(initialMenu);
            expect(state.menu.length).toBe(5);
        });

        it("should have all menu items in initial state", () => {
            const state = useConfigurationStore.getState();
            const values = state.menu.map((item) => item.value);

            expect(values).toContain("map");
            expect(values).toContain("stationslist");
            expect(values).toContain("warnings");
            expect(values).toContain("fthiotidaforecast");
            expect(values).toContain("aboutus");
        });
    });

    describe("setFeatureFlags", () => {
        it("should set feature flags", () => {
            const flags: FeatureFlags = {
                warnings: { showWarningsMenuItem: true },
                analytics: { enabled: true },
            };

            useConfigurationStore.getState().setFeatureFlags(flags);

            expect(useConfigurationStore.getState().featureFlags).toEqual(flags);
        });

        it("should replace existing feature flags", () => {
            const first: FeatureFlags = { warnings: { showWarningsMenuItem: true } };
            const second: FeatureFlags = { analytics: { enabled: false } };

            useConfigurationStore.getState().setFeatureFlags(first);
            expect(useConfigurationStore.getState().featureFlags).toEqual(first);

            useConfigurationStore.getState().setFeatureFlags(second);
            expect(useConfigurationStore.getState().featureFlags).toEqual(second);
        });

        it("should handle empty feature flags", () => {
            useConfigurationStore.getState().setFeatureFlags({});
            expect(useConfigurationStore.getState().featureFlags).toEqual({});
        });

        it("should handle nested feature flags", () => {
            const flags: FeatureFlags = {
                feature1: { nested: { deep: { value: true } } },
                feature2: { array: [1, 2, 3] },
            } as any;

            useConfigurationStore.getState().setFeatureFlags(flags);
            expect(useConfigurationStore.getState().featureFlags).toEqual(flags);
        });
    });

    describe("addFeatureFlags", () => {
        it("should merge new feature flags with existing ones", () => {
            const first: FeatureFlags = { warnings: { showWarningsMenuItem: true } };
            const second: FeatureFlags = { analytics: { enabled: true } };

            useConfigurationStore.getState().addFeatureFlags(first);
            useConfigurationStore.getState().addFeatureFlags(second);

            const state = useConfigurationStore.getState();
            expect(state.featureFlags.warnings).toBeDefined();
            expect(state.featureFlags.analytics).toBeDefined();
        });

        it("should override existing flags with same key", () => {
            const first: FeatureFlags = { warnings: { showWarningsMenuItem: true } };
            const second: FeatureFlags = { warnings: { showWarningsMenuItem: false } };

            useConfigurationStore.getState().addFeatureFlags(first);
            expect(useConfigurationStore.getState().featureFlags.warnings).toEqual({
                showWarningsMenuItem: true,
            });

            useConfigurationStore.getState().addFeatureFlags(second);
            expect(useConfigurationStore.getState().featureFlags.warnings).toEqual({
                showWarningsMenuItem: false,
            });
        });

        it("should preserve previously added flags", () => {
            const first: FeatureFlags = { feature1: { enabled: true } };
            const second: FeatureFlags = { feature2: { enabled: false } };

            useConfigurationStore.getState().addFeatureFlags(first);
            const firstState = { ...useConfigurationStore.getState().featureFlags };

            useConfigurationStore.getState().addFeatureFlags(second);
            const secondState = useConfigurationStore.getState().featureFlags;

            expect(secondState.feature1).toEqual(firstState.feature1);
        });

        it("should handle empty feature flags", () => {
            useConfigurationStore.getState().addFeatureFlags({});
            expect(useConfigurationStore.getState().featureFlags).toEqual({});
        });
    });

    describe("setMenu", () => {
        it("should set menu items", () => {
            const customMenu: MenuLink[] = [
                { pathName: "home", text: "Home", value: "home" },
                { pathName: "about", text: "About", value: "about" },
            ];

            useConfigurationStore.getState().setMenu(customMenu);

            expect(useConfigurationStore.getState().menu).toEqual(customMenu);
        });

        it("should replace menu completely", () => {
            const customMenu: MenuLink[] = [
                { pathName: "custom", text: "Custom", value: "custom" },
            ];

            useConfigurationStore.getState().setMenu(customMenu);

            const state = useConfigurationStore.getState();
            expect(state.menu.length).toBe(1);
            expect(state.menu[0].value).toBe("custom");
        });

        it("should handle empty menu", () => {
            useConfigurationStore.getState().setMenu([]);
            expect(useConfigurationStore.getState().menu).toEqual([]);
        });

        it("should allow menu with duplicate values", () => {
            const customMenu: MenuLink[] = [
                { pathName: "home", text: "Home", value: "duplicate" },
                { pathName: "home-2", text: "Home 2", value: "duplicate" },
            ];

            useConfigurationStore.getState().setMenu(customMenu);

            expect(useConfigurationStore.getState().menu.length).toBe(2);
        });

        it("should maintain menu order", () => {
            const customMenu: MenuLink[] = [
                { pathName: "z", text: "Z", value: "z" },
                { pathName: "a", text: "A", value: "a" },
                { pathName: "m", text: "M", value: "m" },
            ];

            useConfigurationStore.getState().setMenu(customMenu);

            const menu = useConfigurationStore.getState().menu;
            expect(menu[0].value).toBe("z");
            expect(menu[1].value).toBe("a");
            expect(menu[2].value).toBe("m");
        });
    });

    describe("State Independence", () => {
        it("should maintain featureFlags and menu independently", () => {
            const flags: FeatureFlags = { test: { enabled: true } };
            const menu: MenuLink[] = [{ pathName: "test", text: "Test", value: "test" }];

            useConfigurationStore.getState().setFeatureFlags(flags);
            useConfigurationStore.getState().setMenu(menu);

            const state = useConfigurationStore.getState();
            expect(Object.keys(state.featureFlags).length).toBe(1);
            expect(state.menu.length).toBe(1);
        });

        it("should not affect menu when modifying feature flags", () => {
            const originalMenu = [...useConfigurationStore.getState().menu];

            useConfigurationStore.getState().setFeatureFlags({ test: { enabled: true } });

            expect(useConfigurationStore.getState().menu).toEqual(originalMenu);
        });

        it("should not affect feature flags when modifying menu", () => {
            useConfigurationStore.getState().setFeatureFlags({ test: { enabled: true } });

            useConfigurationStore
                .getState()
                .setMenu([{ pathName: "new", text: "New", value: "new" }]);

            expect(useConfigurationStore.getState().featureFlags).toEqual({
                test: { enabled: true },
            });
        });
    });

    describe("Complex Scenarios", () => {
        it("should handle multiple sequential updates", () => {
            useConfigurationStore.getState().setFeatureFlags({ f1: { v: 1 } });
            useConfigurationStore.getState().addFeatureFlags({ f2: { v: 2 } });
            useConfigurationStore.getState().addFeatureFlags({ f3: { v: 3 } });

            const state = useConfigurationStore.getState();
            expect(Object.keys(state.featureFlags).length).toBe(3);
        });

        it("should preserve menu while setting flags multiple times", () => {
            const customMenu: MenuLink[] = [
                { pathName: "custom", text: "Custom", value: "custom" },
            ];
            useConfigurationStore.getState().setMenu(customMenu);

            useConfigurationStore.getState().setFeatureFlags({ f1: { v: 1 } });
            useConfigurationStore.getState().setFeatureFlags({ f2: { v: 2 } });
            useConfigurationStore.getState().setFeatureFlags({ f3: { v: 3 } });

            expect(useConfigurationStore.getState().menu).toEqual(customMenu);
        });

        it("should handle resetting to initial state", () => {
            useConfigurationStore.getState().setFeatureFlags({ test: { enabled: true } });
            useConfigurationStore
                .getState()
                .setMenu([{ pathName: "test", text: "Test", value: "test" }]);

            useConfigurationStore.getState().setFeatureFlags({});
            useConfigurationStore.getState().setMenu(initialMenu);

            const state = useConfigurationStore.getState();
            expect(state.featureFlags).toEqual({});
            expect(state.menu).toEqual(initialMenu);
        });
    });
});
