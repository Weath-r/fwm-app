"use client";
import { WeatherDataResponse } from "@/types";
import { properStationName } from "@/helpers/createStationName";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import useRedirectToHomeOnBack from "@/hooks/useRedirectToHomeOnBack";

import StationStandaloneCurrentWeather from "@/components/StationPage/StationStandaloneCurrentWeather";
import LastDayGraph from "@/components/StationPage/LastDayGraph";
import MonthGraph from "@/components/StationPage/MonthGraph";
import { BackButton } from "@/components/StationPage/components/BackButton";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type StationPageProps = {
    params: {
        id: string;
        name: string;
    },
    weatherData: WeatherDataResponse[];
};

export default function StationPage({ params, weatherData }: StationPageProps) {
    useRedirectToHomeOnBack();
    const { name: stationName } = params;
    const currentWeather = weatherData[0];

    return (
        <main className="flex flex-col">
            <div className="mx-4 mt-4 md:container md:mx-auto">
                <div className="flex items-center gap-2">
                    <BackButton>
                        <ChevronLeftIcon className="size-6 text-primary" />
                    </BackButton>
                    <h2 className="mb-4 text-2xl text-primary">
                        {properStationName(stationName)}
                        <small className="block text-sm text-primary opacity-60">
                        Last update {timeFromNowUtil(currentWeather.date_created)}
                        </small>
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                    <div className="my-2 w-full rounded-xl bg-white p-2 drop-shadow-md lg:w-1/3 lg:p-4">
                        <StationStandaloneCurrentWeather currentWeather={[currentWeather]}></StationStandaloneCurrentWeather>
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