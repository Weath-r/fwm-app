import { StationParamsUrlProp } from "@/types";
import LiveWeatherConditionsModalPage from "./page.client";
import { FetchLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherDara";
import { unstable_noStore as noStore } from "next/cache";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    searchParams: StationParamsUrlProp
};

export const dynamic = "force-dynamic";
export const runtime = "edge";


export default async function LiveWeatherConditionsModal({ params, searchParams }: StationPageProps) {
    noStore();
    const { id, lng } = params;
    const isForecastEnabled = !!searchParams.isForecastEnabled || false;

    const { weatherData } = await FetchLiveWeatherStationData({
        lng,
        stationId: +id,
        isForecastEnabled,
    });

    return (
        <LiveWeatherConditionsModalPage 
            params={params} 
            weatherData={weatherData}
        ></LiveWeatherConditionsModalPage>
    );
}