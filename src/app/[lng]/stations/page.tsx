import ClientPageStations from "./page.client";
import { getT } from "@/i18n";

export async function generateMetadata() {
    const { t, i18n } = await getT("pages");
    const keywords_en = [
        "weather stations Greece",
        "weather stations Central Greece",
        "live weather data Greece",
        "real-time weather stations",
        "weather monitoring Greece"
    ];
    const keywords_el = [
        "μετεωρολογικοί σταθμοί Ελλάδα",
        "σταθμοί καιρού Στερεά Ελλάδα",
        "ζωντανά δεδομένα καιρού",
        "real-time weather Greece", 
        "σταθμοί MyWeathr"
    ];
    return {
        title: t("stations.title"),
        description: t("stations.description"),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
    };
};

export default function Stations() {
    return <ClientPageStations></ClientPageStations>;
}
