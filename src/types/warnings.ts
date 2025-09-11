type WarningLocation = {
    label: string;
    value: string;
    geojson: string;
    order: number;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

export type WarningLevel = {
    id: number;
    label: string;
    color: string;
    value?: string;
    foreign_id?: number;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

export type WarningHazard = {
    id: number;
    label: string;
    asset: string;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

export type WeatherWarnings = {
    id: number;
    date_created: Date;
    meteoalarm_warning_id: string;
    start_date: Date;
    end_date: Date;
    description_en: string;
    description_el: string;
    instruction_en: string;
    instruction_el: string;
    warning_location_id: WarningLocation;
    level_id: WarningLevel;
    hazard_id: WarningHazard;
    [key: string]: any;
};

export type GroupedWarnings = {
    assetName: string;
    location: string;
    warnings: WeatherWarnings[];
    geojson: string;
    warningLevel: WarningLevel;
    order: number;
};

export type WarningsWithPages = {
    warnings: WeatherWarnings[];
    totalPages: number;
};