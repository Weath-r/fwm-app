"use client";
import { useT } from "@/i18n/client";
import { useEffect, useState } from "react";
import { CloseSearchModalButton } from "@/components/SearchPage/buttons/CloseSearchModalButton";
import SearchContent from "@/components/SearchPage/SearchContent";
import { getCachedSearchStationsData } from "@/components/SearchPage/helpers/fetchSearchStationsData";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Common/CommonDialog";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { StationSearchItem } from "@/types/search";
import { usePathname, useSearchParams } from "next/navigation";

export default function SearchButton() {
    const { i18n } = useT("search");
    const language = i18n.language;
    const dialogTitle = (
        <div className="text-sm font-bold uppercase text-primary">
            {i18n.getFixedT(language, "search")("pageTitle")}
        </div>
    );
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [lastPathname, setLastPathname] = useState(pathname);
    const [lastSearchParams, setLastSearchParams] = useState(searchParams.toString());

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
    };
    const [structuredData, setStructuredData] = useState<StationSearchItem[]>([]);

    useEffect(() => {
        getCachedSearchStationsData().then((data) => {
            setStructuredData(data);
        });
    }, []);

    if (open && (pathname !== lastPathname || searchParams.toString() !== lastSearchParams)) {
        setLastPathname(pathname);
        setLastSearchParams(searchParams.toString());
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <MagnifyingGlassCircleIcon className="size-5 fill-primary" />
            </DialogTrigger>
            <DialogContent
                scrollable
                dialogTitle={dialogTitle}
                closeModalButton={<CloseSearchModalButton onClose={() => setOpen(false)} />}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <SearchContent data={structuredData} />
            </DialogContent>
        </Dialog>
    );
}
