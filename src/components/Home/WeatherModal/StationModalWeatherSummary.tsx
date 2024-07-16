import { WeatherData, Measurements } from "@/types";
import BaseWeatherIcon from "../../BaseComponents/BaseWeatherIcon";
import { StationModalWeatherDetails } from "./StationModalWeatherDetails";

export function StationModalWeatherSummary(elem: WeatherData) {
    return (
        <div className="flex flex-col">
            <h4 className="font-bold text-xs uppercase text-primary">
                Currently outside
            </h4>
            <div className="mt-6 flex items-center gap-4 lg:gap-0">
                <div className="w-2/5 lg:w-1/2 flex flex-col">
                    <div className="h-28 w-28 lg:h-36 lg:w-36 mx-auto">
                        <BaseWeatherIcon
                            assetId={elem.assetId}
                            weatherDescriptionText={elem.weatherDescription}
                        />
                    </div>
                    <p className="text-base text-primary capitalize mx-auto mt-4 font-bold">
                        {elem.weatherDescription}
                    </p>
                </div>
                <div className="w-2/3 lg:w-1/2">
                    <h3 className="text-5xl font-bold text-center text-primary">
                        {elem.temperature}
                        <sup className="font-normal text-2xl ml-1">
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