import LiveWeatherConditionsModalPage from "./page.client";
import { FetchLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherData";
import { unstable_noStore as noStore } from "next/cache";
import { getConfiguration } from "@/services/getConfiguration";

type StationPageProps = {
    params: Promise<{
        id: string;
        name: string;
        lng: string;
    }>;
};

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function LiveWeatherConditionsModal(props: StationPageProps) {
    const params = await props.params;
    noStore();
    const featureFlags = await getConfiguration();
    const isForecastEnabled = featureFlags.forecasts.modalForecast || false;

    const { id, lng } = params;

    const { weatherData, environmentalConditions } = await FetchLiveWeatherStationData({
        lng,
        stationId: +id,
        isForecastEnabled,
    });

    return (
        <LiveWeatherConditionsModalPage
            params={params}
            weatherData={weatherData}
            environmentalConditions={environmentalConditions}
        ></LiveWeatherConditionsModalPage>
    );
}
