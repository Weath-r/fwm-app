import { geoToSlab, isInsideOutline, nudgeSlabPoint, snapInsideOutline } from "@/utils/geoToSlab";
import { FTHIOTIDA_AREAS, snowCapOpacity, type FthiotidaAreaDefinition } from "../areas";

const STORED_KEYS = [
    "Lamia",
    "Orthris",
    "East",
    "North",
    "West",
    "Kamena",
    "Oiti",
    "Amfikleia",
    "Lokrida",
    "Oreoi",
    "Maliakos",
    "Evvoikos",
    "Domokos",
    "Makrakomi",
    "Parnasos",
];

describe("FTHIOTIDA_AREAS", () => {
    it("defines every key stored in Directus", () => {
        expect(Object.keys(FTHIOTIDA_AREAS).sort()).toEqual([...STORED_KEYS].sort());
    });

    it("has 9 forecast areas and 6 wind zones", () => {
        const roles = Object.values(FTHIOTIDA_AREAS).map((area) => area.role);

        expect(roles.filter((role) => role === "area")).toHaveLength(9);
        expect(roles.filter((role) => role === "wind")).toHaveLength(6);
    });
});

describe("snowCapOpacity", () => {
    it("fades the cap by how far the snow line sits below the peak", () => {
        expect(snowCapOpacity(2152, 1600)).toBeCloseTo(0.613, 3);
    });

    it("clamps between 0 and 1", () => {
        expect(snowCapOpacity(2152, 500)).toBe(1);
        expect(snowCapOpacity(2152, 2500)).toBe(0);
    });

    it("hides the cap without a snow level", () => {
        expect(snowCapOpacity(2152, 0)).toBe(0);
        expect(snowCapOpacity(2152, undefined)).toBe(0);
    });
});

describe("marker nudges", () => {
    it.each([
        ["Lamia", [22.434891, 38.903708]],
        ["North", [22.304424, 39.110429]],
        ["Orthris", [22.65207398785285, 39.02072440278998]],
        ["East", [22.806330019742713, 38.91246814511139]],
        ["West", [22.051932754998965, 38.97335229502]],
        ["Kamena", [22.775458, 38.759799]],
        ["Oiti", [22.311391, 38.783776]],
        ["Amfikleia", [22.670016, 38.657546]],
        ["Lokrida", [23.034462, 38.650973]],
    ] as const)("keeps %s on land after the nudge", (key, location) => {
        const anchor = snapInsideOutline(
            nudgeSlabPoint(geoToSlab([...location]), FTHIOTIDA_AREAS[key].markerNudge)
        );

        expect(isInsideOutline(anchor)).toBe(true);
    });
});

describe("wind zones", () => {
    it("assigns every area a wind zone that exists", () => {
        Object.values(FTHIOTIDA_AREAS)
            .filter((definition) => definition.role === "area")
            .forEach((definition) => {
                const zone = (definition as FthiotidaAreaDefinition).windZone;

                expect(zone && FTHIOTIDA_AREAS[zone].role).toBe("wind");
            });
    });
});
