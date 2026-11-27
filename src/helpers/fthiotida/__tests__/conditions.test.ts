import { resolveCondition } from "../conditions";

describe("resolveCondition", () => {
    it.each([
        ["sunny", "sun", "sunlight"],
        ["intermittent_clouds", "sunWithWisp", "sunlight"],
        ["mostly_cloudy", "sunBehindCloud", "sunlight"],
        ["cloudy", "cloudy", "cloudShadow"],
        ["fog", "fog", "snowGlow"],
        ["showers", "lightRain", "wet"],
        ["mostly_cloudy_w_showers", "showers", "wet"],
        ["rain", "rain", "wet"],
        ["t-storms", "thunderstorm", "wet"],
        ["flurries", "lightSnow", "snowGlow"],
        ["snow", "heavySnow", "snowGlow"],
        ["ice", "ice", "frost"],
        ["hot", "heatwave", "heat"],
        ["windy", "wind", "cloudShadow"],
        ["dust", "dust", "dust"],
    ])("maps the stored value %s", (value, object, groundEffect) => {
        expect(resolveCondition(value)).toEqual({ object, groundEffect });
    });

    it("returns null for unknown or missing values", () => {
        expect(resolveCondition("clear_night")).toBeNull();
        expect(resolveCondition("constructor")).toBeNull();
        expect(resolveCondition(undefined)).toBeNull();
    });
});
