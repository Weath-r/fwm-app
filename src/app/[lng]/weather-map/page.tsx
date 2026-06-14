import WeatherMap from "./page.weathermap";
import { getT } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }) {
    const { lng } = await params;
    const { t, i18n } = await getT("pages");
    const keywords_en = [
        "weather map Greece",
        "interactive weather map Central Greece",
        "live weather map Greece",
        "meteorological map Greece",
        "real-time weather conditions map",
        "live weather conditions Central Greece",
        "weather forecast map Greece",
        "wind map Greece",
    ];
    const keywords_el = [
        "χάρτης καιρού Ελλάδα",
        "διαδραστικός χάρτης καιρού Στερεά Ελλάδα",
        "ζωντανός χάρτης καιρικών συνθηκών",
        "μετεωρολογικός χάρτης Ελλάδα",
        "χάρτης καιρού Κεντρική Ελλάδα",
        "ζωντανός καιρός χάρτης",
        "real-time weather map Greece",
        "χάρτης ανέμων Ελλάδα",
    ];
    return {
        title: t("weathermap.title"),
        description: t("weathermap.description"),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
        alternates: {
            canonical: `/${lng}/weather-map`,
            languages: {
                en: "/en/weather-map",
                el: "/el/weather-map",
                "x-default": "/en/weather-map",
            },
        },
        openGraph: {
            title: t("weathermap.title"),
            description: t("weathermap.description"),
            url: `https://myweathr.com/${lng}/weather-map`,
            type: "website",
        },
    };
}

export default function Home() {
    return <WeatherMap></WeatherMap>;
}
