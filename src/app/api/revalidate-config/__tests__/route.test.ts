/**
 * @jest-environment node
 */
import { POST } from "../route";
import { revalidateTag } from "next/cache";
import { CONFIGURATION_CACHE_TAG } from "@/services/getConfiguration";

jest.mock("next/cache", () => ({
    revalidateTag: jest.fn(),
}));

const SECRET = "test-secret";

const buildRequest = (init: { authorization?: string }): Request => {
    const headers = new Headers();
    if (init.authorization) {
        headers.set("authorization", init.authorization);
    }
    return new Request("http://localhost/api/revalidate-config", { method: "POST", headers });
};

describe("POST /api/revalidate-config", () => {
    const originalSecret = process.env.CONFIG_REVALIDATE_SECRET;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.CONFIG_REVALIDATE_SECRET = SECRET;
    });

    afterAll(() => {
        process.env.CONFIG_REVALIDATE_SECRET = originalSecret;
    });

    it("returns 500 when the secret is not configured", async () => {
        delete process.env.CONFIG_REVALIDATE_SECRET;

        const response = await POST(buildRequest({ authorization: `Bearer ${SECRET}` }));

        expect(response.status).toBe(500);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("returns 401 when the secret does not match", async () => {
        const response = await POST(buildRequest({ authorization: "Bearer wrong" }));

        expect(response.status).toBe(401);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("returns 401 when the Authorization header is missing", async () => {
        const response = await POST(buildRequest({}));

        expect(response.status).toBe(401);
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("revalidates the configuration tag with a valid bearer token", async () => {
        const response = await POST(buildRequest({ authorization: `Bearer ${SECRET}` }));
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(revalidateTag).toHaveBeenCalledWith(CONFIGURATION_CACHE_TAG, "max");
        expect(body.revalidated).toBe(true);
        expect(body.tag).toBe(CONFIGURATION_CACHE_TAG);
    });

});
