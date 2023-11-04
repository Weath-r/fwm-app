import "./globals.css";
import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import Header from "@/components/Header/Header";

const fontFamily = Commissioner({ 
    subsets: ["latin"],
    weight: ["100", "300", "400", "600"],
});
export const metadata: Metadata = {
  title: "Weather conditions in Central Greece",
  description: "Weather application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={fontFamily.className}>
            <Header></Header>
            {children}
        </body>
    </html>
  )
}
