import type { ReactNode } from "react";

export type HomeLayoutProps = {
    children: ReactNode;
    modal: ReactNode;
};

export default async function HomepageLayout({
    children,
    modal,
}: HomeLayoutProps) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}