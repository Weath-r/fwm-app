import { useConfigurationStore } from "@/stores/configurationStore";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgInline from "../Common/SvgInline";
import { useT } from "@/i18n/client";
import { calculateActiveClass } from "@/helpers/internationalization";
import HeaderChangeLanguageMenu from "./HeaderChangeLanguageMenu";

export default function MobileHeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();
    
    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;

    return (
        <NavigationMenu.Root className="relative z-10 flex w-full justify-end pr-4">
            	<NavigationMenu.List className="center m-0 flex list-none">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger 
                        className="flex items-center font-bold text-primary">
                        <SvgInline path="/icons/menu.svg" className="w-5 fill-primary"></SvgInline>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content 
                        className="absolute left-[-4px] top-10 w-full rounded-md bg-white p-4 shadow-2xl sm:w-auto"
                    >
                        <ul className="m-0 flex list-none flex-col sm:w-[500px]">
                            {menu.map((elem) => (
                                <li 
                                    className="grid"
                                    key={elem.text}
                                >
                                    <NavigationMenu.Link asChild>
                                        <Link
                                            className={`text-md p-2 pl-0 text-primary ${
                                                calculateActiveClass(pathname, elem.pathName, selectedLanguage) ? "font-bold text-success" : ""
                                            }`}
                                            href={`/${selectedLanguage}/${elem.pathName}`}
                                        >
                                            {i18n.getFixedT(selectedLanguage, "common")(elem.value)}
                                        </Link>
                                    </NavigationMenu.Link>
                                </li>
                            ))}
                            <li className="mb-2 border-t-2 border-light_white pt-2">
                                <HeaderChangeLanguageMenu></HeaderChangeLanguageMenu>
                            </li>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Viewport />
        </NavigationMenu.Root>
    );
}
