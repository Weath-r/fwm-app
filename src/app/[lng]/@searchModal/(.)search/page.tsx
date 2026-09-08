import SearchModal from "./page.client";
import { unstable_noStore as noStore } from "next/cache";
import { getCachedSearchStationsData } from "@/components/SearchPage/helpers/fetchSearchStationsData";

type SearchPageProps = {
    params: Promise<{
        name: string;
        lng: string;
    }>;
};

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function SearchServerPage(props: SearchPageProps) {
    const params = await props.params;
    noStore();
    const data = await getCachedSearchStationsData();

    return <SearchModal params={params} data={data} />;
}
