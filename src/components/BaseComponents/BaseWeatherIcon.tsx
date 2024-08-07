"use client";
import { assetUrl } from "@/helpers/assetsHandling";
type BaseWeatherIconProps = {
    weatherDescriptionText: string;
    assetId: string;
    className?: string;
};

export default function BaseWeatherIcon({ weatherDescriptionText, assetId, className }: Readonly<BaseWeatherIconProps>) {
    const imagePath = assetUrl(assetId);
    return <img 
        src={`${imagePath}`} 
        alt={weatherDescriptionText}
        className={`h-full !w-full ${className}`} 
    />;
}
