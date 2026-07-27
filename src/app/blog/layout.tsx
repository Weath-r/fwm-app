import "../globals.css";
import { Commissioner } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Viewport } from "next";
import { ClientProvider } from "@/providers/clientProvider";
import PostHogPageView from "@/app/[lng]/PostHogPageView";
import configuration from "@/app/appConfig";
import BlogFooter from "@/components/Blog/BlogFooter";

const fontFamily = Commissioner({
    subsets: ["greek"],
    weight: ["100", "300", "400", "600"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#2B3D49",
};

export const metadata = {
    title: {
        template: `%s | ${configuration.metadata.site_name}.com`,
        default: `${configuration.metadata.site_name}.com | The Blog`,
    },
    description: "Καιρός, δεδομένα και καιρικά άρθρα για την Φθιώτιδα.",
};

type BlogLayoutProps = {
    children: React.ReactNode;
};

export default function BlogLayout({ children }: Readonly<BlogLayoutProps>) {
    return (
        <html lang="el">
            <body className={fontFamily.className}>
                <ClientProvider>
                    <Suspense fallback={null}>
                        <PostHogPageView />
                    </Suspense>
                    <header className="border-b border-solid border-gray bg-white">
                        <div className="container mx-auto flex h-24 items-center gap-3 px-4">
                            <Link href="/" className="my-auto">
                                <Image
                                    src="/assets/logo.png"
                                    className="h-full w-60"
                                    width={280}
                                    height={200}
                                    alt={configuration.metadata.site_name}
                                    title={configuration.metadata.site_name}
                                    priority
                                />
                            </Link>
                            <Link href="/blog">
                                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                                    The Blog
                                </span>
                            </Link>
                        </div>
                    </header>
                    {children}
                    <BlogFooter />
                </ClientProvider>
            </body>
        </html>
    );
}
