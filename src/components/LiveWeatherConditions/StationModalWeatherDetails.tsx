"use client";
import { WeatherData, Measurements, WeatherConditions } from "@/types";
import SvgInline from "@/components/Common/SvgInline";
import { useT } from "@/i18n/client";

export function StationModalWeatherDetails(elem: Readonly<WeatherData>) {
    const { i18n } = useT("weather_conditions");
    const selectedLanguage = i18n.language;

    return (
        <div className="border-t-2 border-light_white">
            <div className="my-4 flex items-center justify-center gap-2">
                <div className="flex w-[100px] items-center">
                    <div className="size-6">
                        <SvgInline
                            path="/weather_icons/v2/wind.svg"
                            title="Wind icon"
                            className="fill-primary"
                            style={{
                                transform: `rotate(${elem.winddir}deg)`,
                            }}
                        />
                    </div>
                    <p className="ml-2 text-sm leading-tight text-primary/70">
                        {i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.WIND.toLowerCase())}
                        <span className="block text-xs font-bold text-primary">
                            {elem.windspd} {Measurements.SPEED}
                        </span>
                    </p>
                </div>
                <div className="flex w-[100px] items-center">
                    <div className="size-6">
                        <SvgInline
                            path="/weather_icons/v2/rain.svg"
                            title="Rain icon"
                            className="fill-primary"
                        />
                    </div>
                    <p className="ml-2 text-sm leading-tight text-primary/70">
                        {i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.RAIN.toLowerCase())}
                        <span className="block text-xs font-bold text-primary">
                            {elem.percipitation} {Measurements.MILLIMETER}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2">
                <div className="flex w-[100px] items-center gap-1">
                    <div className="size-6">
                        <SvgInline
                            path="/weather_icons/v2/humidity.svg"
                            title="Humidity icon"
                            className="fill-primary"
                        />
                    </div>
                    <p className="text-sm leading-tight text-primary/70">
                        {i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.HUMIDITY.toLowerCase())}
                        <span className="block text-xs font-bold text-primary">
                            {elem.humidity}
                            {Measurements.PERCENTAGE}
                        </span>
                    </p>
                </div>
                <div className="flex w-[100px] items-center gap-1">
                    <div className="size-6">
                        <SvgInline
                            path="/weather_icons/v2/barometer.svg"
                            className="fill-primary"
                            title="Barometer icon"
                        />
                    </div>
                    <p className="text-sm leading-tight text-primary/70">
                        {i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.BAROMETER.toLowerCase())}
                        <span className="block text-xs font-bold text-primary">
                            {elem.barometer} {Measurements.PRESSURE}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}