type ClimaMonthTranslation = {
    languages_code: string;
    name: string;
};

type ClimaMonth = {
    value: string;
    translations: ClimaMonthTranslation[];
};

export type ClimateWeatherData = {
    month_id: ClimaMonth;
    max_temperature: number;
    min_temperature: number;
    mean_temperature: number;
    precipitation: number;
};
