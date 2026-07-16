import { revalidateTag } from "next/cache";
import { CACHE_TAGS, isValidCacheTag } from "@/services/cacheTags";

/**
 * On-demand revalidation for the Next.js Data Cache.
 *
 * A Directus Flow (or admin action) POSTs here whenever a cached collection
 * changes so the new data propagates immediately instead of waiting out the
 * revalidation window. One or more tags are passed as repeated `tag` query
 * params, e.g. `/api/revalidate?tag=weather-stations&tag=weather-hazards`.
 * Tags are validated against the central `CACHE_TAGS` registry so an unknown
 * tag is rejected rather than silently doing nothing.
 */

const extractSecret = (request: Request): string | null => {
    const authorizationHeader = request.headers.get("authorization");
    if (authorizationHeader?.startsWith("Bearer ")) {
        return authorizationHeader.slice("Bearer ".length).trim();
    }
    return null;
};

export async function POST(request: Request) {
    const expectedSecret =
        process.env.REVALIDATE_SECRET ?? process.env.CONFIG_REVALIDATE_SECRET;

    if (!expectedSecret) {
        return Response.json(
            { revalidated: false, message: "REVALIDATE_SECRET is not configured" },
            { status: 500 }
        );
    }

    if (extractSecret(request) !== expectedSecret) {
        return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
    }

    const tags = new URL(request.url).searchParams.getAll("tag");

    if (tags.length === 0) {
        return Response.json(
            { revalidated: false, message: "No tag provided" },
            { status: 400 }
        );
    }

    const invalidTags = tags.filter((tag) => !isValidCacheTag(tag));
    if (invalidTags.length > 0) {
        return Response.json(
            {
                revalidated: false,
                message: `Unknown cache tag(s): ${invalidTags.join(", ")}`,
                knownTags: Object.values(CACHE_TAGS),
            },
            { status: 400 }
        );
    }

    tags.forEach((tag) => revalidateTag(tag, "max"));

    return Response.json({
        revalidated: true,
        tags,
        now: Date.now(),
    });
}
