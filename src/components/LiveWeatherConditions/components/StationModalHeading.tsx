"use client";
import { WeatherData } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import { useT } from "@/i18n/client";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { FavoriteStationButton } from "@/components/Common/Favorite/favoriteStationButton";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { FrostWarning } from "./FrostWarning";

export function StationModalHeading(elem: Readonly<WeatherData>) {
    const headerElemement = elem.station.website_url.includes("http") ?
        <a
            href={elem.station.website_url}
            target="_blank"
            rel="noreferrer"
        >
            {elem.station.name}
        </a> : 
        <span>{elem.station.name}</span>;

    const { i18n } = useT("stationModal");
    const { i18n: i18n_icons } = useT("weather_icons");
    const selectedLanguage = i18n.language;

    return (
        <div className="flex items-center gap-2">
            <div className="flex w-2/5 flex-col lg:w-1/2">
                <div className="mx-auto size-24 lg:size-32">
                    <BaseWeatherIcon
                        assetId={elem.assetId}
                        weatherDescriptionText={elem.weatherDescription}
                    />
                </div>
                <p className="mx-auto mb-2 text-base font-bold capitalize text-primary">
                    {i18n_icons.getFixedT(selectedLanguage, "weather_icons")(elem.weatherDescription)}
                </p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center max-w-[200px] line-clamp-1">
                    <h2 className="text-2xl font-bold text-primary truncate">
                        {headerElemement}
                    </h2>
                </div>
                <div className="my-2 flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="size-4 fill-primary/70"></MapPinIcon>
                        <p className="text-sm text-primary/70">
                            {elem.station.prefecture_id.label}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                        { elem.frost_data && elem.frost_data.frost_level > 0 && <FrostWarning warningLevel={elem.frost_data?.frost_level} />}
                        <FavoriteStationButton activeStation={elem.station.id}></FavoriteStationButton>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <ClockIcon className="size-4 fill-primary/70"></ClockIcon>
                    <p className="text-xs text-primary/70">
                        {i18n.getFixedT(selectedLanguage, "stationModal")("lastUpdated")} {timeFromNowUtil(elem.dateCreated)}
                    </p>
                </div>
            </div>
        </div>
    );
}