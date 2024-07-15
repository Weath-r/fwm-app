import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConfigurationStore } from "@/stores/configurationStore";

export default function HeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();
    
    return (<section>
        {menu.map(element => 
            <Link
                className={`text-primary px-2 text-lg ${pathname === element.pathName ? "font-bold text-success" : ""}`}
                href={element.pathName}
                key={element.text}
            >
                {element.text}
            </Link>
        )}
    </section>
    );
}