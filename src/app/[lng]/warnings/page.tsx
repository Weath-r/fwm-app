import ClientPageWarnings from "./page.client";
import { getT } from "@/i18n";

export async function generateMetadata() {
    const { t, i18n } = await getT("pages");
    const keywords_en = [
        "weather warnings Greece", 
        "Greece weather alerts",
        "severe weather Greece",
        "storm alerts Greece",
        "extreme weather warnings Greece",
        "Central Greece alerts",
        "weather warnings Central Greece",
        "severe weather Central Greece",
        "storm alerts Cental Greece",
        "extreme weather warnings Central Greece",
        "alerts MyWeathr"
    ];
    const keywords_el = [
        "προειδοποιήσεις καιρού Ελλάδα",
        "ειδοποιήσεις καιρού Στερεά Ελλάδα",
        "ακραία φαινόμενα Ελλάδα",
        "καταιγίδες Ελλάδα",
        "ακραία φαινόμενα Στερεά Ελλάδα",
        "καταιγίδες Στερεά Ελλάδα",
        "alerts MyWeathr"
    ];
    return {
        title: t("warnings.title"),
        description: t("warnings.description"),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
    };
};

export default function Warnings() {
    return <ClientPageWarnings></ClientPageWarnings>;
}