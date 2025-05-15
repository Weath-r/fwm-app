import { useConfigurationStore } from "@/stores/configurationStore";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgInline from "../Common/SvgInline";

export default function MobileHeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();

    return (
        <NavigationMenu.Root className="relative z-10 flex w-full justify-end pr-4">
            	<NavigationMenu.List className="center 
                 m-0 flex list-none">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger 
                        className="flex items-center font-bold text-primary">
                        <SvgInline path="/icons/menu.svg" className="w-5 fill-primary"></SvgInline>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content 
                        className="absolute left-[-4px] top-10 w-full rounded-md bg-white p-4 shadow-2xl sm:w-auto"
                    >
                        <ul className="one m-0 grid list-none gap-x-2.5 sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                            {menu.map((elem) => (
                                <li 
                                    className="grid"
                                    key={elem.text}
                                >
                                    <NavigationMenu.Link asChild>
                                        <Link
                                            className={`text-md p-2 pl-0 text-primary ${
                                                pathname === elem.pathName ? "font-bold text-success" : ""
                                            }`}
                                            href={elem.pathName}
                                        >
                                            {elem.text}
                                        </Link>
    
                                    </NavigationMenu.Link>
                                </li>
                            ))}

                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Viewport />
        </NavigationMenu.Root>
    );
}
