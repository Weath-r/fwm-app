type WarningLocation = {
    label: string;
    value: string;
    geojson?: string;
    order?: number;
};

export type WarningLevel = {
    id: number;
    label: string;
    color: string;
    value?: string;
    foreign_id?: number;
};

export type WarningHazard = {
    id: number;
    label: string;
    asset: string;
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