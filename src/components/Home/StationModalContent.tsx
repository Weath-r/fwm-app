"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { WeatherData, WeatherDataResponse } from "@/types";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { useAppStore } from "@/hooks/useAppStore";
import { buildWeatherData } from "@/utils/weatherDataFormatUtils";
import { StationModalWeatherSummary } from "./WeatherModal/StationModalWeatherSummary";
import { StationWeatherForecastDetails } from "./WeatherModal/StationWeatherForecastDetails";
import { StationModalHeading } from "./WeatherModal/StationModalHeading";
import { useConfigurationStore } from "@/stores/configurationStore";

const MODAL_TIMEOUT: number = 600;

const loadingBlock = (
    <div className="absolute w-full h-full flex justify-center items-center bg-white z-[1]">
        <LoadingSpinner />
    </div>
);

export default function StationModalContent() {
    const dataService = new DataService();
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { activeStation } = useAppStore();
    const { featureFlags } = useConfigurationStore();
    const isForecastEnabled = featureFlags?.forecasts.modalForecast;

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherDataByStation(activeStation)
            .then(async (response) => {
                const weatherData: WeatherData[] = response.map((elem: WeatherDataResponse) => {
                    return buildWeatherData(elem);
                });
                await dataService
                    .fetchForecastByStation(activeStation)
                    .then((response) => {
                        const newResponse = weatherData.map(elem => {
                            return {
                                ...elem,
                                full_forecast: response[0].full_forecast,

                            };
                        });
                        return setWeatherData(newResponse);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                return setWeatherData([]);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, MODAL_TIMEOUT);
            });
    };

    useEffect(() => {
        getWeatherData();
    }, []);

    return (
        weatherData.map((elem: WeatherData) => {
            return (
                <div className="h-full flex flex-col text-black p-2" key={elem.station.id}>
                    {isLoading && loadingBlock}
                    <div className="w-full">
                        <StationModalHeading {...elem} />
                    </div>
                    <div className="mt-2">
                        <StationModalWeatherSummary {...elem} />
                    </div>
                    <div className="mt-2">
                        {isForecastEnabled && <StationWeatherForecastDetails {...elem} />}
                    </div>
                </div>
            );
        })
    );
}
