import { ExportedWeatherData } from "@/types";
import SvgInline from "@/components/Common/SvgInline";

export function StationWeatherDetails(elem: Readonly<ExportedWeatherData>) {
    return (
        <div className="my-2">
            <h4 className="font-bold text-lg my-2">Details</h4>
            <div className="bg-info rounded-2xl p-4">
                <div className="flex items-center justify-around">
                    <div className="flex items-center w-[100px]">
                        <div className="h-6 w-6">
                            <SvgInline
                                path="weather_icons/humidity.svg"
                                title="Humidity icon"
                                className="fill-white"
                            />
                        </div>
                        <p className="text-sm text-white leading-tight ml-2">
                            Humidity
                            <span className="block font-bold text-xs">{elem.humidity}%</span>
                        </p>
                    </div>
                    <div className="flex items-center w-[100px]">
                        <div className="h-6 w-6">
                            <SvgInline
                                path="weather_icons/barometer.svg"
                                className="fill-white"
                                title="Barometer icon"
                            />
                        </div>
                        <p className="text-sm text-white leading-tight ml-2">
                            Barometer
                            <span className="block font-bold text-xs">{elem.barometer} hPa</span>
                        </p>
                    </div>
                </div>
                <div className="border-[0.5px] border-white h-[1px] my-4"></div>
                <div className="flex items-center justify-around">
                    <div className="flex items-center w-[100px]">
                        <div className="h-4 w-6">
                            <SvgInline
                                path="weather_icons/wind.svg"
                                title="Wind icon"
                                className="fill-white"
                                style={{
                                    transform: `rotate(${elem.winddir}deg)`,
                                }}
                            />
                        </div>
                        <p className="text-sm text-white leading-tight ml-2">
                            Wind
                            <span className="block font-bold text-xs">{elem.windspd} km/h</span>
                        </p>
                    </div>
                    <div className="flex items-center w-[100px]">
                        <div className="h-6 w-6">
                            <SvgInline
                                path="weather_icons/rain.svg"
                                title="Rain icon"
                                className="fill-white"
                            />
                        </div>
                        <p className="text-sm text-white leading-tight ml-2">
                            Rain
                            <span className="block font-bold text-xs">{elem.percipitation} mm</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
