import { WeatherData, Measurements, WeatherConditions } from "@/types";
import SvgInline from "@/components/Common/SvgInline";

export function StationModalWeatherDetails(elem: Readonly<WeatherData>) {
    return (
        <div className="border-t-[2px] border-light_white">
            <div className="flex items-center justify-center gap-4 my-4">
                <div className="flex items-center w-[100px]">
                    <div className="h-4 w-6">
                        <SvgInline
                            path="weather_icons/wind.svg"
                            title="Wind icon"
                            className="fill-primary"
                            style={{
                                transform: `rotate(${elem.winddir}deg)`,
                            }}
                        />
                    </div>
                    <p className="text-sm text-primary/70 leading-tight ml-2">
                        {WeatherConditions.WIND}
                        <span className="block font-bold text-xs text-primary">
                            {elem.windspd} {Measurements.SPEED}
                        </span>
                    </p>
                </div>
                <div className="flex items-center w-[100px]">
                    <div className="h-6 w-6">
                        <SvgInline
                            path="weather_icons/rain.svg"
                            title="Rain icon"
                            className="fill-primary"
                        />
                    </div>
                    <p className="text-sm text-primary/70 leading-tight ml-2">
                        {WeatherConditions.RAIN}
                        <span className="block font-bold text-xs text-primary">
                            {elem.percipitation} {Measurements.MILLIMETER}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <div className="flex items-center w-[100px]">
                    <div className="h-6 w-6">
                        <SvgInline
                            path="weather_icons/humidity.svg"
                            title="Humidity icon"
                            className="fill-primary"
                        />
                    </div>
                    <p className="text-sm text-primary/70 leading-tight ml-2">
                        {WeatherConditions.HUMIDITY}
                        <span className="block font-bold text-xs text-primary">
                            {elem.humidity}
                            {Measurements.PERCENTAGE}
                        </span>
                    </p>
                </div>
                <div className="flex items-center w-[100px]">
                    <div className="h-6 w-6">
                        <SvgInline
                            path="weather_icons/barometer.svg"
                            className="fill-primary"
                            title="Barometer icon"
                        />
                    </div>
                    <p className="text-sm text-primary/70 leading-tight ml-2">
                        {WeatherConditions.BAROMETER}
                        <span className="block font-bold text-xs text-primary">
                            {elem.barometer} {Measurements.PRESSURE}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}