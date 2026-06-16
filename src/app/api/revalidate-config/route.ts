import { revalidateTag } from "next/cache";
import { CONFIGURATION_CACHE_TAG } from "@/services/getConfiguration";

/**
 * On-demand revalidation for the Directus `configurations` feature flags.
 *
 * The flags are served from the Next.js Data Cache (tagged `configurations`)
 * with a long `revalidate` window. A Directus Flow should POST here whenever a
 * configuration item changes so the new flags propagate immediately instead of
 * waiting out the revalidation window.
 */

const extractSecret = (request: Request): string | null => {
    const authorizationHeader = request.headers.get("authorization");
    if (authorizationHeader?.startsWith("Bearer ")) {
        return authorizationHeader.slice("Bearer ".length).trim();
    }
    return null;
};

export async function POST(request: Request) {
    const expectedSecret = process.env.CONFIG_REVALIDATE_SECRET;

    if (!expectedSecret) {
        return Response.json(
            { revalidated: false, message: "CONFIG_REVALIDATE_SECRET is not configured" },
            { status: 500 }
        );
    }

    if (extractSecret(request) !== expectedSecret) {
        return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
    }

    revalidateTag(CONFIGURATION_CACHE_TAG, "max");

    return Response.json({
        revalidated: true,
        tag: CONFIGURATION_CACHE_TAG,
        now: Date.now(),
    });
}
