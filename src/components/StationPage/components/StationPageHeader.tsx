import SvgInline from "@/components/Common/SvgInline";
import Image from "next/image";
import { Measurements, WeatherDataResponse, WeatherConditions } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";


type StationPageHeaderProps = {
    stationCurrentWeather: WeatherDataResponse;
    i18n: any;
    i18n_icons: any;
};

export default function StationPageHeader({ stationCurrentWeather, i18n, i18n_icons }: StationPageHeaderProps) {
    const selectedLanguage = i18n.language;

    return (
        <div className="w-full h-48 rounded-t-lg drop-shadow-md">
            <div className="flex items-center justify-center h-full">
                <Image
                    src="/assets/bg/mountain.webp"
                    alt="Mountain"
                    fill
                    priority
                    className="object-cover object-center rounded-t-lg"
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 text-secondary z-10 w-full">
                <div className="flex items-center justify-between gap-2 w-full px-4 flex-wrap md:flex-nowrap mb-2 md:mb-0">
                    <h2 className="mb-4 text-2xl font-bold">
                        {stationCurrentWeather.weather_station_id.name}
                        <div className="text-sm capitalize">
                            {i18n_icons.getFixedT(selectedLanguage, "weather_icons")(stationCurrentWeather.weather_condition.toLowerCase())}
                        </div>
                        <small className="block text-xs font-medium text-secondary/75">
                            {i18n.getFixedT(selectedLanguage, "stationModal")("lastUpdated")} {timeFromNowUtil(stationCurrentWeather.date_created)}
                        </small>
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/temperature.svg"
                                    title="Humidity icon"
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.temperature} {Measurements.CELCIUS}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/wind.svg"
                                    title={i18n.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.WIND.toLowerCase())}
                                    className="fill-secondary"
                                    style={{
                                        transform: `rotate(${stationCurrentWeather.winddir}deg)`,
                                    }}
                                />
                            </div>
                            {stationCurrentWeather.windspd}{Measurements.SPEED}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/humidity.svg"
                                    title="Humidity icon"
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.humidity}{Measurements.PERCENTAGE}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/rain.svg"
                                    title="Rain icon"
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.percipitation} {Measurements.MILLIMETER}
                        </div>
                        <div className="text-sm flex flex-col items-center">
                            <div className="size-8">
                                <SvgInline
                                    path="/weather_icons/v2/barometer.svg"
                                    title="Barometer icon"
                                    className="fill-secondary"
                                />
                            </div>
                            {stationCurrentWeather.barometer} {Measurements.PRESSURE}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}