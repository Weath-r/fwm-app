import type { ReactNode } from "react";
import { StationsProvider } from "@/providers/StationsProvider";

export type WeatherMapLayoutProps = {
    children: ReactNode;
    modal: ReactNode;
};

export default async function WeatherMapLayout({ children, modal }: WeatherMapLayoutProps) {
    return (
        <StationsProvider>
            <>
                {children}
                {modal}
            </>
        </StationsProvider>
    );
}
