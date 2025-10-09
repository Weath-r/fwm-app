"use client";
import { WeatherData } from "@/types";

import { StationModalWeatherSummary } from "./StationModalWeatherSummary";
import { StationWeatherForecastDetails } from "./StationWeatherForecastDetails";
import { StationModalHeading } from "./StationModalHeading";
import { BackToHomepageButton } from "./buttons/BackToHomepageButton";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    weatherData: WeatherData[];
};

export default function LiveWeatherConditionsPage({ weatherData, params }: StationPageProps) {

    return (
        weatherData.map((elem: WeatherData) => {
            return (
                <div className="relative flex h-full flex-col gap-2 text-black" key={elem.station.id}>
                    <div className="flex items-start gap-1">
                        <BackToHomepageButton language={params.lng} />
                        <StationModalHeading {...elem } />
                    </div>
                    <StationModalWeatherSummary {...elem} />
                    <StationWeatherForecastDetails {...elem} />
                </div>
            );
        })
    );
}
