import type { MetadataRoute } from "next";
import configuration from "./appConfig";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
        ],
        sitemap: `${configuration.metadata.site_url}/sitemap.xml`,
        host: configuration.metadata.site_url,
    };
}
