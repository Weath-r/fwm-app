import { WeatherDataResponse, WeatherConditions, Measurements } from "@/types";
import SvgInline from "@/components/Common/SvgInline";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";

export default function StationStandaloneCurrentWeather({ currentWeather }: { currentWeather: WeatherDataResponse[]}) {
    return (
        <section className="h-full">
            <h4 className="mb-2 text-lg font-bold text-primary">
                Weather now
            </h4>
            {currentWeather.map((elem, index) => {
                return (
                    <div className="flex flex-col gap-4 lg:h-full lg:gap-0" key={index}>
                        <div className="flex items-center justify-around">
                            <div className="flex flex-col items-center gap-1 lg:gap-4">
                                <div className="size-14 lg:size-32">
                                    <BaseWeatherIcon
                                        assetId={elem.weather_condition_icon}
                                        weatherDescriptionText={elem.weather_condition}
                                    />
                                </div>
                                <p className="text-md ml-2 font-bold capitalize leading-tight text-primary">
                                    {elem.weather_condition}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="size-6 lg:size-8">
                                    <SvgInline
                                        path="/weather_icons/wind.svg"
                                        title="Wind icon"
                                        className="fill-primary"
                                        style={{
                                            transform: `rotate(${elem.winddir}deg)`,
                                        }}
                                    />
                                </div>
                                <p className="text-md leading-tight text-primary/70 lg:text-lg">
                                    {WeatherConditions.WIND}
                                    <span className="block text-xs font-bold text-primary">
                                        {elem.windspd} {Measurements.SPEED}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-1 lg:flex-auto lg:gap-2">
                            <div className="flex items-center">
                                <p className="text-md leading-tight text-primary/70 lg:text-lg">
                                    {WeatherConditions.TEMP}
                                    <span className="block text-xs font-bold text-primary">
                                        {elem.temperature} {Measurements.CELCIUS}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-md leading-tight text-primary/70 lg:text-lg">
                                    {WeatherConditions.HUMIDITY}
                                    <span className="block text-xs font-bold text-primary">
                                        {elem.humidity} {Measurements.PERCENTAGE}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-md leading-tight text-primary/70 lg:text-lg">
                                    {WeatherConditions.RAIN}
                                    <span className="block text-xs font-bold text-primary">
                                        {elem.percipitation} {Measurements.MILLIMETER}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-md leading-tight text-primary/70 lg:text-lg">
                                    {WeatherConditions.BAROMETER}
                                    <span className="block text-xs font-bold text-primary">
                                        {elem.barometer} {Measurements.PRESSURE}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}