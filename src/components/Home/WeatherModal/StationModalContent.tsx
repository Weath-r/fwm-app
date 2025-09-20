"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { WeatherData, WeatherDataResponse } from "@/types";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

import { useAppStore } from "@/hooks/useAppStore";
import { buildWeatherData } from "@/utils/weatherDataFormatUtils";
import { StationModalWeatherSummary } from "../WeatherModal/StationModalWeatherSummary";
import { StationWeatherForecastDetails } from "../WeatherModal/StationWeatherForecastDetails";
import { StationModalHeading } from "../WeatherModal/StationModalHeading";
import { useConfigurationStore } from "@/stores/configurationStore";
import { useParams } from "next/navigation";

const MODAL_TIMEOUT: number = 600;

const loadingBlock = (
    <div className="absolute z-10 flex h-[calc(100%_-_16px)] w-[93.6vw] items-center justify-center overflow-hidden rounded-2xl bg-white md:size-full md:h-[calc(100%_-_34px)]">
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
    const params = useParams();
    const currentLanguage = params.lng;

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherDataByStation(activeStation)
            .then(async (response) => {
                const weatherData: WeatherData[] = response.map((elem: WeatherDataResponse) => {
                    if (currentLanguage && elem.weather_station_id.translations) {
                        const translationStationName = elem.weather_station_id.translations.find(t => t.languages_code === currentLanguage);
                        if (translationStationName) {
                            elem.weather_station_id.name = translationStationName.name;
                        }
                    }

                    if (currentLanguage && elem.weather_station_id.prefecture_id.translations) {
                        const translationPrefectureName = elem.weather_station_id.prefecture_id.translations.find(t => t.languages_code === currentLanguage);
                        if (translationPrefectureName) {
                            elem.weather_station_id.prefecture_id.label = translationPrefectureName.name;
                        }
                    }
                    return buildWeatherData(elem);
                });
                if (isForecastEnabled) {
                    await dataService
                        .fetchForecastByStation(activeStation)
                        .then((response) => {
                            const newResponse = weatherData.map(elem => {
                                return {
                                    ...elem,
                                    full_forecast: response[0]?.full_forecast || [],
    
                                };
                            });
                            return setWeatherData(newResponse);
    
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    return setWeatherData(weatherData);
                }
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
                <div className="relative flex h-full flex-col gap-2 text-black" key={elem.station.id}>
                    {isLoading && loadingBlock}
                    <div className="w-full">
                        <StationModalHeading {...elem } />
                    </div>
                    <StationModalWeatherSummary {...elem} />
                    {isForecastEnabled &&
                        <StationWeatherForecastDetails {...elem} />
                    }
                </div>
            );
        })
    );
}
