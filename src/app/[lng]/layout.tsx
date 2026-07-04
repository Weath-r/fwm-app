import "../globals.css";
import { Commissioner } from "next/font/google";
import { ClientProvider } from "@/providers/clientProvider";
import Header from "@/components/Header/Header";
import PostHogPageView from "./PostHogPageView";

import { Suspense } from "react";
import DayjsLocaleProvider from "@/providers/DayjsLocaleProvider";
import { ConfigStoreHydrator } from "@/providers/ConfigStoreHydrator";
import { getConfiguration, getMenu } from "@/services/getConfiguration";

import { dir } from "i18next";
import { AppLanguages as languages } from "@/app/appConfig";
import { getT } from "@/i18n";
import type { Viewport } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { buildSiteGraph } from "@/helpers/seo/structuredData";
import configuration from "@/app/appConfig";

const fontFamily = Commissioner({
    subsets: ["greek"],
    weight: ["100", "300", "400", "600"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#2B3D49",
};

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }) {
    const { lng } = await params;
    const { t, i18n } = await getT("pages");
    const keywords_en = [
        "weather app Greece",
        "local weather forecast Greece",
        "real-time weather Greece",
        "interactive weather map Greece",
        "Greece 5-day weather forecast",
        "weather alerts Greece",
        "reliable weather Greece",
        "Central Greece weather app",
        "Fthiotida weather app",
        "Lamia weather forecast",
        "Volos weather app",
        "Domokos weather forecast",
        "Domokos weather app",
        "Karpenisi weather forecast",
        "Karpenisi weather app",
        "Stylida weather forecast",
        "Thessaly weather forecast",
        "Sterea Ellada weather app",
    ];
    const keywords_el = [
        "εφαρμογή καιρού Ελλάδα",
        "πρόγνωση καιρού Ελλάδα",
        "καιρός σε πραγματικό χρόνο",
        "διαδραστικός χάρτης καιρού",
        "πρόγνωση 5 ημερών Ελλάδα",
        "ειδοποιήσεις καιρού Ελλάδα",
        "αξιόπιστη εφαρμογή καιρού",
        "εφαρμογή καιρού Στερεά Ελλάδα",
        "εφαρμογή καιρού Φθιώτιδα",
        "καιρός Λαμία",
        "εφαρμογή καιρού Βόλος",
        "καιρός Καρπενήσι",
        "εφαρμογή καιρού Καρπενήσι",
        "καιρός Δομοκός",
        "εφαρμογή καιρού Δομοκός",
        "καιρός Στυλίδα",
        "πρόγνωση καιρού Θεσσαλία",
    ];
    return {
        metadataBase: new URL(configuration.metadata.site_url),
        title: {
            template: "%s | " + configuration.metadata.site_name,
            default: t("homepage.title"),
        },
        description: t("homepage.description"),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
        alternates: {
            canonical: `/${lng}`,
            languages: {
                en: "/en",
                el: "/el",
                "x-default": "/en",
            },
        },
        openGraph: {
            title: t("homepage.title"),
            description: t("homepage.description"),
            url: configuration.metadata.site_url,
            siteName: t("homepage.title"),
            images: [
                {
                    url: "/assets/metadata/og-card.png",
                    width: 1200,
                    height: 630,
                    alt: "myweathr",
                },
            ],
            locale: i18n.language,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("homepage.title"),
            description: t("homepage.description"),
            images: ["/assets/metadata/og-card.png"],
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
        verification: {
            google: "ckL2sSissjkQt1lxgjAeaCPd8uAH9jR00l57zdcd8BU",
        },
        manifest: "/assets/metadata/site.webmanifest",
        category: "weather",
        icons: {
            icon: [
                { url: "/assets/metadata/favicon.svg", type: "image/svg+xml" },
                { url: "/assets/metadata/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/assets/metadata/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            ],
            shortcut: "/assets/metadata/favicon.ico",
            apple: "/assets/metadata/apple-touch-icon.png",
        },
    };
}

type RootLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ lng: string }>;
};

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
    const { lng } = await params;
    const [featureFlags, menu, { t }] = await Promise.all([
        getConfiguration(),
        getMenu(),
        getT("pages"),
    ]);
    const siteGraph = buildSiteGraph(lng, {
        name: t("structuredData.appName"),
        description: t("structuredData.appDescription"),
        featureList: [
            t("structuredData.features.liveConditions"),
            t("structuredData.features.interactiveMap"),
            t("structuredData.features.forecasts"),
            t("structuredData.features.warnings"),
        ],
    });
    return (
        <html lang={lng} dir={dir(lng)}>
            <body className={fontFamily.className}>
                <JsonLd data={siteGraph} />
                <ClientProvider>
                    <ConfigStoreHydrator featureFlags={featureFlags} menu={menu} />
                    <DayjsLocaleProvider locale={lng} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostHogPageView />
                        <Header></Header>
                        {children}
                    </Suspense>
                </ClientProvider>
                <div id="portal" className="absolute z-20"></div>
            </body>
        </html>
    );
}
