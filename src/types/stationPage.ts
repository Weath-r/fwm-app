export type FetchStationDataPaginated = {
    station_id: number;
    start_date: string;
    end_date: string;
    page?: number;
    limit?: number;
};

enum StationPageQueryParameters {
    IS_FORECAST_ENABLED = "isForecastEnabled",
}

export type StationParamsUrlProp = {
    [K in StationPageQueryParameters]: string;
};

