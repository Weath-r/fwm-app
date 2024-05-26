import Link from "next/link";
import { usePathname } from "next/navigation";
import menu from "@/helpers/menuLinks";

export default function HeaderMenu() {
    const pathname = usePathname();
    
    return (<section>
        {menu.map(element => 
            <Link
                className={`text-primary px-2 text-lg ${pathname === element.pathName ? "font-bold text-accent" : ""}`}
                href={element.pathName}
                key={element.text}
            >
                {element.text}
            </Link>
        )}
    </section>
    );
}