/**
 * @jest-environment node
 */
import { POST } from "../route";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/services/cacheTags";

jest.mock("next/cache", () => ({
    revalidateTag: jest.fn(),
}));

const SECRET = "test-secret";

const buildRequest = (init: { authorization?: string; tags?: string[] }): Request => {
    const headers = new Headers();
    if (init.authorization) {
        headers.set("authorization", init.authorization);
    }
    const query = (init.tags ?? []).map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
    const url = `http://localhost/api/revalidate${query ? `?${query}` : ""}`;
    return new Request(url, { method: "POST", headers });
};

describe("POST /api/revalidate", () => {
    const originalSecret = process.env.REVALIDATE_SECRET;
    const originalConfigSecret = process.env.CONFIG_REVALIDATE_SECRET;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.REVALIDATE_SECRET = SECRET;
        delete process.env.CONFIG_REVALIDATE_SECRET;
    });

    afterAll(() => {
        process.env.REVALIDATE_SECRET = originalSecret;
        process.env.CONFIG_REVALIDATE_SECRET = originalConfigSecret;
    });

    it("returns 500 when no secret is configured", async () => {
        delete process.env.REVALIDATE_SECRET;

        const response = await POST(
            buildRequest({ authorization: `Bearer ${SECRET}`, tags: [CACHE_TAGS.configurations] })
        );

        expect(response.status).toBe(500);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("falls back to CONFIG_REVALIDATE_SECRET for backward compatibility", async () => {
        delete process.env.REVALIDATE_SECRET;
        process.env.CONFIG_REVALIDATE_SECRET = SECRET;

        const response = await POST(
            buildRequest({ authorization: `Bearer ${SECRET}`, tags: [CACHE_TAGS.configurations] })
        );

        expect(response.status).toBe(200);
        expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.configurations, "max");
    });

    it("returns 401 when the secret does not match", async () => {
        const response = await POST(
            buildRequest({ authorization: "Bearer wrong", tags: [CACHE_TAGS.configurations] })
        );

        expect(response.status).toBe(401);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("returns 401 when the Authorization header is missing", async () => {
        const response = await POST(buildRequest({ tags: [CACHE_TAGS.configurations] }));

        expect(response.status).toBe(401);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("returns 400 when no tag is provided", async () => {
        const response = await POST(buildRequest({ authorization: `Bearer ${SECRET}` }));

        expect(response.status).toBe(400);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("returns 400 and does not revalidate when a tag is unknown", async () => {
        const response = await POST(
            buildRequest({
                authorization: `Bearer ${SECRET}`,
                tags: [CACHE_TAGS.weatherStations, "not-a-real-tag"],
            })
        );
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.message).toContain("not-a-real-tag");
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("revalidates a single valid tag", async () => {
        const response = await POST(
            buildRequest({ authorization: `Bearer ${SECRET}`, tags: [CACHE_TAGS.weatherStations] })
        );
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.weatherStations, "max");
        expect(body.revalidated).toBe(true);
        expect(body.tags).toEqual([CACHE_TAGS.weatherStations]);
    });

    it("revalidates multiple valid tags", async () => {
        const response = await POST(
            buildRequest({
                authorization: `Bearer ${SECRET}`,
                tags: [CACHE_TAGS.weatherHazards, CACHE_TAGS.warningLevels],
            })
        );
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.weatherHazards, "max");
        expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.warningLevels, "max");
        expect(revalidateTag).toHaveBeenCalledTimes(2);
        expect(body.tags).toEqual([CACHE_TAGS.weatherHazards, CACHE_TAGS.warningLevels]);
    });
});
