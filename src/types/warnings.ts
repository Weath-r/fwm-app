type WarningLocation = {
    label: string;
    value: string;
};

type WarningLevel = {
    id: number;
    label: string;
    color: string;
};

type WarningHazard = {
    label: string;
    asset: string;
};

export type WeatherWarnings = {
    id: number;
    date_created: Date;
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
