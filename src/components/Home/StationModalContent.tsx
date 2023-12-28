"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { ExportedWeatherData, WeatherData } from "@/types";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { LinkIcon } from "@heroicons/react/24/solid";
import SvgInline from "@/components/Common/SvgInline";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

type StationModalContentProps = {
    activeStation: number;
    isOpen: boolean;
};

type literalOptions = {
    [key: string]: string
};

/**
* @todo Propably move these literals to some place better. Maybe i18n?
*/
const literals: literalOptions = {
    cloudy: "Cloudy",
    cold: "Cold!",
    dreary_overcast: "Dreary overcast",
    flurries: "Flurries",
    fog: "Fog",
    freezing_rain: "Freezing rain",
    hazy_sunshine: "Hazy sunshine",
    hot: "Hot!",
    ice: "Icy conditions",
    intermittent_clouds: "Intermittent clouds",
    light_rain: "Light rain",
    mostly_cloudy_w_flurries: "Mostly cloudy with flurries",
    mostly_cloudy_w_showers: "Mostly cloudy with showers",
    mostly_cloudy_w_snow: "Mostly cloudy with snow",
    "mostly_cloudy_w_t-storms": "Mostly cloudy with thunderstorms",
    mostly_cloudy: "Mostly cloudy",
    mostly_sunny: "Mostly sunny",
    partly_cloudy_w_flurries: "Partly loudy with flurries",
    partly_cloudy_w_showers: "Partly loudy with showers",
    "partly_cloudy_w_t-storms": "Partly loudy with thunderstorms",
    partly_sunny: "Partly sunny",
    rain_and_snow: "Rain & snow",
    rain: "Rain",
    showers: "Showers",
    sleet: "Sleet",
    snow: "Snow",
    "t-storms": "Thunderstorms",
    thunderstorm: "Thunderstorm",
    windy: "Windy",
    clear: "Clear night",
    sunny: "Sunny",
    mostly_clear: "Mostly clear",
    hazy_moonlight: "Hazy moonlight",
};

const MODAL_TIMEOUT: number = 600;

export default function StationModalContent({
    activeStation,
    isOpen,
}: Readonly<StationModalContentProps>) {
    const dataService = new DataService();
    const [weatherData, setWeatherData] = useState<{ [key: string]: any }>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const buildExportedWeatherDataObject = (elem: WeatherData) => {
        return {
            date_created: elem.date_created,
            temperature: elem.temperature,
            humidity: elem.humidity,
            barometer: elem.barometer,
            percipitation: elem.percipitation,
            rainrate: elem.rainrate,
            windspd: elem.windspd,
            winddir: elem.winddir,
            station: elem.weather_station_id,
            iconImg: elem.weather_condition,
        };
    };

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherDataByStation(activeStation)
            .then((response) => {
                const weather_data: ExportedWeatherData[] =
                    response.data.data.map((elem: WeatherData) => {
                        return buildExportedWeatherDataObject(elem);
                    });
                return setWeatherData(weather_data);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherData([]);
            }).finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, MODAL_TIMEOUT);
            });
    };

    useEffect(() => {
        isOpen && getWeatherData();
    }, [isOpen]);
    const formatDate = (inputDate: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        };
        const date: Date = new Date(inputDate);
        const formattedDate: string = date.toLocaleDateString("en-US", options);
        return formattedDate;
    };
    
    const weatherConditionsText = (text: string): string => {
        return literals[text];
    };

    const loadingBlock = (
        <div className="absolute w-full h-full flex justify-center items-center bg-white z-[1]">
            <LoadingSpinner />
        </div>
    );
    const displayedData = weatherData.map((elem: ExportedWeatherData) => {
        return (
            <div className="p-2 flex text-black flex-col relative" key={elem.station.id}>
                {isLoading && loadingBlock }
                <div className="flex flex-col">
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
                    <p className="text-sm opacity-60">
                        {formatDate(elem.date_created)}
                    </p>
                    <div className="mt-6 flex items-center">
                        <div className="h-24 mx-auto">
                            <BaseWeatherIcon iconImg={elem.iconImg} isDay={elem.station.accuweather_location.isDayTime} />
                        </div>
                        <h3 className="text-5xl font-bold mx-auto">
                            {elem.temperature}<sup className="font-normal text-lg ml-1">°C</sup>
                            <small className="block text-base font-normal">
                                {weatherConditionsText(elem.iconImg)}
                            </small>
                        </h3>
                    </div>
                    <div className="my-2">
                        <h4 className="font-bold text-lg my-2">
                            Details
                        </h4>
                        <div className="bg-info rounded-2xl p-4">
                            <div className="flex items-center justify-around">
                                <div className="flex items-center w-[100px]">
                                    <div className="h-6 w-6">
                                        <SvgInline
                                            path="weather_icons/humidity.svg"
                                            title="Humidity icon"
                                            className="fill-white"
                                        />
                                    </div>
                                    <p className="text-sm text-white leading-tight ml-2">
                                        Humidity
                                        <span className="block font-bold text-xs">
                                            {elem.humidity}%
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center w-[100px]">
                                    <div className="h-6 w-6">
                                        <SvgInline
                                            path="weather_icons/barometer.svg"
                                            className="fill-white"
                                            title="Barometer icon"
                                        />
                                    </div>
                                    <p className="text-sm text-white leading-tight ml-2">
                                        Barometer
                                        <span className="block font-bold text-xs">
                                            {elem.barometer} hPa
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="border-[0.5px] border-white h-[1px] my-4"></div>
                            <div className="flex items-center justify-around">
                                <div className="flex items-center w-[100px]">
                                    <div className="h-4 w-6">
                                        <SvgInline
                                            path="weather_icons/wind.svg"
                                            title="Wind icon"
                                            className="fill-white"
                                            style={{
                                                transform: `rotate(${elem.winddir}deg)`,
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-white leading-tight ml-2">
                                        Wind
                                        <span className="block font-bold text-xs">
                                            {elem.windspd} km/h
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center w-[100px]">
                                    <div className="h-6 w-6">
                                        <SvgInline
                                            path="weather_icons/rain.svg"
                                            title="Rain icon"
                                            className="fill-white"
                                        />
                                    </div>
                                    <p className="text-sm text-white leading-tight ml-2">
                                        Rain
                                        <span className="block font-bold text-xs">
                                            {elem.percipitation} mm
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return <div>{displayedData}</div>;
}
