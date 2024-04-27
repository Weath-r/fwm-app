"use client";
import { assetUrl } from "@/helpers/assetsHandling";
type BaseWeatherIconProps = {
    weatherDescriptionText: string;
    assetId: string;
};

export default function BaseWeatherIcon({ weatherDescriptionText, assetId }: Readonly<BaseWeatherIconProps>) {
    const imagePath = assetUrl(assetId);
    return <img 
        src={`${imagePath}`} 
        alt={weatherDescriptionText}
        className="!w-full h-full" 
    />;
}
