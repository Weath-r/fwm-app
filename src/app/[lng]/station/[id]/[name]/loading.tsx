import { headers } from "next/headers";
import { StationPageMessages, LoadingMessages } from "@/types";
import { headerName, fallbackLng } from "@/i18n/settings";
import { randomIndexFromArray } from "@/helpers/general";


export default async function StationPageLoading() {

    const headerList = await headers();
    const language = headerList.get(headerName) ?? fallbackLng;

    const weatherMessages: LoadingMessages = {
        en: StationPageMessages.en,
        el: StationPageMessages.el,
    };

    const randomIndex = randomIndexFromArray(weatherMessages[language]);

    return <div className="h-screen w-screen">
        <div className="flex h-[260px] w-full items-center justify-center">
            <h3 className="my-2 font-semibold text-primary">
                {weatherMessages[language][randomIndex]}
            </h3>
        </div>
    </div>;
}