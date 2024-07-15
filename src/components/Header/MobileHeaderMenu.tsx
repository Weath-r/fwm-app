import { Menu } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConfigurationStore } from "@/stores/configurationStore";
import SvgInline from "../Common/SvgInline";

export default function MobileHeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();

    return (
        <Menu>
            <Menu.Button className="text-primary font-bold"> 
                <SvgInline 
                    path="icons/menu.svg"
                    className="w-6 fill-primary"
                ></SvgInline>
            </Menu.Button>
            <Menu.Items className="flex flex-col gap-1 bg-white shadow-lg px-4 rounded-b mt-6 mr-4 w-full pb-2 border-solid border-t-2 border-accent">
                <Menu.Item>
                    <h3 className="text-sm text-primary opacity-50 uppercase my-2">Menu</h3>
                </Menu.Item>
                {menu.map(elem =>
                    <Menu.Item key={elem.text}>
                        <Link
                            className={`text-primary p-1 pl-0 text-md ${pathname === elem.pathName ? "font-bold text-success" : ""}`}
                            href={elem.pathName}
                        >
                            {elem.text}
                        </Link>
                    </Menu.Item>
                )}
            </Menu.Items>
        </Menu>
    );
}