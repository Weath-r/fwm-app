import { FuseResult } from "fuse.js";

export type StationSearchItem = {
    id: number;
    temperature: number;
    windSpeed: number;
    windDirection: number;
    weatherConditionIcon: string;
    name_el: string;
    name_en: string;
    prefecture_el: string;
    prefecture_en: string;
};

export type SearchableStation = StationSearchItem & { name_el_latin: string };

export type StationSearchResult = FuseResult<SearchableStation>;
