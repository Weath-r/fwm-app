import "./globals.css";
import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { ClientProvider } from "@/providers/clientProvider";
import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
    ssr: false,
});

const fontFamily = Commissioner({
    subsets: ["latin"],
    weight: ["100", "300", "400", "600"],
});
export const metadata: Metadata = {
    title: "myWEATHR.com - Weather conditions in Central Greece",
    description: "Live weather conditions, Greece",
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
            <ClientProvider>
                <body className={fontFamily.className}>
                    <PostHogPageView />
                    <Header></Header>
                    {children}
                </body>
            </ClientProvider>
        </html>
    );
}
