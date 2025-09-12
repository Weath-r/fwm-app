import FthiotidaForecastClientPage from "./page.client";
import { getT } from "@/i18n";

export async function generateMetadata() {
    const { t, i18n } = await getT("pages");
    const keywords_en = [
        "Fthiotida weather forecast",
        "Lamia weather",
        "Lamia weather forecast",
        "Lamia weather app",
        "weather tommorow Lamia",
        "Central Greece weather forecast",
        "weather tommorow Fthiotis region",
        "Stylida weather",
        "Stylida weather app",
        "Stylida weather forecast",
        "weather tommorow Stylida",
        "Atalanti weather",
        "Atalanti weather app",
        "Atalanti weather forecast",
        "weather tommorow Atalanti",
        "Parnassos weather",
        "Parnassos weather app",
        "Parnassos weather forecast",
        "weather tommorow Parnassos"
    ];
    const keywords_el = [
        "καιρός Φθιώτιδα",
        "πρόγνωση καιρού Λαμία", 
        "εφαρμογή καιρού Λαμία",
        "καιρός αύριο Φθιώτιδα",
        "καιρός Στυλίδα",
        "πρόγνωση καιρού Στυλίδα", 
        "εφαρμογή καιρού Στυλίδα",
        "καιρός αύριο Στυλίδα",
        "καιρός Ράχες",
        "πρόγνωση καιρού Ράχες", 
        "εφαρμογή καιρού Ράχες",
        "καιρός αύριο Ράχες",
        "καιρός Αταλάντη",
        "πρόγνωση καιρού Αταλάντη", 
        "εφαρμογή καιρού Αταλάντη",
        "καιρός αύριο Αταλάντη",
        "καιρός Παρνασσός",
        "πρόγνωση καιρού Παρνασσός", 
        "εφαρμογή καιρού Παρνασσός",
        "καιρός αύριο Παρνασσός"
    ];
    return {
        title: t("fthiotidaForecast.title"),
        description: t("fthiotidaForecast.description"),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
    };
};

export default function Warnings() {
    return (
        <FthiotidaForecastClientPage></FthiotidaForecastClientPage>
    );
}
