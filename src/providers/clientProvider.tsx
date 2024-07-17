"use client";
import { createContext, ReactNode, useContext } from "react";
import { useFetchGeneral } from "@/hooks/useFetchGeneral";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientContext = createContext({});

if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
    });
}
  
  
export const ClientProvider = ({ children }: ClientProviderProps) => {
    useFetchGeneral();
    return (
        <ClientContext.Provider value={{}}>
            <PostHogProvider client={posthog}>
                {children}
            </PostHogProvider>
        </ClientContext.Provider>
    );
};

export const useClientProvider = () => {
    return useContext(ClientContext);
};