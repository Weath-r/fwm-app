'use client';
import SVG from "react-inlinesvg";

export default function BaseWeatherIcon({
    iconImg,
    isDay
    }: {
        iconImg: String,
        isDay: boolean,
    }) {
    
    const renderImg = `weather_conditions/${isDay ? "day" : "night"}/${iconImg}`;
    return (
        <SVG
            src={`${renderImg}.svg`}
            width="auto"
            height="auto"
            title="Weather icon"
        />
    );
}
