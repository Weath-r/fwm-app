"use client";

import Image from "next/image";
import HeaderMenu from "./HeaderMenu";
import MobileHeaderMenu from "./MobileHeaderMenu";
import Link from "next/link";

export default function Header() {
    return (<header className="border-b-1 border-solid border-gray bg-white">
        <div className="container mx-auto flex h-full">
            <Link href={"/"} className="my-auto px-4">
                <Image
                    src="/assets/myweathr.png"
                    className="m:w-60 h-full w-48 object-contain"
                    width={200}
                    height={200}
                    alt="FWM - Your weather application for Central Greece"
                />
                <p className="mt-2 text-sm text-primary">
                    Weather conditions for Central Greece
                </p>
            </Link>
            <div className="my-auto ml-auto hidden justify-between md:flex">
                <HeaderMenu></HeaderMenu>
            </div>
            <div className="z-10 mt-10 w-full md:hidden">
                <MobileHeaderMenu></MobileHeaderMenu>
            </div>
        </div>
    </header>);
}