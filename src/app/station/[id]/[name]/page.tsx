import StationPage from "@/components/StationPage/StationPage";
import { DataService } from "@/services/DataService";
import { properStationName } from "@/helpers/createStationName";

type StationPageProps = {
    params: {
        id: string;
        name: string;
    }
};

export async function generateMetadata({ params }: StationPageProps) {
    const stationName = properStationName(params.name);
    
    return {
        title: `myWEATHR.com - ${stationName} Weather Station - Live Updates`,
        description: `Current weather at ${stationName}. Live weather updates for ${stationName}.`,
        keywords: `${stationName} weather, ${stationName} weather station, live weather ${stationName}, real-time weather ${stationName}, personal weather station, weather station, weather data, weather forecast, rainfall`,
    };
}

export default async function StationPageView({ params }: StationPageProps) {
    const dataService = new DataService();
    const end_date = "$NOW";
    const start_date = "$NOW(-1 month)";
    const currentWeather = await dataService.fetchWeatherDataByStationPaginated({
        station_id: +params.id,
        start_date,
        end_date,
        page: 1,
        limit: -1,
    });

    return (
        <>
            <StationPage params={params} weatherData={currentWeather} />
        </>
    );
}