"use client";
import Image from "next/image";
import appLogo from "@/assets/logos/myweathr.png";
import HeaderMenu from "./HeaderMenu";
import MobileHeaderMenu from "./MobileHeaderMenu";

export default function Header() {
    return (<header className="border-b-1 border-solid border-gray bg-white">
        <div className="container mx-auto flex h-full">
            <div className="my-auto px-4">
                <Image
                    src={appLogo}
                    className="m:w-60 h-full w-48 object-contain"
                    alt="FWM - Your weather application for Central Greece"
                />
                <p className="mt-2 text-sm text-primary">
                    Weather conditions for Central Greece
                </p>
            </div>
            <div className="my-auto ml-auto hidden justify-between md:flex">
                <HeaderMenu></HeaderMenu>
            </div>
            <div className="z-10 mt-10 flex w-2/3 flex-col items-center md:hidden">
                <MobileHeaderMenu></MobileHeaderMenu>
            </div>
        </div>
    </header>);
}