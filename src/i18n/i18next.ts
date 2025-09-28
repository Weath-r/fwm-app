import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { fallbackLng, defaultNS } from "./settings";
import { AppLanguages as languages } from "@/app/appConfig";

const runsOnServerSide = typeof window === "undefined";

const importProperLanguage = (language: string, namespace: string) => {
    return import(`./locales/${language}/${namespace}.json`);
};
  
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend(importProperLanguage))
    .init({
        debug: false,
        supportedLngs: languages,
        fallbackLng,
        lng: undefined,
        fallbackNS: defaultNS,
        defaultNS,
        detection: {
            order: ["path", "htmlTag", "cookie", "navigator"],
        },
        preload: runsOnServerSide ? languages : [],
    });

export default i18next;