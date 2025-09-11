import { usePathname, useRouter, useParams } from "next/navigation";
import configuration from "@/app/appConfig";

export default function HeaderChangeLanguageMenu() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const { lng } = params;
    const changeLanguage = (newLanguage: string) => {
        const currentLng = Array.isArray(lng) ? lng[0] : lng;
        const redirectionPath = pathname.replace(currentLng, newLanguage);
        router.push(redirectionPath);
    };

    return (
        <section className="flex gap-2">
            {configuration.languages.map((lang) => (
                <button
                    className={`text-sm text-primary ${params.lng === lang.id ? "font-bold text-success" : ""}`}
                    key={lang.id}
                    onClick={() => changeLanguage(lang.id)}
                >
                    {lang.name}
                </button>
            ))}
        </section>
    );
}