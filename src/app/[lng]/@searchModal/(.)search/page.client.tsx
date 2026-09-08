"use client";
import { Dialog, DialogContent } from "@/components/Common/CommonDialog";
import SearchPageClient from "@/app/[lng]/search/page.search";
import { CloseModalButton } from "@/components/LiveWeatherConditions/buttons/CloseModalButton";
import { StationSearchItem } from "@/types";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useT } from "@/i18n/client";

type SearchPageProps = {
    params: {
        lng: string;
    };
    data: StationSearchItem[];
};

export default function SearchModalPage({ params, data }: SearchPageProps) {
    const { i18n } = useT("search");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dialogTitle = (
        <div className="text-sm font-bold uppercase text-primary">
            {i18n.getFixedT(params.lng, "search")("pageTitle")}
        </div>
    );
    const [open, setOpen] = useState(true);
    const [lastPathname, setLastPathname] = useState(pathname);

    const fromParam = searchParams.get("from");
    const returnUrl =
        fromParam && fromParam.startsWith("/") && !fromParam.startsWith("//")
            ? fromParam
            : `/${params.lng}`;

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
    };

    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setOpen(pathname === `/${params.lng}/search`);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                scrollable
                dialogTitle={dialogTitle}
                closeModalButton={<CloseModalButton returnUrl={returnUrl} />}
                onClose={() => {
                    setOpen(false);
                    router.push(returnUrl);
                }}
            >
                <SearchPageClient data={data} />
            </DialogContent>
        </Dialog>
    );
}
