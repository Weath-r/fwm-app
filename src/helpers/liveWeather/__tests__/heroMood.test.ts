import { getHeroMood } from "../heroMood";

// Build a *local* Date so getHours() is deterministic regardless of the test
// runner's timezone (passing an ISO string would normalize to UTC).
const at = (hour: number) => new Date(2026, 5, 21, hour, 0, 0);

describe("getHeroMood", () => {
    describe("day / night detection", () => {
        it("treats 07:00–19:59 as day", () => {
            expect(getHeroMood("sunny", at(7)).isNight).toBe(false);
            expect(getHeroMood("sunny", at(12)).isNight).toBe(false);
            expect(getHeroMood("sunny", at(19)).isNight).toBe(false);
        });

        it("treats before 07:00 and 20:00+ as night", () => {
            expect(getHeroMood("sunny", at(6)).isNight).toBe(true);
            expect(getHeroMood("sunny", at(20)).isNight).toBe(true);
            expect(getHeroMood("sunny", at(23)).isNight).toBe(true);
        });
    });

    describe("condition -> mood category", () => {
        it("maps clear/sunny conditions to the warm clear gradient by day", () => {
            expect(getHeroMood("sunny", at(12)).gradient).toContain("255,178,84");
        });

        it("maps clear conditions to the indigo gradient by night", () => {
            const mood = getHeroMood("clear", at(23));
            expect(mood.isNight).toBe(true);
            expect(mood.gradient).toContain("58,46,120");
        });

        it("maps rain-family conditions (incl. t-storms) to the rain gradient", () => {
            expect(getHeroMood("t-storms", at(12)).gradient).toContain("70,110,140");
            expect(getHeroMood("showers", at(12)).gradient).toContain("70,110,140");
        });

        it("maps snow-family conditions to the cold gradient", () => {
            expect(getHeroMood("snow", at(12)).gradient).toContain("214,236,240");
            expect(getHeroMood("sleet", at(12)).gradient).toContain("214,236,240");
        });

        it("falls back to the 'partly' mood for unknown conditions", () => {
            expect(getHeroMood("not_a_real_condition", at(12)).gradient).toContain(
                "159,179,191"
            );
        });
    });

    it("is case-insensitive on the condition key", () => {
        expect(getHeroMood("SUNNY", at(12)).gradient).toBe(getHeroMood("sunny", at(12)).gradient);
    });

    it("always returns a gradient and a backdrop filter", () => {
        const mood = getHeroMood("cloudy", at(10));
        expect(mood.gradient.length).toBeGreaterThan(0);
        expect(mood.backdropFilter.length).toBeGreaterThan(0);
    });
});
