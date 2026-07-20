import StationPage from "@/components/StationPage/StationPage";
import { getCachedStationPageData } from "@/components/StationPage/helpers/fetchStationPageData";
import { properStationName } from "@/helpers/createStationName";
import { getT } from "@/i18n";
import StationStructuredData from "@/components/Seo/StationStructuredData";
import StationUnavailable from "@/components/StationUnavailable/StationUnavailable";
import configuration from "@/app/appConfig";

type StationPageProps = {
    params: Promise<{
        id: string;
        name: string;
        lng: string;
    }>;
};

export async function generateMetadata(props: StationPageProps) {
    const params = await props.params;
    const stationName = decodeURI(properStationName(params.name));
    const { t, i18n } = await getT("pages");
    const { currentWeather } = await getCachedStationPageData(params.lng, +params.id);

    const keywords_en = [
        `${stationName} weather`,
        `${stationName} weather station`,
        `${stationName} weather history`,
        `historical weather data ${stationName}`,
        `weather graphs ${stationName}`,
        `weather measurements ${stationName}`,
        "personal weather station",
        "historical weather Greece",
    ];
    const keywords_el = [
        `${stationName} καιρός`,
        `${stationName} μετεωρολογικός σταθμός`,
        `ιστορικά δεδομένα καιρού ${stationName}`,
        `γραφήματα καιρού ${stationName}`,
        `μετρήσεις καιρού ${stationName}`,
        "ιστορικά μετεωρολογικά δεδομένα",
        "προσωπικός μετεωρολογικός σταθμός",
    ];

    return {
        title: t("stationIndividual.title", { station: stationName }),
        description: t("stationIndividual.description", { station: stationName }),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
        alternates: {
            canonical: `/${params.lng}/station/${params.id}/${params.name}`,
            languages: {
                en: `/en/station/${params.id}/${params.name}`,
                el: `/el/station/${params.id}/${params.name}`,
                "x-default": `/en/station/${params.id}/${params.name}`,
            },
        },
        openGraph: {
            title: t("stationIndividual.title", { station: stationName }),
            description: t("stationIndividual.description", { station: stationName }),
            url: `${configuration.metadata.site_url}/${params.lng}/station/${params.id}/${params.name}`,
            siteName: t("stationIndividual.title", { station: stationName }),
            locale: i18n.language,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("stationIndividual.title", { station: stationName }),
            description: t("stationIndividual.description", { station: stationName }),
        },
        ...(!currentWeather && { robots: { index: false, follow: false } }),
    };
}

export default async function StationPageView(props: StationPageProps) {
    const params = await props.params;
    const { lng, id, name } = params;

    const result = await getCachedStationPageData(lng, +id);

    if (!result.currentWeather) {
        const { t } = await getT("stationUnavailable");
        return <StationUnavailable lng={lng} t={t} variant="page" />;
    }

    const {
        weatherData,
        currentWeather,
        climateData,
        forecast,
        historicalData,
        frostData,
        environmentalConditions,
    } = result;

    return (
        <>
            <StationStructuredData
                stationId={+id}
                stationName={currentWeather.weather_station_id.name}
                lng={lng}
                routeSegment="station"
                nameSegment={name}
            />
            <StationPage
                params={params}
                weatherData={weatherData}
                climateData={climateData}
                currentWeather={currentWeather}
                forecast={forecast}
                historicalData={historicalData}
                frostData={frostData}
                environmentalConditions={environmentalConditions}
            />
        </>
    );
}
