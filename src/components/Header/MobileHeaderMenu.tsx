import { useConfigurationStore } from "@/stores/configurationStore";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgInline from "../Common/SvgInline";

export default function MobileHeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();

    return (
        <Menu>
            <Menu.Button className="font-bold text-primary">
                <SvgInline path="/icons/menu.svg" className="w-6 fill-primary"></SvgInline>
            </Menu.Button>
            <Menu.Items className="mr-4 mt-6 flex w-full flex-col gap-1 rounded-b border-t-2 border-solid border-accent bg-white px-4 pb-2 shadow-lg">
                <Menu.Item>
                    <h3 className="my-2 text-sm uppercase text-primary opacity-50">Menu</h3>
                </Menu.Item>
                {menu.map((elem) => (
                    <Menu.Item key={elem.text}>
                        <Link
                            className={`text-md p-1 pl-0 text-primary ${
                                pathname === elem.pathName ? "font-bold text-success" : ""
                            }`}
                            href={elem.pathName}
                        >
                            {elem.text}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
}
