import { ForecastData, GraphVariablesSuffixes } from "@/types";

export type FetchStationDataPaginated = {
    station_id: number;
    start_date: string;
    end_date: string;
    page?: number;
    limit?: number;
};

export type StationPageCombinedGraph = {
    name: string;
    type: "area" | "spline" | "column";
    data: {
        x: number;
        y: number;
    }[];
    yAxis?: number;
    zones?: any;
    tooltip: {
        valueSuffix: GraphVariablesSuffixes;
    };
};

export type StationPageForecastData = {
    forecast: ForecastData[];
    station: string;
};
