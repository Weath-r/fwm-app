import "./globals.css";
import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { ClientProvider } from "@/providers/clientProvider";
import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
    ssr: false,
});

const fontFamily = Commissioner({
    subsets: ["latin"],
    weight: ["100", "300", "400", "600"],
});
export const metadata: Metadata = {
    title: "myWEATHR.com - Live weather conditions in Central Greece",
    description: "MyWeathr is your go-to weather app for precise and reliable local forecasts across Greece. With real-time updates of data refreshed every 30 minutes to ensure accuracy, MyWeathr offers a comprehensive view of current conditions and up-to-date forecasts directly on an interactive map. The app provides detailed weather predictions up to five days in advance. Additionally, MyWeathr keeps you informed about critical weather warnings and alerts, helping you stay prepared for any situation. Experience weather tracking tailored to your region with MyWeathr.",
};

type RootLayoutProps = {
    children: React.ReactNode;
};
 
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="google-site-verification" content="ckL2sSissjkQt1lxgjAeaCPd8uAH9jR00l57zdcd8BU" />
            <meta name="keywords" content="Local weather Greece, Real-time weather updates, Greek weather map, Weather forecasts Greece, Weather stations data, Central Greece weather, Weather alerts Greece, Live weather conditions, Weather warnings Greece, Regional weather forecasts" />
            <meta property="og:title" content="myWEATHR.com - Live weather conditions in Central Greece" />
            <meta property="og:description" content="MyWeathr is your go-to weather app for precise and reliable local forecasts across Greece. With real-time updates of data refreshed every 30 minutes to ensure accuracy, MyWeathr offers a comprehensive view of current conditions and up-to-date forecasts directly on an interactive map. The app provides detailed weather predictions up to five days in advance. Additionally, MyWeathr keeps you informed about critical weather warnings and alerts, helping you stay prepared for any situation. Experience weather tracking tailored to your region with MyWeathr." />
            <meta property="og:image" content="/assets/myweathr.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="myWEATHR.com - Live weather conditions in Central Greece" />
            <meta name="twitter:description" content="MyWeathr is your go-to weather app for precise and reliable local forecasts across Greece. With real-time updates of data refreshed every 30 minutes to ensure accuracy, MyWeathr offers a comprehensive view of current conditions and up-to-date forecasts directly on an interactive map. The app provides detailed weather predictions up to five days in advance. Additionally, MyWeathr keeps you informed about critical weather warnings and alerts, helping you stay prepared for any situation. Experience weather tracking tailored to your region with MyWeathr." />
            <meta name="twitter:image" content="/assets/myweathr.png" />
            <ClientProvider>
                <body className={fontFamily.className}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostHogPageView />
                        <Header></Header>
                        {children}
                    </Suspense>
                    <div id="portal" className="absolute z-20"></div>
                </body>
            </ClientProvider>
        </html>
    );
}
