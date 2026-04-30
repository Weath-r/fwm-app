/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "next/og";
import { Measurements } from "@/types";
import { assetUrl } from "@/helpers/assetsHandling";
import { getT } from "@/i18n";

type CurrentWeatherShareableCardProps = {
    stationName: string;
    weatherDescription: string;
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    weatherIcon: string;
};
export async function CurrentWeatherShareableCard(props: CurrentWeatherShareableCardProps) {
    const {
        stationName,
        weatherDescription,
        temperature,
        humidity,
        precipitation,
        windSpeed,
        weatherIcon,
    } = props;

    const imagePath = assetUrl(weatherIcon);
    const { t } = await getT("shareableCards", { keyPrefix: "currentWeather" });

    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#3D5361",
            }}
        >
            <div tw="flex flex-col w-full p-8 text-white">
                <div tw="flex gap-2 justify-between items-center">
                    <div tw="flex flex-col">
                        <h1 tw="text-6xl font-bold flex flex-col items-start">
                            <span tw="uppercase text-lg">{t("title")}</span>
                            <span>{stationName}</span>
                        </h1>
                        <img
                            alt={weatherDescription}
                            src={imagePath}
                            style={{ height: "380px", width: "380px", objectFit: "contain" }}
                        />
                    </div>
                    <div tw="flex flex-col">
                        <h2 tw="text-9xl font-bold">
                            {temperature}
                            {Measurements.CELCIUS}
                        </h2>
                        <h4 tw="text-3xl mt-4 flex ml-auto">
                            <span tw="">
                                {windSpeed}
                                {Measurements.SPEED}
                            </span>
                            <span tw="ml-2 border-l-2 border-white pl-2">
                                {humidity}
                                {Measurements.PERCENTAGE}
                            </span>
                            <span tw="ml-2 border-l-2 border-white pl-2">
                                {precipitation}
                                {Measurements.MILLIMETER}
                            </span>
                        </h4>
                    </div>
                </div>

                <div tw="flex ml-auto mt-auto text-2xl">
                    <p>Powered by MyWeathr.com</p>
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        }
    );
}
