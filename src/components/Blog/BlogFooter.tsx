import Link from "next/link";

export default function BlogFooter() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="border-t border-gray/30 bg-white">
            <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-8 text-center md:flex-row md:justify-between md:text-left">
                <div className="flex items-center gap-2 text-sm text-primary/50">
                    © {currentYear} myWeathr — Καιρός για την Κεντρική Ελλάδα
                </div>
                <div className="flex gap-5 text-sm text-primary/50">
                    <Link href="/el" className="hover:text-primary">
                        Αρχική
                    </Link>
                    <Link href="/el/weather-map" className="hover:text-primary">
                        Χάρτης Καιρού
                    </Link>
                    <Link href="/el/warnings" className="hover:text-primary">
                        Προειδοποιήσεις
                    </Link>
                    <Link href="/blog" className="hover:text-primary">
                        Blog
                    </Link>
                </div>
            </div>
        </footer>
    );
}
