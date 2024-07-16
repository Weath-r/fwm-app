"use client";
import Image from "next/image";
import appLogo from "@/assets/logos/myweathr.png";
import configuration from "@/app/appConfig";
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
            <div className="m:w-full">
                <form style={{ display: (configuration.searchBarToggle ? "block" : "none") }}>   
                    <label className="text-gray-900 sr-only mb-2 text-sm font-medium">
                        Search
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="size-4 text-primary dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="text-gray-900 border-gray-300 bg-gray-50 dark:border-gray-600 dark:placeholder:text-gray-400 block w-full rounded-lg border p-4 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-secondary dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search weather stations..." required />
                        <button type="submit" className="absolute bottom-2.5 right-2.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </header>);
}