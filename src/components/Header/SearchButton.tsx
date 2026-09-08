"use client";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useT } from "@/i18n/client";
import { usePathname } from "next/navigation";

export default function SearchButton() {
    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;
    const pathname = usePathname();

    return (
        <Link
            href={`/${selectedLanguage}/search?from=${encodeURIComponent(pathname)}`}
            scroll={false}
        >
            <MagnifyingGlassCircleIcon className="size-5 fill-primary" />
        </Link>
    );
}
