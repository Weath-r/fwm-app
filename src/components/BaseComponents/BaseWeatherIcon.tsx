"use client";
import InlineSVG from "react-inlinesvg";

type BaseWeatherIconProps = {
    iconImg: string;
    isDay: boolean;
};

export default function BaseWeatherIcon({ iconImg, isDay }: Readonly<BaseWeatherIconProps>) {
    const renderImg = `weather_conditions/${isDay ? "day" : "night"}/${iconImg}`;
    return <InlineSVG src={`${renderImg}.svg`} width="100%" height="100%" title="Weather icon" />;
}
