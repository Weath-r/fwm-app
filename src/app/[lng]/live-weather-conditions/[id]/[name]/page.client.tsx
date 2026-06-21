"use client";
import LiveWeatherConditionsPage from "@/components/LiveWeatherConditions/LiveWeatherConditionsPage";

import { WeatherData } from "@/types";

type LiveWeatherConditionsProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    weatherData: WeatherData[];
};

export default  function StationPageView({ params, weatherData }: LiveWeatherConditionsProps) {

    return (
        <main className="flex flex-1 flex-col">
            <div className="mx-2 md:container md:mx-auto">
                <div className="my-4 w-full overflow-hidden rounded-xl bg-white drop-shadow-md">
                    <LiveWeatherConditionsPage params={params} weatherData={weatherData} />
                </div>
            </div>
        </main>
    );
}