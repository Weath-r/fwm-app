import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, cookieName, headerName } from "@/i18n/settings";
import configuration from "@/app/appConfig";

const languages = configuration.languages.map(lang => lang.id);
acceptLanguage.languages(languages);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|sitemap|assets|favicon.ico|sw.js|site.webmanifest).*)"],
};

export function proxy(req: NextRequest) {

    if (req.nextUrl.pathname.indexOf("icon") > -1 || req.nextUrl.pathname.indexOf("chrome") > -1) {
        return NextResponse.next();
    } 
    let lng: string | undefined | null;
    if (req.cookies.has(cookieName)) {
        lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    }
    if (!lng) {
        lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    }
    if (!lng) {
        lng = fallbackLng;
    }

    const lngInPath = languages.find((loc: any) => req.nextUrl.pathname.startsWith(`/${loc}`));
    const headers = new Headers(req.headers);
    headers.set(headerName, lngInPath || lng);

    // Redirect if lng in path is not supported
    if (
        !lngInPath &&
        !req.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
    }

    if (req.headers.has("referer")) {
        const refererUrl = new URL(req.headers.get("referer") || "");
        const lngInReferer = languages.find((l: any) => refererUrl.pathname.startsWith(`/${l}`));
        const response = NextResponse.next({ headers });
        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        }
        return response;
    }

    return NextResponse.next({ headers });
}