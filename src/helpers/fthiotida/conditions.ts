export type WeatherObjectType =
    | "sun"
    | "sunWithWisp"
    | "sunBehindCloud"
    | "cloudy"
    | "fog"
    | "lightRain"
    | "showers"
    | "rain"
    | "thunderstorm"
    | "lightSnow"
    | "heavySnow"
    | "ice"
    | "heatwave"
    | "wind"
    | "dust";

export type GroundEffect =
    | "sunlight"
    | "cloudShadow"
    | "wet"
    | "snowGlow"
    | "frost"
    | "heat"
    | "dust";

export type ConditionAppearance = {
    object: WeatherObjectType;
    groundEffect: GroundEffect;
};

const CONDITION_APPEARANCES = new Map<string, ConditionAppearance>([
    ["sunny", { object: "sun", groundEffect: "sunlight" }],
    ["intermittent_clouds", { object: "sunWithWisp", groundEffect: "sunlight" }],
    ["mostly_cloudy", { object: "sunBehindCloud", groundEffect: "sunlight" }],
    ["cloudy", { object: "cloudy", groundEffect: "cloudShadow" }],
    ["fog", { object: "fog", groundEffect: "snowGlow" }],
    ["showers", { object: "lightRain", groundEffect: "wet" }],
    ["mostly_cloudy_w_showers", { object: "showers", groundEffect: "wet" }],
    ["rain", { object: "rain", groundEffect: "wet" }],
    ["t-storms", { object: "thunderstorm", groundEffect: "wet" }],
    ["flurries", { object: "lightSnow", groundEffect: "snowGlow" }],
    ["snow", { object: "heavySnow", groundEffect: "snowGlow" }],
    ["ice", { object: "ice", groundEffect: "frost" }],
    ["hot", { object: "heatwave", groundEffect: "heat" }],
    ["windy", { object: "wind", groundEffect: "cloudShadow" }],
    ["dust", { object: "dust", groundEffect: "dust" }],
]);

export const resolveCondition = (value?: string): ConditionAppearance | null =>
    (value && CONDITION_APPEARANCES.get(value)) || null;
