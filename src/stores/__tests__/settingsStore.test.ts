import { useGeneralStore } from "../settingsStore";
import { WarningHazard, WarningLevel } from "@/types";

describe("useGeneralStore", () => {
    beforeEach(() => {
        useGeneralStore.setState({
            hazards: [],
            warningLevels: [],
        });
    });

    describe("Initial State", () => {
        it("should initialize with empty hazards", () => {
            const state = useGeneralStore.getState();
            expect(state.hazards).toEqual([]);
        });

        it("should initialize with empty warning levels", () => {
            const state = useGeneralStore.getState();
            expect(state.warningLevels).toEqual([]);
        });
    });

    describe("setHazards", () => {
        it("should set hazards array", () => {
            const mockHazards: WarningHazard[] = [
                { id: 1, label: "Wind", asset: "wind.png", translations: [] },
                { id: 2, label: "Rain", asset: "rain.png", translations: [] },
            ];

            useGeneralStore.getState().setHazards(mockHazards);

            expect(useGeneralStore.getState().hazards).toEqual(mockHazards);
        });

        it("should replace existing hazards", () => {
            const first: WarningHazard[] = [
                { id: 1, label: "Wind", asset: "wind.png", translations: [] },
            ];
            const second: WarningHazard[] = [
                { id: 2, label: "Rain", asset: "rain.png", translations: [] },
            ];

            useGeneralStore.getState().setHazards(first);
            expect(useGeneralStore.getState().hazards).toEqual(first);

            useGeneralStore.getState().setHazards(second);
            expect(useGeneralStore.getState().hazards).toEqual(second);
        });

        it("should handle empty array", () => {
            useGeneralStore.getState().setHazards([]);
            expect(useGeneralStore.getState().hazards).toEqual([]);
        });

        it("should handle large dataset", () => {
            const largeHazardList = Array.from({ length: 1000 }, (_, i) => ({
                id: i,
                label: `Hazard ${i}`,
                asset: `hazard${i}.png`,
                translations: [],
            }));

            useGeneralStore.getState().setHazards(largeHazardList);
            expect(useGeneralStore.getState().hazards.length).toBe(1000);
        });
    });

    describe("addHazards", () => {
        it("should add single hazard to list", () => {
            const hazard: WarningHazard = {
                id: 1,
                label: "Wind",
                asset: "wind.png",
                translations: [],
            };

            useGeneralStore.getState().addHazards(hazard);

            expect(useGeneralStore.getState().hazards).toContain(hazard);
            expect(useGeneralStore.getState().hazards.length).toBe(1);
        });

        it("should add multiple hazards sequentially", () => {
            const hazard1: WarningHazard = {
                id: 1,
                label: "Wind",
                asset: "wind.png",
                translations: [],
            };
            const hazard2: WarningHazard = {
                id: 2,
                label: "Rain",
                asset: "rain.png",
                translations: [],
            };

            useGeneralStore.getState().addHazards(hazard1);
            useGeneralStore.getState().addHazards(hazard2);

            const state = useGeneralStore.getState();
            expect(state.hazards).toContain(hazard1);
            expect(state.hazards).toContain(hazard2);
            expect(state.hazards.length).toBe(2);
        });

        it("should preserve existing hazards when adding new one", () => {
            const hazard1: WarningHazard = {
                id: 1,
                label: "Wind",
                asset: "wind.png",
                translations: [],
            };
            const hazard2: WarningHazard = {
                id: 2,
                label: "Rain",
                asset: "rain.png",
                translations: [],
            };

            useGeneralStore.getState().addHazards(hazard1);
            const firstState = useGeneralStore.getState().hazards;

            useGeneralStore.getState().addHazards(hazard2);
            const secondState = useGeneralStore.getState().hazards;

            expect(secondState[0]).toEqual(firstState[0]);
        });

        it("should allow duplicate hazards", () => {
            const hazard: WarningHazard = {
                id: 1,
                label: "Wind",
                asset: "wind.png",
                translations: [],
            };

            useGeneralStore.getState().addHazards(hazard);
            useGeneralStore.getState().addHazards(hazard);

            expect(useGeneralStore.getState().hazards.length).toBe(2);
        });
    });

    describe("setWarningsLevels", () => {
        it("should set warning levels array", () => {
            const mockLevels: WarningLevel[] = [
                { id: 1, label: "Green", color: "#00ff00", translations: [] },
                { id: 2, label: "Yellow", color: "#ffff00", translations: [] },
            ];

            useGeneralStore.getState().setWarningsLevels(mockLevels);

            expect(useGeneralStore.getState().warningLevels).toEqual(mockLevels);
        });

        it("should replace existing warning levels", () => {
            const first: WarningLevel[] = [
                { id: 1, label: "Green", color: "#00ff00", translations: [] },
            ];
            const second: WarningLevel[] = [
                { id: 2, label: "Yellow", color: "#ffff00", translations: [] },
            ];

            useGeneralStore.getState().setWarningsLevels(first);
            expect(useGeneralStore.getState().warningLevels).toEqual(first);

            useGeneralStore.getState().setWarningsLevels(second);
            expect(useGeneralStore.getState().warningLevels).toEqual(second);
        });

        it("should handle empty array", () => {
            useGeneralStore.getState().setWarningsLevels([]);
            expect(useGeneralStore.getState().warningLevels).toEqual([]);
        });
    });

    describe("addWarningsLevels", () => {
        it("should add single warning level", () => {
            const level: WarningLevel = {
                id: 1,
                label: "Green",
                color: "#00ff00",
                translations: [],
            };

            useGeneralStore.getState().addWarningsLevels(level);

            expect(useGeneralStore.getState().warningLevels).toContain(level);
            expect(useGeneralStore.getState().warningLevels.length).toBe(1);
        });

        it("should add multiple warning levels sequentially", () => {
            const level1: WarningLevel = {
                id: 1,
                label: "Green",
                color: "#00ff00",
                translations: [],
            };
            const level2: WarningLevel = {
                id: 2,
                label: "Yellow",
                color: "#ffff00",
                translations: [],
            };

            useGeneralStore.getState().addWarningsLevels(level1);
            useGeneralStore.getState().addWarningsLevels(level2);

            const state = useGeneralStore.getState();
            expect(state.warningLevels).toContain(level1);
            expect(state.warningLevels).toContain(level2);
            expect(state.warningLevels.length).toBe(2);
        });

        it("should preserve existing levels when adding new one", () => {
            const level1: WarningLevel = {
                id: 1,
                label: "Green",
                color: "#00ff00",
                translations: [],
            };
            const level2: WarningLevel = {
                id: 2,
                label: "Yellow",
                color: "#ffff00",
                translations: [],
            };

            useGeneralStore.getState().addWarningsLevels(level1);
            const firstCount = useGeneralStore.getState().warningLevels.length;

            useGeneralStore.getState().addWarningsLevels(level2);
            const secondCount = useGeneralStore.getState().warningLevels.length;

            expect(secondCount).toBe(firstCount + 1);
        });
    });

    describe("State Independence", () => {
        it("should maintain hazards and warning levels independently", () => {
            const mockHazard: WarningHazard = {
                id: 1,
                label: "Wind",
                asset: "wind.png",
                translations: [],
            };
            const mockLevel: WarningLevel = {
                id: 1,
                label: "Green",
                color: "#00ff00",
                translations: [],
            };

            useGeneralStore.getState().addHazards(mockHazard);
            useGeneralStore.getState().addWarningsLevels(mockLevel);

            const state = useGeneralStore.getState();
            expect(state.hazards.length).toBe(1);
            expect(state.warningLevels.length).toBe(1);
        });

        it("should not affect hazards when modifying warning levels", () => {
            useGeneralStore.getState().addHazards({
                id: 1,
                label: "Wind",
                asset: "wind.png",
                translations: [],
            });

            useGeneralStore
                .getState()
                .setWarningsLevels([{ id: 1, label: "Green", color: "#00ff00", translations: [] }]);

            expect(useGeneralStore.getState().hazards.length).toBe(1);
        });
    });
});
