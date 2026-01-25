"use client";
import { useT } from "@/i18n/client";
import { StationPageMessages, LoadingMessages } from "@/types";
import { randomIndexFromArray } from "@/helpers/general";
import { useState } from "react";

export default function StationPageLoading() {
    const { i18n } = useT("common");
    const language = i18n.language;
    const weatherMessages: LoadingMessages = {
        en: StationPageMessages.en,
        el: StationPageMessages.el,
    };

    const [randomIndex] = useState(() => randomIndexFromArray(weatherMessages[language]));

    return (
        <div className="h-screen w-screen mx-auto">
            <div className="flex h-[260px] w-full items-center justify-center">
                <h3 className="my-2 font-semibold text-primary">
                    {weatherMessages[language][randomIndex]}
                </h3>
            </div>
        </div>
    );
}
