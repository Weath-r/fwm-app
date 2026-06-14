import type { ReactNode } from "react";
import { StationsProvider } from "@/providers/StationsProvider";

export type HomeLayoutProps = {
    children: ReactNode;
};

export default async function HomepageLayout({ children }: HomeLayoutProps) {
    return (
        <StationsProvider>
            <>{children}</>
        </StationsProvider>
    );
}
