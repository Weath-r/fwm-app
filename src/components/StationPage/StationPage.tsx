"use client";
import {
    WeatherData,
    WeatherDataResponse,
    ClimateWeatherData,
    WeatherForecastResponse,
    WeatherHistoricalData,
    FrostData,
} from "@/types";
import { useRouter } from "next/navigation";
import useRedirectToHomeOnBack from "@/hooks/useRedirectToHomeOnBack";
import { useT } from "@/i18n/client";
import { buildWeatherData } from "@/utils/weatherDataFormatUtils";

import { StationModalHeading } from "@/components/LiveWeatherConditions/components/StationModalHeading";
import { StationModalBody } from "@/components/LiveWeatherConditions/components/StationModalBody";
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
    frostData: FrostData | null;
};

export default function StationPage({
    weatherData,
    climateData,
    currentWeather,
    forecast,
    historicalData,
    frostData,
}: StationPageProps) {
    useRedirectToHomeOnBack();
    const router = useRouter();
    const { i18n } = useT("stationModal");
    const DAYS_FOR_EXTREME_CALCULATION = 7;

    const currentWeatherData: WeatherData = {
        ...buildWeatherData(currentWeather),
        full_forecast: forecast?.full_forecast ?? [],
        frost_data: frostData,
    };

    const extremeTemperatureValues = extremeValuesLastNDaysPerVariable({
        weatherData,
        numberOfDays: DAYS_FOR_EXTREME_CALCULATION,
        variable: "temperature",
    });

    const { rainyDays } = calculateRainyDays({
        weatherData,
        numberOfDays: DAYS_FOR_EXTREME_CALCULATION,
    }) ?? { rainyDays: 0 };

    const extremeWindSpeedValues = extremeValuesLastNDaysPerVariable({
        weatherData,
        numberOfDays: DAYS_FOR_EXTREME_CALCULATION,
        variable: "windspd",
    });

    return (
        <main className="mt-4 md:container md:mx-auto">
            <div className="mx-2 mb-2 overflow-hidden rounded-xl bg-white pb-4 drop-shadow-md md:mx-0">
                <StationModalHeading
                    {...currentWeatherData}
                    variant="page"
                    language={i18n.language}
                    onBack={() => router.back()}
                />
                <StationModalBody {...currentWeatherData} variant="page" />
            </div>
            <div className="flex flex-wrap gap-2 mx-2 md:mx-0">
                <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-[calc(33.333%-0.5rem)]">
                    <StationPageInformation
                        extremeTemperatureValues={extremeTemperatureValues!}
                        extremeWindSpeedValues={extremeWindSpeedValues!}
                        rainyDays={rainyDays}
                        stationMetadata={currentWeather.weather_station_id}
                    ></StationPageInformation>
                </div>
                <div className="my-2 rounded-xl bg-white p-4 drop-shadow-md w-full lg:w-[calc(66.666%-0.5rem)]">
                    <LastDayGraph weatherData={weatherData}></LastDayGraph>
                </div>
                <StationPageMainContent
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
