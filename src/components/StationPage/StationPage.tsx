"use client";
import { WeatherDataResponse, ClimateWeatherData } from "@/types";
import useRedirectToHomeOnBack from "@/hooks/useRedirectToHomeOnBack";
import { useT } from "@/i18n/client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import LastDayGraph from "@/components/StationPage/LastDayGraph";
import MonthGraph from "@/components/StationPage/MonthGraph";
import { BackButton } from "@/components/StationPage/components/BackButton";
import StationPageHeader from "@/components/StationPage/components/StationPageHeader";
import StationPageClimateSummary from "@/components/StationPage/components/StationPageClimateSummary";
import StationPageInformation from "@/components/StationPage/components/StationPageInformation";

import { extremeValuesLastNDaysPerVariable, calculateRainyDays } from "@/helpers/stationPage/getExtremeValues";

type StationPageProps = {
    params: {
        id: string;
        name: string;
    },
    weatherData: WeatherDataResponse[];
    climateData: ClimateWeatherData[];
    currentWeather: WeatherDataResponse;
};

export default function StationPage({ weatherData, climateData, currentWeather }: StationPageProps) {
    useRedirectToHomeOnBack();
    const { i18n } = useT("stationModal");
    const { i18n: i18n_icons } = useT("weather_icons");
    const lang = i18n.language;
    const DAYS_FOR_EXTREME_CALCULATION = 7;

    const extremeTemperatureValues = extremeValuesLastNDaysPerVariable({
        weatherData,
        numberOfDays: DAYS_FOR_EXTREME_CALCULATION,
        variable: "temperature",
    });

    const { rainyDays } = calculateRainyDays({
        weatherData,
        numberOfDays: DAYS_FOR_EXTREME_CALCULATION,
    });

    const extremeWindSpeedValues = extremeValuesLastNDaysPerVariable({
        weatherData,
        numberOfDays: DAYS_FOR_EXTREME_CALCULATION,
        variable: "windspd",
    });

    return (
        <main className="mx-4 mt-4 md:container md:mx-auto">
            <div className="mb-4">
                <BackButton>
                    <p className="text-primary flex items-center gap-1">
                        <ChevronLeftIcon className="size-6 text-primary" />
                        {i18n.getFixedT(lang, "station")("backToCTA")}
                    </p>
                </BackButton>
                    
            </div>
            <StationPageHeader
                stationCurrentWeather={currentWeather}
                i18n={i18n}
                i18n_icons={i18n_icons}
            ></StationPageHeader>
            <div className="flex flex-wrap gap-2">
                <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-[calc(33.333%-0.5rem)]">
                    <StationPageInformation
                        i18n={i18n}
                        extremeTemperatureValues={extremeTemperatureValues}
                        extremeWindSpeedValues={extremeWindSpeedValues}
                        rainyDays={rainyDays}
                        stationMetadata={currentWeather.weather_station_id}
                    ></StationPageInformation>
                </div>
                <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-[calc(66.666%-0.5rem)]">
                    <LastDayGraph weatherData={weatherData}></LastDayGraph>
                </div>
                <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md">
                    <StationPageClimateSummary
                        climateData={climateData}
                        weatherStation={currentWeather.weather_station_id.name}
                    ></StationPageClimateSummary>
                </div>
                <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md">
                    <MonthGraph weatherData={weatherData}></MonthGraph>
                </div>
            </div>
        </main>
    );
}