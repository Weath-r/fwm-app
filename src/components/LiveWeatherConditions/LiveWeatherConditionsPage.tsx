"use client";
import { WeatherData } from "@/types";

import { StationModalWeatherSummary } from "./StationModalWeatherSummary";
import { StationWeatherForecastDetails } from "./StationWeatherForecastDetails";
import { StationModalHeading } from "./StationModalHeading";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    weatherData: WeatherData[];
};

export default function LiveWeatherConditionsPage({ weatherData }: StationPageProps) {

    return (
        weatherData.map((elem: WeatherData) => {
            return (
                <div className="relative flex h-full flex-col gap-2 text-black" key={elem.station.id}>
                    <div className="w-full">
                        <StationModalHeading {...elem } />
                    </div>
                    <StationModalWeatherSummary {...elem} />
                    <StationWeatherForecastDetails {...elem} />
                </div>
            );
        })
    );
}
