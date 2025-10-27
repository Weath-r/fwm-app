"use client";
import { assetUrl } from "@/helpers/assetsHandling";
import Image from "next/image";

type BaseWeatherIconProps = {
    weatherDescriptionText: string;
    assetId: string;
    className?: string;
};

export default function BaseWeatherIcon({ weatherDescriptionText, assetId, className }: Readonly<BaseWeatherIconProps>) {
    const imagePath = assetUrl(assetId);
    const iconCustomClass = className ? className : "";

    return <Image 
        src={imagePath} 
        alt={weatherDescriptionText}
        className={`h-full !w-full ${iconCustomClass} object-contain`} 
        width={100}
        height={100}
    />;
}
