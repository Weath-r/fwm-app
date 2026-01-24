"use client";
import { WeatherData, Measurements, WeatherConditions } from "@/types";
import { useT } from "@/i18n/client";
import SvgInline from "@/components/Common/SvgInline";

export function StationModalBody(elem: Readonly<WeatherData>) {
    const { i18n } = useT("weather_conditions");
    const selectedLanguage = i18n.language;

    return (
        <div className="flex justify-center gap-4 mt-1 pb-3 border-b-2 border-light_white">
            <div className="text-sm flex flex-col items-center">
                <div className="size-8">
                    <SvgInline
                        path="/weather_icons/v2/temperature.svg"
                        title={i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.TEMP.toLowerCase())}
                        className="fill-primary"
                    />
                </div>
                {elem.temperature} {Measurements.CELCIUS}
            </div>
            <div className="text-sm flex flex-col items-center">
                <div className="size-8">
                    <SvgInline
                        path="/weather_icons/v2/wind.svg"
                        title={i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.WIND.toLowerCase())}
                        className="fill-primary"
                        style={{
                            transform: `rotate(${elem.winddir}deg)`,
                        }}
                    />
                </div>
                {elem.windspd}{Measurements.SPEED}
            </div>
            <div className="text-sm flex flex-col items-center">
                <div className="size-8">
                    <SvgInline
                        path="/weather_icons/v2/humidity.svg"
                        title={i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.HUMIDITY.toLowerCase())}
                        className="fill-primary"
                    />
                </div>
                {elem.humidity}{Measurements.PERCENTAGE}
            </div>
            <div className="text-sm flex flex-col items-center">
                <div className="size-8">
                    <SvgInline
                        path="/weather_icons/v2/rain.svg"
                        title={i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.RAIN.toLowerCase())}
                        className="fill-primary"
                    />
                </div>
                {elem.percipitation} {Measurements.MILLIMETER}
            </div>
            <div className="text-sm flex flex-col items-center">
                <div className="size-8">
                    <SvgInline
                        path="/weather_icons/v2/barometer.svg"
                        title={i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.BAROMETER.toLowerCase())}
                        className="fill-primary"
                    />
                </div>
                {elem.barometer} {Measurements.PRESSURE}
            </div>
        </div>
    );
}