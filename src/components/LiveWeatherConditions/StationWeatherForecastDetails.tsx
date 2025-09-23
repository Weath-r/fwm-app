"use client";
import { WeatherData, ForecastData, Measurements } from "@/types";
import { useState } from "react";
import { 
    timeOnlyUtil, 
    fullDateNoTime,
    dayWithNameUtilWithCustom 
} from "@/utils/dateTimeUtils";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import SvgInline from "@/components/Common/SvgInline";
import CommonButton from "@/components/Common/CommonButton";
import StationLink from "@/components/Common/StationLink";
import { useConfigurationStore } from "@/stores/configurationStore";
import { useT } from "@/i18n/client";

type GroupedWeatherData = {
    [key: string]: ForecastData[];
};

type handleDateSelectionBtn = {
    date: string;
};

const convertTimeStampToDate = (timestamp: number): string => {
    const dateNow = new Date(timestamp);
    return timeOnlyUtil(dateNow);
};

const convertStringToDate = (date: string): string => {
    return dayWithNameUtilWithCustom(date);
};

export function StationWeatherForecastDetails(elem: WeatherData) {
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;
    const title = i18n.getFixedT(selectedLanguage, "stationModal")("nextDays");
    const dateNow = new Date();
    const activeDate = fullDateNoTime(dateNow);
    const [activeBtn, setActiveBtn] = useState(activeDate);
    const [forecastDate, setForecastDate] = useState(activeDate);

    const structuredForecast = elem.full_forecast.reduce((acc: GroupedWeatherData, currentItem) => {
        const currentForecastTime = new Date(currentItem.time);
        const date = fullDateNoTime(currentForecastTime);
        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(currentItem);
        return acc;
    },{});

    const handleDateSelectionBtn = ({ date }:handleDateSelectionBtn ) => {
        setActiveBtn(date);
        setForecastDate(date);
    };

    const getExtremeDayValues = (date:string) => {
        const valuesArr = [];
        for(const value of structuredForecast[date]) {
            value.temperature && valuesArr.push(value.temperature);
        }
        return {
            max: Math.max(...valuesArr),
            min: Math.min(...valuesArr),
        };
    };

    const { featureFlags } = useConfigurationStore();
    const isFullStationPageEnabled = featureFlags?.standalone_station?.moreDetailsModalUrl;

    return (
        <div className="p-1">
            <h4 className="my-4 text-xs font-bold uppercase text-primary">
                {title}
            </h4>
            {elem.full_forecast.length > 0 && 
            <section>
                <div className="flex gap-2 overflow-x-auto">
                    {Object.keys(structuredForecast).map((item) => {
                        const activeClass = activeBtn === item ? "!bg-info text-white" : "";
                        return (
                            <div 
                                key={item}
                                className="w-full"
                            >
                                <CommonButton
                                    color="primary"
                                    className={`w-full rounded-lg bg-light_white p-2 text-sm ${activeClass}`}
                                    handleClick={() => handleDateSelectionBtn({
                                        date: item,
                                    })}
                                >
                                    <div className="flex h-12 items-center gap-4 md:h-16">
                                        <div className="w-full">
                                            <p className="text-sm font-bold">
                                                {convertStringToDate(item)}
                                            </p>
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <p>
                                                {getExtremeDayValues(item).max}
                                            </p>
                                            <p>
                                                {getExtremeDayValues(item).min}
                                            </p>
                                        </div>
                                    </div>
                                </CommonButton>
                            </div>
                        );
                    })}
                </div>
                <div className="my-2 h-fit max-h-[190px] overflow-y-auto md:max-h-[240px]">
                    {structuredForecast[forecastDate] && structuredForecast[forecastDate].map((forecast,index, forecastArray) => {
                        const forecastTime = new Date(forecast.time);
                        const shouldRenderForecast = index === forecastArray.length - 1 
                            ? true 
                            : forecastTime.valueOf() > dateNow.valueOf() ? true : false;
                        return ( shouldRenderForecast && 
                        <div 
                            key={index}
                            className="my-4 flex items-center justify-between gap-2 rounded-lg p-2 shadow"
                        >
                            <p className="text-primary opacity-60">
                                { convertTimeStampToDate(forecast.time )}
                            </p>
                            <div className="size-10">
                                <BaseWeatherIcon
                                    assetId={forecast.forecastIcon}
                                    weatherDescriptionText={elem.station.name}
                                ></BaseWeatherIcon>
                            </div>
                            <p className="text-primary">
                                { forecast.temperature}
                                <span className="ml-1 text-sm">
                                    {Measurements.CELCIUS}
                                </span>
                            </p>
                            <div className="flex items-center">
                                <div className="h-4 w-6">
                                    <SvgInline
                                        path="/weather_icons/wind.svg"
                                        title="Wind icon"
                                        className="fill-primary"
                                        style={{
                                            transform: `rotate(${forecast.winddir}deg)`,
                                        }}
                                    />
                                </div>
                                <p className="ml-1 text-primary">
                                    {forecast.windspd}
                                    <span className="ml-1 text-sm">
                                        {Measurements.SPEED}
                                    </span>
                                </p>
                            </div>
                            <p className="text-primary">
                                { forecast.percipitation}
                                <span className="ml-1 text-sm">
                                    {Measurements.MILLIMETER}
                                </span>
                            </p>
                        </div>
                        );
                    })}
                </div>
                {isFullStationPageEnabled && (
                    <div className="flex justify-center">
                        <StationLink
                            stationId={elem.station.id}
                            stationName={elem.station.name}
                            pageName="station"
                            lang={selectedLanguage}
                            className="text-sm font-bold uppercase text-primary"
                        >
                            {i18n.getFixedT(selectedLanguage, "stationModal")("moreDetails")}
                        </StationLink>
                    </div>
                )}
            </section>
            }
            {elem.full_forecast.length === 0 && <p className="text-sm text-primary">
                {i18n.getFixedT(selectedLanguage, "stationModal")("forecastNotAvailable")}
            </p>}
        </div>
    );
}