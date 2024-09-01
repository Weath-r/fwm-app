"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useRedirectToHomeOnBack = () => {
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handlePopState = (event: PopStateEvent) => {
            router.push("/");
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);
};

export default useRedirectToHomeOnBack;
