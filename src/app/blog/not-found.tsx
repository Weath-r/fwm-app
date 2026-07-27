import Link from "next/link";

export default function BlogNotFound() {
    return (
        <main className="container mx-auto flex flex-col items-center gap-4 px-4 py-24 text-center">
            <h1 className="text-3xl font-bold text-primary">Το άρθρο δεν βρέθηκε</h1>
            <p className="text-primary/60">
                Το άρθρο που αναζητήσατε δεν υπάρχει ή έχει αφαιρεθεί.
            </p>
            <Link
                href="/blog"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent/90"
            >
                Επιστροφή στο Blog
            </Link>
        </main>
    );
}
