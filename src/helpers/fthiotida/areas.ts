export type FthiotidaAreaRole = "area" | "wind";

export type SnowCap = {
    id: "oiti" | "parnassos" | "orthris" | "westernRanges";
    peakMeters: number;
    location: [number, number];
};

export type MarkerNudge = {
    right: number;
    down: number;
};

export type FthiotidaWindZone =
    | "Maliakos"
    | "Evvoikos"
    | "Oreoi"
    | "Domokos"
    | "Makrakomi"
    | "Parnasos";

export type FthiotidaAreaDefinition = {
    role: FthiotidaAreaRole;
    translationKey: string;
    snowCap?: SnowCap;
    markerNudge?: MarkerNudge;
    windZone?: FthiotidaWindZone;
    location?: [number, number];
};

export const FTHIOTIDA_AREAS = {
    Lamia: {
        role: "area",
        translationKey: "lamia",
        location: [22.434891, 38.903708],
        windZone: "Maliakos",
        markerNudge: { right: 60, down: 120 },
    },
    North: {
        role: "area",
        translationKey: "north_fthiotida",
        location: [22.304424, 39.110429],
        windZone: "Domokos",
        markerNudge: { right: -4, down: -46 },
    },
    Orthris: {
        role: "area",
        translationKey: "mt_orthris",
        location: [22.65207398785285, 39.02072440278998],
        windZone: "Domokos",
        snowCap: { id: "orthris", peakMeters: 1726, location: [22.62, 39.03] },
        markerNudge: { right: -60, down: 0 },
    },
    East: {
        role: "area",
        translationKey: "east_fthiotida",
        location: [22.806330019742713, 38.91246814511139],
        windZone: "Oreoi",
        markerNudge: { right: 50, down: 120 },
    },
    West: {
        role: "area",
        translationKey: "west_fthiotida",
        location: [22.051932754998965, 38.97335229502],
        windZone: "Makrakomi",
        snowCap: { id: "westernRanges", peakMeters: 2300, location: [21.97, 38.95] },
        markerNudge: { right: -24, down: 113 },
    },
    Kamena: {
        role: "area",
        translationKey: "kamena_vourla",
        location: [22.775458, 38.759799],
        windZone: "Maliakos",
        markerNudge: { right: 40, down: 60 },
    },
    Oiti: {
        role: "area",
        translationKey: "mt_oiti",
        location: [22.311391, 38.783776],
        windZone: "Makrakomi",
        snowCap: { id: "oiti", peakMeters: 2152, location: [22.28, 38.8] },
        markerNudge: { right: -10, down: 90 },
    },
    Amfikleia: {
        role: "area",
        translationKey: "amfiklia",
        location: [22.670016, 38.657546],
        windZone: "Parnasos",
        snowCap: { id: "parnassos", peakMeters: 2457, location: [22.6, 38.6] },
        markerNudge: { right: -120, down: 200 },
    },
    Lokrida: {
        role: "area",
        translationKey: "lokrida",
        location: [23.034462, 38.650973],
        windZone: "Evvoikos",
        markerNudge: { right: 190, down: 150 },
    },
    Maliakos: { role: "wind", translationKey: "maliakos_gulf" },
    Evvoikos: { role: "wind", translationKey: "evvoikos_gulf" },
    Oreoi: { role: "wind", translationKey: "oreoi" },
    Domokos: { role: "wind", translationKey: "n_fthiotida" },
    Makrakomi: { role: "wind", translationKey: "w_fthiotida" },
    Parnasos: { role: "wind", translationKey: "mt_Parnassos" },
} as const satisfies Record<string, FthiotidaAreaDefinition>;

export type FthiotidaAreaKey = keyof typeof FTHIOTIDA_AREAS;

export const FTHIOTIDA_TOWNS: [number, number][] = [
    [22.434, 38.9],
    [22.613, 38.912],
    [22.298, 39.127],
    [22.999, 38.651],
    [22.786, 38.778],
    [22.858, 38.757],
    [22.6, 38.65],
    [22.117, 38.946],
    [22.643, 38.808],
];

export const isFthiotidaAreaKey = (key: string): key is FthiotidaAreaKey =>
    Object.prototype.hasOwnProperty.call(FTHIOTIDA_AREAS, key);

const SNOW_CAP_FADE_METERS = 900;

export const snowCapOpacity = (peakMeters: number, snowLevelMeters?: number): number => {
    if (!snowLevelMeters || snowLevelMeters <= 0) {
        return 0;
    }
    return Math.min(1, Math.max(0, (peakMeters - snowLevelMeters) / SNOW_CAP_FADE_METERS));
};
