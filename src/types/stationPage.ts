export type FetchStationDataPaginated = {
    station_id: number;
    start_date: string;
    end_date: string;
    page?: number;
    limit?: number;
};

