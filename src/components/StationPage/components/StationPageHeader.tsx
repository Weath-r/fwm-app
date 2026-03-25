"use client";
import Image from "next/image";
import { useT } from "@/i18n/client";
import { Measurements, WeatherDataResponse, WeatherConditions } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import { assetUrl } from "@/helpers/assetsHandling";

import { BackButton } from "@/components/StationPage/components/BackButton";
import SvgInline from "@/components/Common/SvgInline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type StationPageHeaderProps = {
    stationCurrentWeather: WeatherDataResponse;
};

export default function StationPageHeader({ stationCurrentWeather }: StationPageHeaderProps) {
    const { i18n } = useT("station");
    const { i18n: i18n_icons } = useT("weather_icons");
    const { i18n: i18n_conditions } = useT("weather_conditions");
    const selectedLanguage = i18n.language;
    console.log(assetUrl(stationCurrentWeather.weather_station_id.header_bg));
    const imagePath = assetUrl(stationCurrentWeather.weather_station_id.header_bg);
    return (
        <div className="w-full h-52 md:rounded-t-lg drop-shadow-md">
            <div className="flex items-center justify-center h-full">
                <Image
                    src={imagePath}
                    alt="Mountain"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center md:rounded-t-lg"
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-52 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg"></div>
            <div className="absolute top-1 left-0 z-10">
                <BackButton>
                    <p className="text-secondary/75 flex items-center gap-1 text-sm">
                        <ChevronLeftIcon className="size-4 text-secondary/75" />
                        {i18n.getFixedT(selectedLanguage, "station")("backToCTA")}
                    </p>
                </BackButton>
            </div>
            <div className="absolute bottom-0 left-0 text-secondary z-10 w-full">
                <div className="flex items-center justify-between gap-2 w-full px-4 flex-wrap md:flex-nowrap mb-2 md:mb-0">
                    <h2 className="mb-4 text-2xl font-bold">
                        {stationCurrentWeather.weather_station_id.name}
                        <div className="text-sm capitalize">
                            {i18n_icons.getFixedT(
                                selectedLanguage,
                                "weather_icons"
                            )(stationCurrentWeather.weather_condition.toLowerCase())}
                        </div>
                        <small className="block text-xs font-medium text-secondary/75">
                            {i18n.getFixedT(selectedLanguage, "stationModal")("lastUpdated")}{" "}
                            {timeFromNowUtil(stationCurrentWeather.date_created)}
                        </small>
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/temperature.svg"
                                    title={i18n_conditions.getFixedT(
                                        selectedLanguage,
                                        "weather_conditions"
                                    )(WeatherConditions.TEMP.toLowerCase())}
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.temperature} {Measurements.CELCIUS}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/wind.svg"
                                    title={i18n_conditions.getFixedT(
                                        selectedLanguage,
                                        "weather_conditions"
                                    )(WeatherConditions.WIND.toLowerCase())}
                                    className="fill-secondary"
                                    style={{
                                        transform: `rotate(${stationCurrentWeather.winddir}deg)`,
                                    }}
                                />
                            </div>
                            {stationCurrentWeather.windspd}
                            {Measurements.SPEED}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/humidity.svg"
                                    title={i18n_conditions.getFixedT(
                                        selectedLanguage,
                                        "weather_conditions"
                                    )(WeatherConditions.HUMIDITY.toLowerCase())}
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.humidity}
                            {Measurements.PERCENTAGE}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/rain.svg"
                                    title={i18n_conditions.getFixedT(
                                        selectedLanguage,
                                        "weather_conditions"
                                    )(WeatherConditions.RAIN.toLowerCase())}
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.percipitation} {Measurements.MILLIMETER}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/barometer.svg"
                                    title={i18n_conditions.getFixedT(
                                        selectedLanguage,
                                        "weather_conditions"
                                    )(WeatherConditions.BAROMETER.toLowerCase())}
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.barometer} {Measurements.PRESSURE}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
