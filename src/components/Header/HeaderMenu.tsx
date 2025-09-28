import { useConfigurationStore } from "@/stores/configurationStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/i18n/client";
import { calculateActiveClass } from "@/helpers/internationalization";
import HeaderChangeLanguageMenu from "./HeaderChangeLanguageMenu";

export default function HeaderMenu() {
    const pathname = usePathname();
    const { menu } = useConfigurationStore();
    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;

    return (
        <section className="flex items-center">
            {menu.map((element) => (
                <Link
                    className={`px-2 text-lg text-primary ${
                        calculateActiveClass(pathname, element.pathName, selectedLanguage)
                            ? "font-bold text-success"
                            : ""
                    }`}
                    href={`/${selectedLanguage}/${element.pathName}`}
                    key={element.text}
                >
                    {i18n.getFixedT(selectedLanguage, "common")(element.value)}
                </Link>
            ))}
            <div className="mr-2 border-l-2 border-light_white pl-2 align-middle">
                <HeaderChangeLanguageMenu></HeaderChangeLanguageMenu>
            </div>
        </section>
    );
}
