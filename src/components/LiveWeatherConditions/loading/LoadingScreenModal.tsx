"use client";
import { StationPageMessages, LoadingMessages } from "@/types";
import { randomIndexFromArray } from "@/helpers/general";
import { useT } from "@/i18n/client";
import { useState } from "react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/Common/CommonDialog";

export default function LoadingScreenModal() {
    const { i18n } = useT("common");
    const language = i18n.language;
    const weatherMessages: LoadingMessages = {
        en: StationPageMessages.en,
        el: StationPageMessages.el,
    };

    const [randomIndex] = useState(() => randomIndexFromArray(weatherMessages[language]));

    return (
        <Dialog open defaultOpen>
            <DialogTrigger className="sr-only">Dialog trigger</DialogTrigger>
            <DialogContent dialogTitle="">
                <div className="size-full">
                    <div className="flex h-[260px] w-full items-center justify-center">
                        <h3 className="my-2 font-semibold text-primary">
                            {weatherMessages[language][randomIndex]}
                        </h3>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
