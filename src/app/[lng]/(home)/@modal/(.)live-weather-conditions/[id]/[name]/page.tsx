import { StationParamsUrlProp } from "@/types";
import LiveWeatherConditionsModalPage from "./page.client";
import { FetchLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherDara";
import { timer } from "@/helpers/general";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    searchParams: StationParamsUrlProp
};
const LOADING_TIME = 600;

export const dynamic = "force-dynamic";
export const runtime = "edge";


export default async function LiveWeatherConditionsModal({ params, searchParams }: StationPageProps) {
    const { id, lng } = params;
    const isForecastEnabled = !!searchParams.isForecastEnabled || false;

    const { weatherData } = await FetchLiveWeatherStationData({
        lng,
        stationId: +id,
        isForecastEnabled,
    });

    await timer(LOADING_TIME);

    return (
        <LiveWeatherConditionsModalPage 
            params={params} 
            weatherData={weatherData}
        ></LiveWeatherConditionsModalPage>
    );
}