import { WeatherData } from "@/types";
import { formatDateToUSLocale } from "@/utils/weatherDataFormatUtils";
import { LinkIcon } from "@heroicons/react/24/solid";
import BaseWeatherIcon from "../BaseComponents/BaseWeatherIcon";

export function StationWeatherSummary(elem: Readonly<WeatherData>) {
    return (
        <>
            <a
                href={elem.station.website_url}
                target="_blank"
                rel="noreferrer"
                className="block mb-2"
            >
                <LinkIcon className="h-7 w-7 p-1"></LinkIcon>
            </a>
            <h2 className="text-xl font-bold">
                {elem.station.name}
                <span className="text-base font-medium">, {elem.station.prefecture_id.label}</span>
            </h2>
            <p className="text-sm opacity-60">{formatDateToUSLocale(elem.dateCreated)}</p>
            <div className="mt-6 flex items-center">
                <div className="h-24 mx-auto">
                    <BaseWeatherIcon
                        assetId={elem.assetId}
                        weatherDescriptionText={elem.weatherDescription}
                    />
                </div>
                <h3 className="text-5xl font-bold mx-auto">
                    {elem.temperature}
                    <sup className="font-normal text-lg ml-1">°C</sup>
                    <small className="block text-base font-normal capitalize">
                        {elem.weatherDescription}
                    </small>
                </h3>
            </div>
        </>
    );
}
