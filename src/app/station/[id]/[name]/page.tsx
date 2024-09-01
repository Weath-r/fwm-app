"use client";
import { properStationName } from "@/helpers/createStationName";
import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { WeatherDataResponse } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import useRedirectToHomeOnBack from "@/hooks/useRedirectToHomeOnBack";

import StationStandaloneCurrentWeather from "@/components/StationPage/StationStandaloneCurrentWeather";
import LastDayGraph from "@/components/StationPage/LastDayGraph";
import MonthGraph from "@/components/StationPage/MonthGraph";

type StationPageProps = {
    params: {
        id: string;
        name: string;
    }
};

export default function StationPage({ params }: StationPageProps) {
    useRedirectToHomeOnBack();
    const { id: stationId, name: stationName } = params;
    const dataService = new DataService();
    const [weatherData, setWeatherData] = useState<WeatherDataResponse[]>([]);
    const [currentWeather, setCurrentWeather] = useState<WeatherDataResponse[]>([]);

    const end_date = "$NOW";
    const start_date = "$NOW(-1 month)";

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherDataByStationPaginated({
                station_id: +stationId,
                start_date,
                end_date,
                page: 1,
                limit: -1,
            })
            .then((response) => {
                if (currentWeather.length === 0) {
                    setCurrentWeather([response[0]]);
                }
                return setWeatherData(response);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherData([]);
            });
    };

    useEffect(() => {
        getWeatherData();
    }, []);

    return (
        <main className="flex flex-col">
            <div className="mx-4 mt-4 md:container md:mx-auto">
                <h2 className="mb-4 text-2xl text-primary">
                    {properStationName(stationName)}
                    <small className="block text-sm text-primary opacity-60">
                        Last update {timeFromNowUtil(currentWeather[0]?.date_created)}
                    </small>
                </h2>
                <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                    <div className="my-2 w-full rounded-xl bg-white p-2 drop-shadow-md lg:w-1/3 lg:p-4">
                        <StationStandaloneCurrentWeather currentWeather={currentWeather}></StationStandaloneCurrentWeather>
                    </div>
                    <div className="my-2 w-full rounded-xl bg-white p-2 drop-shadow-md lg:w-2/3 lg:p-4">
                        <LastDayGraph weatherData={weatherData}></LastDayGraph>
                    </div>
                </div>
                <div className="my-2 w-full rounded-xl bg-white p-2 drop-shadow-md lg:p-4">
                    <MonthGraph weatherData={weatherData}></MonthGraph>
                </div>
            </div>
        </main>
    );
}
