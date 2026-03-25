"use client";
import {
    WeatherDataResponse,
    ClimateWeatherData,
    WeatherForecastResponse,
    WeatherHistoricalData,
} from "@/types";
import useRedirectToHomeOnBack from "@/hooks/useRedirectToHomeOnBack";
import { useT } from "@/i18n/client";

import StationPageHeader from "@/components/StationPage/components/StationPageHeader";
import StationPageInformation from "@/components/StationPage/components/StationPageInformation";
import StationPageMainContent from "@/components/StationPage/components/StationPageMainContent";
import LastDayGraph from "@/components/StationPage/LastDayGraph";

import {
    extremeValuesLastNDaysPerVariable,
    calculateRainyDays,
} from "@/helpers/stationPage/getExtremeValues";

type StationPageProps = {
    params: {
        id: string;
        name: string;
    };
    weatherData: WeatherDataResponse[];
    climateData: ClimateWeatherData[];
    currentWeather: WeatherDataResponse;
    forecast: WeatherForecastResponse;
    historicalData: WeatherHistoricalData[];
};

export default function StationPage({
    weatherData,
    climateData,
    currentWeather,
    forecast,
    historicalData,
}: StationPageProps) {
    useRedirectToHomeOnBack();
    const { i18n } = useT("stationModal");
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
        <main className="mt-4 md:container md:mx-auto">
            <StationPageHeader stationCurrentWeather={currentWeather}></StationPageHeader>
            <div className="flex flex-wrap gap-2 mx-2 md:mx-0">
                <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-[calc(33.333%-0.5rem)]">
                    <StationPageInformation
                        i18n={i18n}
                        extremeTemperatureValues={extremeTemperatureValues}
                        extremeWindSpeedValues={extremeWindSpeedValues}
                        rainyDays={rainyDays}
                        stationMetadata={currentWeather.weather_station_id}
                    ></StationPageInformation>
                </div>
                <div className="my-2 rounded-xl bg-white p-4 drop-shadow-md w-full lg:w-[calc(66.666%-0.5rem)]">
                    <LastDayGraph weatherData={weatherData}></LastDayGraph>
                </div>
                <StationPageMainContent
                    i18n={i18n}
                    stationForecast={forecast}
                    stationWeather={weatherData}
                    stationClimate={climateData}
                    historicalData={historicalData}
                    stationName={currentWeather.weather_station_id.name}
                />
            </div>
        </main>
    );
}
