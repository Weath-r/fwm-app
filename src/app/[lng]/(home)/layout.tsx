import type { ReactNode } from "react";
import { StationsProvider } from "@/providers/StationsProvider";

export type HomeLayoutProps = {
    children: ReactNode;
    modal: ReactNode;
};

export default async function HomepageLayout({
    children,
    modal,
}: HomeLayoutProps) {
    return (
        <StationsProvider>
            <>
                {children}
                {modal}
            </>
        </StationsProvider>
    );
}