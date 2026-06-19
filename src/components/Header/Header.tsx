"use client";

import Image from "next/image";
import HeaderMenu from "./HeaderMenu";
import MobileHeaderMenu from "./MobileHeaderMenu";
import Link from "next/link";
import { useT } from "@/i18n/client";

export default function Header() {
    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;

    return (
        <header className="border-b-1 border-solid border-gray bg-white">
            <div className="container mx-auto flex h-full">
                <Link href={`/${selectedLanguage}/`} className="my-auto px-4">
                    <Image
                        src="/assets/logo.png"
                        className="h-full w-60"
                        width={280}
                        height={200}
                        alt={i18n.getFixedT(selectedLanguage, "common")("logoTitle")}
                        title={i18n.getFixedT(selectedLanguage, "common")("logoTitle")}
                        priority={true}
                    />
                </Link>
                <div className="my-auto ml-auto hidden justify-between md:flex">
                    <HeaderMenu></HeaderMenu>
                </div>
                <div className="z-10 mt-10 w-full md:hidden">
                    <MobileHeaderMenu></MobileHeaderMenu>
                </div>
            </div>
        </header>
    );
}
