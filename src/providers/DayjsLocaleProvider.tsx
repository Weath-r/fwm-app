"use client";
import { useEffect } from "react";
import { setDayjsLocale } from "@/utils/dateTimeUtils";

interface DayjsLocaleProviderProps {
  locale: string;
}

export default function DayjsLocaleProvider({ locale }: DayjsLocaleProviderProps) {
    useEffect(() => {
        setDayjsLocale(locale);
    }, [locale]);
    return null;
}
