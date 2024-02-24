"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { WeatherData, WeatherDataResponse } from "@/types";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { useAppStore } from "@/hooks/useAppStore";
import { buildWeatherData } from "@/utils/weatherDataFormatUtils";
import { StationWeatherSummary } from "./StationWeatherSummary";
import { StationWeatherDetails } from "./StationWeatherDetails";

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

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherDataByStation(activeStation)
            .then((response) => {
                const weatherData: WeatherData[] = response.map((elem: WeatherDataResponse) => {
                    return buildWeatherData(elem);
                });
                return setWeatherData(weatherData);
            })
            .catch((error) => {
                // TO-DO handle error properly
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
        <div>
            {weatherData.map((elem: WeatherData) => {
                return (
                    <div className="p-2 flex text-black flex-col relative" key={elem.station.id}>
                        {isLoading && loadingBlock}
                        <div className="flex flex-col">
                            <StationWeatherSummary {...elem} />
                            <StationWeatherDetails {...elem} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
