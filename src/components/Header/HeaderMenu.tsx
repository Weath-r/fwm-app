import { useConfigurationStore } from "@/stores/configurationStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();

    return (
        <section>
            {menu.map((element) => (
                <Link
                    className={`px-2 text-lg text-primary ${
                        pathname === element.pathName ? "font-bold text-success" : ""
                    }`}
                    href={element.pathName}
                    key={element.text}
                >
                    {element.text}
                </Link>
            ))}
        </section>
    );
}
