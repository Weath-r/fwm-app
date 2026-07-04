import configuration from "@/app/appConfig";
import ClientPageStations from "./page.client";
import { getT } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }) {
    const { lng } = await params;
    const { t, i18n } = await getT("pages");
    const keywords_en = [
        "weather stations Central Greece",
        "weather stations Greece",
        "all weather stations Greece",
        "live weather data Greece",
        "real-time weather stations",
        "personal weather stations Greece",
        "weather monitoring Central Greece",
        "MyWeathr stations",
    ];
    const keywords_el = [
        "μετεωρολογικοί σταθμοί Στερεά Ελλάδα",
        "μετεωρολογικοί σταθμοί Ελλάδα",
        "όλοι οι σταθμοί καιρού",
        "ζωντανά δεδομένα καιρού",
        "ιδιωτικοί μετεωρολογικοί σταθμοί",
        "παρακολούθηση καιρού Στερεά Ελλάδα",
        "σταθμοί MyWeathr",
    ];
    return {
        title: t("stations.title"),
        description: t("stations.description"),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
        alternates: {
            canonical: `/${lng}/stations`,
            languages: {
                en: "/en/stations",
                el: "/el/stations",
                "x-default": "/en/stations",
            },
        },
        openGraph: {
            title: t("stations.title"),
            description: t("stations.description"),
            url: `${configuration.metadata.site_url}/${lng}/stations`,
            type: "website",
        },
    };
}

export default function Stations() {
    return <ClientPageStations></ClientPageStations>;
}
