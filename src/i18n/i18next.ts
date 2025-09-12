import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
// import LocizeBackend from "i18next-locize-backend"
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
// .use(runsOnServerSide ? LocizeBackend : resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`))) // locize backend could be used, but prefer to keep it in sync with server side
    .init({
    // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng: undefined,
        fallbackNS: defaultNS,
        defaultNS,
        detection: {
            order: ["path", "htmlTag", "cookie", "navigator"],
        },
        preload: runsOnServerSide ? languages : [],
    // backend: {
    //   projectId: "01b2e5e8-6243-47d1-b36f-963dbb8bcae3"
    // }
    });

export default i18next;