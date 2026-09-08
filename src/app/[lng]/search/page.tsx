import SearchPageClient from "./page.search";
import { getCachedSearchStationsData } from "@/components/SearchPage/helpers/fetchSearchStationsData";
import { getT } from "@/i18n";

type SearchPageProps = {
    params: Promise<{
        id: string;
        name: string;
        lng: string;
    }>;
};
export async function generateMetadata(props: SearchPageProps) {
    const params = await props.params;
    const { t } = await getT("pages");

    return {
        title: t("search.title"),
        description: t("search.description"),
        alternates: {
            canonical: `/${params.lng}/search`,
            languages: {
                en: `/en/search`,
                el: `/el/search`,
                "x-default": `/en/search`,
            },
        },
    };
}

export default async function SearchPageView() {
    const { t } = await getT("search");
    const structuredData = await getCachedSearchStationsData();
    return (
        <section className="mx-auto container p-4">
            <h2 className="text-2xl font-bold text-primary">{t("pageTitle")}</h2>
            <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
                <SearchPageClient data={structuredData} />
            </div>
        </section>
    );
}
