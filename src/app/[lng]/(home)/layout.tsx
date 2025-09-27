import type { ReactNode } from "react";

export type HomeLayoutProps = {
    modal: ReactNode;
    children: ReactNode
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