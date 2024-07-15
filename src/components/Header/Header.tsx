"use client";
import Image from "next/image";
import appLogo from "@/assets/logos/myweathr.png";
import configuration from "@/app/appConfig";
import HeaderMenu from "./HeaderMenu";
import MobileHeaderMenu from "./MobileHeaderMenu";

export default function Header() {
    return (<header className="bg-white border-solid border-b-1 border-gray">
        <div className="flex h-full container mx-auto">
            <div className="px-4 my-auto">
                <Image
                    src={appLogo}
                    className="object-contain h-full w-48 m:w-60"
                    alt="FWM - Your weather application for Central Greece"
                />
                <p className="text-primary text-sm mt-2">
                    Weather conditions for Central Greece
                </p>
            </div>
            <div className="justify-between ml-auto my-auto hidden md:flex">
                <HeaderMenu></HeaderMenu>
            </div>
            <div className="md:hidden z-[2] flex flex-col w-2/3 mt-10 items-center">
                <MobileHeaderMenu></MobileHeaderMenu>
            </div>
            <div className="m:w-full">
                <form style={{ display: (configuration.searchBarToggle ? "block" : "none") }}>   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-primary dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-secondary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search weather stations..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </header>);
}