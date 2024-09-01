"use client";
import dynamic from "next/dynamic";

const WarningsPage = dynamic(
    () => import("@/components/Warnings/WarningsPage"),
    {
        ssr: false,
    }
);

export default function Warnings() {
    return (
        <main className="relative flex flex-1 flex-col">
            <WarningsPage></WarningsPage>
        </main>
    );
}
