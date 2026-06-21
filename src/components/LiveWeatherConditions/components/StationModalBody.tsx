"use client";
import { WeatherData, Measurements, WeatherConditions } from "@/types";
import { useT } from "@/i18n/client";
import SvgInline from "@/components/Common/SvgInline";
import { windDirectionCalc } from "@/helpers/windDirectionCalculator";

type StationMetricsProps = WeatherData & {
    variant?: "page" | "modal";
};

type Metric = {
    key: string;
    icon: string;
    rotate?: number;
    value: number;
    unit: string;
    label: string;
};

export function StationModalBody({ variant = "page", ...elem }: Readonly<StationMetricsProps>) {
    const { i18n } = useT("weather_conditions");
    const selectedLanguage = i18n.language;
    const translateCondition = i18n.getFixedT(selectedLanguage, "weather_conditions");
    const windDirectionLabel = i18n.getFixedT(
        selectedLanguage,
        "weather_conditions",
        "windDir"
    )(windDirectionCalc(elem.winddir));

    const isPage = variant === "page";

    const metrics: Metric[] = [
        {
            key: "wind",
            icon: "/weather_icons/v2/wind.svg",
            rotate: elem.winddir,
            value: elem.windspd,
            unit: Measurements.SPEED,
            label: `${windDirectionLabel} ${translateCondition(WeatherConditions.WIND.toLowerCase())}`,
        },
        {
            key: "humidity",
            icon: "/weather_icons/v2/humidity.svg",
            value: elem.humidity,
            unit: Measurements.PERCENTAGE,
            label: translateCondition(WeatherConditions.HUMIDITY.toLowerCase()),
        },
        {
            key: "rain",
            icon: "/weather_icons/v2/rain.svg",
            value: elem.percipitation,
            unit: Measurements.MILLIMETER,
            label: translateCondition(WeatherConditions.RAIN.toLowerCase()),
        },
        {
            key: "pressure",
            icon: "/weather_icons/v2/barometer.svg",
            value: elem.barometer,
            unit: Measurements.PRESSURE,
            label: translateCondition(WeatherConditions.BAROMETER.toLowerCase()),
        },
    ];

    return (
        <div
            className={`relative z-10 grid grid-cols-4 ${
                isPage ? "mx-4 mt-[-34px] gap-2.5" : "mx-3 mt-[-32px] gap-2"
            }`}
        >
            {metrics.map((metric, index) => (
                <div
                    key={metric.key}
                    className="lw-pill flex flex-col items-center gap-1 rounded-[14px] border border-white/90 bg-white/85 px-2 py-3 shadow-[0_14px_30px_-16px_rgba(43,61,73,.55)] backdrop-blur-md"
                    style={{ animationDelay: `${index * 0.04}s` }}
                >
                    <span
                        className={`lw-metric-tile mb-0.5 ${isPage ? "size-[38px]" : "size-[34px]"}`}
                    >
                        <span className={`block ${isPage ? "size-[23px]" : "size-[21px]"}`}>
                            <SvgInline
                                path={metric.icon}
                                title={metric.label}
                                className="fill-primary"
                                style={
                                    metric.rotate != null
                                        ? { transform: `rotate(${metric.rotate + 180}deg)` }
                                        : undefined
                                }
                            />
                        </span>
                    </span>
                    <span className="text-base font-extrabold text-primary">
                        {metric.value}
                        <span className="ml-0.5 text-[11px] font-semibold text-gray">
                            {metric.unit}
                        </span>
                    </span>
                    <span className="text-center text-[10px] font-bold uppercase tracking-wide text-gray">
                        {metric.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
