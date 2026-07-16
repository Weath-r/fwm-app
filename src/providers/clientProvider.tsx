"use client";
import { ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

interface ClientProviderProps {
  children: ReactNode;
}

if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
    });
}


export const ClientProvider = ({ children }: ClientProviderProps) => {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};