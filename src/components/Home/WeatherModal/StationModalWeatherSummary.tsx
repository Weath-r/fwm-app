import { WeatherData, Measurements } from "@/types";
import BaseWeatherIcon from "../../BaseComponents/BaseWeatherIcon";
import { StationModalWeatherDetails } from "./StationModalWeatherDetails";

export function StationModalWeatherSummary(elem: WeatherData) {
    return (
        <div className="flex flex-col">
            <div className="mt-6 flex items-center gap-4 lg:gap-0">
                <div className="flex w-2/5 flex-col lg:w-1/2">
                    <div className="mx-auto size-28 lg:size-36">
                        <BaseWeatherIcon
                            assetId={elem.assetId}
                            weatherDescriptionText={elem.weatherDescription}
                        />
                    </div>
                    <p className="mx-auto mb-4 text-base font-bold capitalize text-primary">
                        {elem.weatherDescription}
                    </p>
                </div>
                <div className="w-2/3 lg:w-1/2">
                    <h3 className="text-center text-5xl font-bold text-primary">
                        {elem.temperature}
                        <sup className="ml-1 text-2xl font-normal">
                            {Measurements.CELCIUS}
                        </sup>
                    </h3>
                    <div className="my-2 mt-4">
                        <StationModalWeatherDetails {...elem} />
                    </div>
                </div>

            </div>
        </div>
    );
}