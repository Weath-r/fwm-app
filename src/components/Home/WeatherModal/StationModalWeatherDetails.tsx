import { WeatherData, Measurements, WeatherConditions } from "@/types";
import SvgInline from "@/components/Common/SvgInline";

export function StationModalWeatherDetails(elem: Readonly<WeatherData>) {
    return (
        <div className="border-t-2 border-light_white">
            <div className="my-4 flex items-center justify-center gap-4">
                <div className="flex w-[100px] items-center">
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
                    <p className="ml-2 text-sm leading-tight text-primary/70">
                        {WeatherConditions.WIND}
                        <span className="block text-xs font-bold text-primary">
                            {elem.windspd} {Measurements.SPEED}
                        </span>
                    </p>
                </div>
                <div className="flex w-[100px] items-center">
                    <div className="size-6">
                        <SvgInline
                            path="weather_icons/rain.svg"
                            title="Rain icon"
                            className="fill-primary"
                        />
                    </div>
                    <p className="ml-2 text-sm leading-tight text-primary/70">
                        {WeatherConditions.RAIN}
                        <span className="block text-xs font-bold text-primary">
                            {elem.percipitation} {Measurements.MILLIMETER}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <div className="flex w-[100px] items-center">
                    <div className="size-6">
                        <SvgInline
                            path="weather_icons/humidity.svg"
                            title="Humidity icon"
                            className="fill-primary"
                        />
                    </div>
                    <p className="ml-2 text-sm leading-tight text-primary/70">
                        {WeatherConditions.HUMIDITY}
                        <span className="block text-xs font-bold text-primary">
                            {elem.humidity}
                            {Measurements.PERCENTAGE}
                        </span>
                    </p>
                </div>
                <div className="flex w-[100px] items-center">
                    <div className="size-6">
                        <SvgInline
                            path="weather_icons/barometer.svg"
                            className="fill-primary"
                            title="Barometer icon"
                        />
                    </div>
                    <p className="ml-2 text-sm leading-tight text-primary/70">
                        {WeatherConditions.BAROMETER}
                        <span className="block text-xs font-bold text-primary">
                            {elem.barometer} {Measurements.PRESSURE}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}