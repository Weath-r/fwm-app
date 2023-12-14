"use client";
type BaseWeatherIconProps = {
    iconImg: string;
    isDay: boolean;
};

export default function BaseWeatherIcon({ iconImg, isDay }: Readonly<BaseWeatherIconProps>) {
    const renderImg = `weather_conditions/${isDay ? "day" : "night"}/${iconImg}`;
    return <img src={`${renderImg}.svg`} alt="Weather icon" className="!w-full h-full" />;
}
