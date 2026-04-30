import { ShareableCards } from "@/types/enums/shareableCards";
import { CurrentWeatherShareableCard } from "@/components/ShareableCards/CurrentWeatherShareableCard";
import { getT } from "@/i18n";

export async function GET(request: Request, ctx: RouteContext<"/api/[lng]/share-card">) {
    try {
        const { searchParams } = new URL(request.url);
        const cardType = searchParams.get("cardType") ?? ShareableCards.default;
        const { lng } = await ctx.params;
        const { i18n } = await getT("shareableCards", { keyPrefix: "currentWeather" });
        i18n.changeLanguage(lng);

        const urlParamsOptions = {
            stationName: "stationName",
            weatherDescription: "weatherDescription",
            temperature: "temperature",
            humidity: "humidity",
            precipitation: "precipitation",
            weatherIcon: "weatherIcon",
            windSpeed: "windSpeed",
        };
        const urlParams = Object.keys(urlParamsOptions).reduce(
            (acc, key) => {
                const hasKey = searchParams.has(key);
                acc[urlParamsOptions[key as keyof typeof urlParamsOptions]] = hasKey
                    ? searchParams.get(key) || ""
                    : "";
                return acc;
            },
            {} as Record<string, string>
        );

        switch (cardType) {
            case ShareableCards.currentWeather:
                return await CurrentWeatherShareableCard({
                    stationName: urlParams.stationName || "Station Name",
                    weatherDescription: urlParams.weatherDescription || "Sunny",
                    temperature: parseInt(urlParams.temperature) || 25,
                    humidity: parseInt(urlParams.humidity) || 60,
                    precipitation: parseInt(urlParams.precipitation) || 0,
                    weatherIcon: urlParams.weatherIcon || "",
                    windSpeed: parseInt(urlParams.windSpeed) || 10,
                });
            case ShareableCards.forecast:
                // return await ForecastShareableCard();
                break;
            case ShareableCards.weatherWarning:
                // return await WeatherWarningShareableCard();
                break;
            default:
                // return await DefaultShareableCard({ title });
                break;
        }
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
