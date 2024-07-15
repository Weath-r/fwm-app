import { WeatherData, ForecastData, Measurements } from "@/types";
import { useState } from "react";
import { 
    timeOnlyUtil, 
    fullDateNoTime,
    dayWithNameUtilWithCustom 
} from "@/utils/dateTimeUtils";
import BaseWeatherIcon from "../../BaseComponents/BaseWeatherIcon";
import SvgInline from "../../Common/SvgInline";
import CommonButton from "@/components/Common/CommonButton";

type GroupedWeatherData = {
    [key: string]: ForecastData[];
};

type handleDateSelectionBtn = {
    buttonIndex: number;
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
    const title = "Next 5 days";
    const structuredForecast = elem.full_forecast.reduce((acc: GroupedWeatherData, currentItem) => {
        const dateNow = new Date(currentItem.time);
        const date = fullDateNoTime(dateNow);
        if (!acc[date]) {
            acc[date] = [];
        }
        
        acc[date].push(currentItem);
        return acc;
    },{});
    const dateNow = new Date();
    const [activeBtn, setActiveBtn] = useState(0);
    const [forecastDate, setForecastDate] = useState(fullDateNoTime(dateNow));

    const handleDateSelectionBtn = ({ buttonIndex, date }:handleDateSelectionBtn ) => {
        setActiveBtn(buttonIndex);
        setForecastDate(date);
    };

    const getExtremeDayValues = (date:string) => {
        const valuesArr = [];
        for(const value of structuredForecast[date]) {
            valuesArr.push(value.temperature);
        }
        return {
            max: Math.max(...valuesArr),
            min: Math.min(...valuesArr),
        };
    };

    return (
        <div className="p-1">
            <h4 className="font-bold text-xs opacity-70 uppercase my-4">
                {title}
            </h4>
            <div className="flex gap-2">
                {Object.keys(structuredForecast).map((item,index) => {
                    const activeClass = activeBtn === index ? "!bg-info text-white" : "";
                    return (
                        <div 
                            key={item}
                            className="w-full"
                        >
                            <CommonButton
                                color="primary"
                                className={`w-full p-2 text-sm bg-light_white rounded-lg ${activeClass}`}
                                handleClick={() => handleDateSelectionBtn({
                                    buttonIndex: index,
                                    date: item,
                                })}
                            >
                                <div className="h-16 flex items-center gap-4">
                                    <div className="w-full">
                                        <p className="text-sm font-bold">
                                            {convertStringToDate(item)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-full">
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
            <div className="mt-2 max-h-[280px] overflow-y-auto">
                {structuredForecast[forecastDate].map((forecast,index) => {
                    const forecastTime = new Date(forecast.time);
                    const shouldRenderForecast = forecastTime.valueOf() > dateNow.valueOf();
                    return ( shouldRenderForecast &&
                        <div 
                            key={index}
                            className="flex items-center justify-between gap-2 p-2 my-4 rounded-lg shadow"
                        >
                            <p className="text-primary opacity-60">
                                { convertTimeStampToDate(forecast.time )}
                            </p>
                            <div className="h-10 w-10">
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
                                        path="weather_icons/wind.svg"
                                        title="Wind icon"
                                        className="fill-primary"
                                        style={{
                                            transform: `rotate(${forecast.winddir}deg)`,
                                        }}
                                    />
                                </div>
                                <p className="text-primary ml-1">
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
        </div>
    );
}